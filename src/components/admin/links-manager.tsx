"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger, LoadingSpinner, Card, CardContent } from "@/components";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { createLink, deleteLink, fetchLinks as fetchLinksDb, updateLink } from "@/utils/actions/links";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, ChevronUp, ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import type { Link } from "@/utils/types/links";
import type React from "react";

type LinkType = Omit<Link, "created_at" | "updated_at">

export function LinksManager() {
    const [links, setLinks] = useState<LinkType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentLink, setCurrentLink] = useState<LinkType | null>(null);
    const [linkToDelete, setLinkToDelete] = useState<LinkType | null>(null);
    const [iconSearchOpen, setIconSearchOpen] = useState(false);
    const [iconSearch, setIconSearch] = useState("");

    const fetchLinks = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchLinksDb();
            setLinks(data || []);
        } catch (err) {
            console.error("Erro ao buscar links:", err);
            setError("Não foi possível carregar os links. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleSaveLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentLink) return;

        setIsSubmitting(true);
        try {
            if (currentLink.id) {
                const data = {
                    title: currentLink.title,
                    url: currentLink.url,
                    icon: currentLink.icon,
                }

                await updateLink(data, currentLink.id)
            } else {
                const maxOrderIndex = links.length > 0
                ? Math.max(...links.map((exp) => exp.order_index))
                : -1;

                const data = {
                    title: currentLink.title,
                    url: currentLink.url,
                    icon: currentLink.icon,
                    order_index: maxOrderIndex + 1,
                }

                await createLink(data)
            }

            await fetchLinks();
            setIsDialogOpen(false);
            setCurrentLink(null);
        } catch (err) {
            console.error("Erro ao salvar link:", err);
            setError("Não foi possível salvar o link. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteLink = async () => {
        if (!linkToDelete) return;

        try {
            await deleteLink(linkToDelete.id)

            setLinks((prev) => prev.filter((experience) => experience.id !== linkToDelete.id));

            reorderLinks();
            setIsDeleteDialogOpen(false);
            setLinkToDelete(null);
        } catch (err) {
            console.error("Erro ao excluir link:", err);
            setError("Não foi possível excluir o link. Tente novamente.");
        }
    };

    const handleMoveLink = async (id: number, direction: "up" | "down") => {
        const currentIndex = links.findIndex((exp) => exp.id === id);
        if (currentIndex === -1) return;

        const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

        // Verificar se o novo índice é válido
        if (newIndex < 0 || newIndex >= links.length) return;

        // Trocar as posições
        const newLinks = [...links];
        const temp = newLinks[currentIndex].order_index;
        newLinks[currentIndex].order_index = newLinks[newIndex].order_index;
        newLinks[newIndex].order_index = temp;

        // Ordenar pelo order_index
        newLinks.sort((a, b) => b.order_index - a.order_index);

        // Atualizar o estado
        setLinks(newLinks);

        try {
            setError(null);

            await updateLink({ order_index: newLinks[currentIndex].order_index }, newLinks[currentIndex].id);
            await updateLink({ order_index: newLinks[newIndex].order_index }, newLinks[newIndex].id);
        } catch (err) {
            console.error("Erro ao reordenar links:", err);
            setError("Não foi possível reordenar os links. Tente novamente.");

            // Reverter as mudanças em caso de erro
            fetchLinks();
        }
    };

    const reorderLinks = async () => {
        try {
            const sortedLinks = [...links].sort((a, b) => b.order_index - a.order_index);
        
            for (let i = 0; i < sortedLinks.length; i++) {
                await updateLink({ order_index: sortedLinks.length - 1 - i }, sortedLinks[i].id);
            }

            fetchLinks();
        } catch (err) {
            console.error("Erro ao reordenar experiências:", err);
            setError("Não foi possível reordenar as experiências. Tente novamente mais tarde.");
        }
    };

    const iconNames = Object.keys(LucideIcons)
        .filter((name) => name !== "createLucideIcon" && name !== "default")
        .filter((name) =>
            name.toLowerCase().includes(iconSearch.toLowerCase())
        );

    const DynamicIcon = ({ name }: { name: string }) => {
        const IconComponent = (LucideIcons as any)[name];
        return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner text="Carregando links..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Links</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md">
                        {error}
                    </div>
                )}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() =>
                                setCurrentLink({
                                    id: 0,
                                    title: "",
                                    url: "",
                                    icon: "Link",
                                    order_index: 0,
                                })
                            }
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Novo Link
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-w-full mx-auto overflow-hidden">
                        <DialogHeader>
                            <DialogTitle>
                                {currentLink?.id ? "Editar Link" : "Novo Link"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSaveLink} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    id="title"
                                    value={currentLink?.title || ""}
                                    className="bg-[#1a2235]/50 border-[#1a2235]"
                                    onChange={(e) => setCurrentLink((prev) => prev ? { ...prev, title: e.target.value } : null)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="url">URL</Label>
                                <Input
                                    id="url"
                                    value={currentLink?.url || ""}
                                    className="bg-[#1a2235]/50 border-[#1a2235]"
                                    onChange={(e) => setCurrentLink((prev) => prev ? { ...prev, url: e.target.value } : null)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Ícone</Label>
                                <Popover open={iconSearchOpen} onOpenChange={setIconSearchOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={iconSearchOpen}
                                            className="w-full justify-between"
                                        >
                                            <div className="flex items-center gap-2">
                                                {currentLink?.icon && (<DynamicIcon name={currentLink.icon}/>)}
                                                <span>
                                                    {currentLink?.icon || "Selecione um ícone"}
                                                </span>
                                            </div>
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[min(300px,calc(100vw-2rem))] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Buscar ícone..."
                                                value={iconSearch}
                                                onValueChange={setIconSearch}
                                            />
                                            <CommandList className="max-h-[300px] overflow-y-auto">
                                                <CommandEmpty>
                                                    Nenhum ícone encontrado.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    <div className="grid grid-cols-3 gap-2 p-2">
                                                        {iconNames
                                                            .slice(0, 60)
                                                            .map((name) => (
                                                                <CommandItem
                                                                    key={name}
                                                                    value={name}
                                                                    onSelect={() => {
                                                                        setCurrentLink(
                                                                            (prev) => prev ? { ...prev, icon: name } : null
                                                                        );
                                                                        setIconSearchOpen(
                                                                            false
                                                                        );
                                                                        setIconSearch(
                                                                            ""
                                                                        );
                                                                    }}
                                                                    className="flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-accent rounded"
                                                                >
                                                                    <DynamicIcon
                                                                        name={name}
                                                                    />
                                                                    <span className="text-xs mt-1 truncate w-full text-center">
                                                                        {name}
                                                                    </span>
                                                                    {currentLink?.icon ===
                                                                        name && (
                                                                        <Check className="h-4 w-4 text-green-500 absolute top-1 right-1" />
                                                                    )}
                                                                </CommandItem>
                                                            ))}
                                                    </div>
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Salvando..." : "Salvar"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {links.length === 0 ? (
                <div className="text-center py-8 bg-[#2C3953]/50 rounded-lg">
                    <p>Nenhum link cadastrado.</p>
                    <Button 
                        onClick={() => {
                            setCurrentLink({
                                id: 0,
                                title: "",
                                url: "",
                                icon: "Link",
                                order_index: 0,
                            });
                            setIsDialogOpen(true);
                        }}
                        variant="link" 
                        className="mt-2">
                        Adicionar Link
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {links.map((link, index) => (
                        <Card key={link.id} className="border bg-[#2C3953]/50">
                            <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-md">
                                            <DynamicIcon name={link.icon} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">
                                                {link.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[400px]">
                                                {link.url}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleMoveLink(link.id, "up")
                                            }
                                            disabled={index === 0}
                                            className="h-8 w-8"
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleMoveLink(link.id, "down")
                                            }
                                            disabled={
                                                index === links.length - 1
                                            }
                                            className="h-8 w-8"
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setCurrentLink(link);
                                                setIsDialogOpen(true);
                                            }}
                                            className="h-8 w-8"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setLinkToDelete(link);
                                                setIsDeleteDialogOpen(true);
                                            }}
                                            className="h-8 w-8 text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Diálogo de confirmação de exclusão */}
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir o link "
                            {linkToDelete?.title}"? Esta ação não pode ser
                            desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteLink}
                            className="bg-red-500/80 hover:bg-red-500/60 border border-red-500/50  text-white"
                        >
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
