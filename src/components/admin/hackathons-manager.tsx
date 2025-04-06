"use client";

import { fetchHackathons as fetchHackathonsDb, createHackathon, updateHackathon, deleteHackathon } from '@/utils/actions/hackathon'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, Label, Input, Textarea, LoadingSpinner } from "@/components/index";
import { Pencil, Plus, Save, Trash2, X, ChevronUp, ChevronDown } from "lucide-react";
import type { Hackathon } from '@/utils/types/hackathons';
import { useState, useEffect } from "react";
import ImageUpload from "./image-upload";
import Image from 'next/image'

export function HackathonsManager() {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const [formData, setFormData] = useState<
        Omit<Hackathon, "id" | "created_at" | "order_index">
    >({
        title: "",
        banner_url: "",
        description: "",
        date: "",
        result: null,
    });

    const [imageUploaded, setImageUploaded] = useState(false);

    useEffect(() => {
        fetchHackathons();
    }, []);

    const fetchHackathons = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchHackathonsDb()
            setHackathons(data || []);
        } catch (err) {
            console.error("Erro ao buscar hackathons:", err);
            setError("Não foi possível carregar os hackathons. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            banner_url: "",
            description: "",
            date: "",
            result: null,
        });

        setImageUploaded(false);
    };

    const handleCreateHackathon = async () => {
        if (!formData.banner_url) {
            setError("É necessário fazer upload de uma imagem para o hackathon.");
            return;
        }

        try {
            const data = await createHackathon(formData)
            setHackathons((prev) => [...prev, data[0]]);

            resetForm();
            setIsCreating(false);
        } catch (err) {
            console.error("Erro ao criar hackathon:", err);
            setError("Não foi possível criar o hackathon. Tente novamente mais tarde.");
        }
    };

    const handleUpdateHackathon = async (id: number) => {
        if (!formData.banner_url) {
            setError("É necessário fazer upload de uma imagem para o hackathon.");
            return;
        }

        try {
            await updateHackathon(formData, id)

            setHackathons((prev) =>
                prev.map((hackathon) => hackathon.id === id ? { 
                    ...hackathon, 
                    ...formData 
                } : hackathon)
            );

            resetForm();
            setIsEditing(null);
        } catch (err) {
            console.error("Erro ao atualizar hackathon:", err);
            setError("Não foi possível atualizar o hackathon. Tente novamente mais tarde.");
        }
    };

    const handleDeleteHackathon = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este hackathon?")) return;

        try {
            await deleteHackathon(id)
            setHackathons((prev) => prev.filter((hackathon) => hackathon.id !== id));

            reorderHackathons()
        } catch (err) {
            console.error("Erro ao excluir hackathon:", err);
            setError("Não foi possível excluir o hackathon. Tente novamente mais tarde.");
        }
    };

    const moveHackathon = async (id: number, direction: "up" | "down") => {
        const currentIndex = hackathons.findIndex((exp) => exp.id === id);
        if (currentIndex === -1) return;

        const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

        // Verificar se o novo índice é válido
        if (newIndex < 0 || newIndex >= hackathons.length) return;

        // Trocar as posições
        const newHackathons = [...hackathons];
        const temp = newHackathons[currentIndex].order_index;
        newHackathons[currentIndex].order_index = newHackathons[newIndex].order_index;
        newHackathons[newIndex].order_index = temp;

        // Ordenar pelo order_index
        newHackathons.sort((a, b) => a.order_index - b.order_index);

        // Atualizar o estado
        setHackathons(newHackathons);

        try {
            setError(null);
            await Promise.all([
                updateHackathon({ order_index: newHackathons[currentIndex].order_index }, newHackathons[currentIndex].id),
                updateHackathon({ order_index: newHackathons[newIndex].order_index }, newHackathons[newIndex].id)
            ])
        } catch (err) {
            console.error("Erro ao reordenar hackathons:", err);
            setError("Não foi possível reordenar os hackathons. Tente novamente mais tarde.");

            // Reverter as mudanças em caso de erro
            fetchHackathons();
        }
    };

    const reorderHackathons = async () => {
        try {
            for (let i = 0; i < hackathons.length; i++) {
                await updateHackathon({ order_index: i }, hackathons[i].id);
            }

            fetchHackathons();
        } catch (err) {
            console.error("Erro ao reordenar hackathons:", err);
            setError("Não foi possível reordenar os hackathons. Tente novamente mais tarde.");
        }
    };

    const startEditing = (hackathon: Hackathon) => {
        setFormData({
            title: hackathon.title,
            banner_url: hackathon.banner_url,
            description: hackathon.description,
            date: hackathon.date,
            result: hackathon.result,
        });

        setImageUploaded(true);
        setIsEditing(hackathon.id);
        setIsCreating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const startCreating = () => {
        resetForm();
        setIsCreating(true);
        setIsEditing(null);
    };

    const cancelAction = () => {
        resetForm();
        setIsCreating(false);
        setIsEditing(null);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner text="Carregando hackathons..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Hackathons</h2>
                {!isCreating && !isEditing && (
                    <Button onClick={startCreating} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Hackathon
                    </Button>
                )}
            </div>

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md">
                    {error}
                </div>
            )}

            {/* Form for creating/editing */}
            {(isCreating || isEditing !== null) && (
                <Card className="border-0 bg-[#2C3953]/80 pt-4 pb-4">
                    <CardHeader>
                        <CardTitle>
                            {isCreating ? "Novo Hackathon" : "Editar Hackathon"}
                        </CardTitle>
                        <CardDescription>
                            {isCreating
                                ? "Preencha os dados para criar um novo hackathon"
                                : "Atualize os dados do hackathon"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="bg-[#1a2235]/50 border-[#1a2235]"
                            />
                        </div>

                        <ImageUpload
                            onImageUploaded={(url) => {
                                setFormData((prev) => ({ ...prev, banner_url: url }));
                                setImageUploaded(true);
                            }}

                            folder="hackathons"
                            existingImageUrl={ isEditing !== null ? formData.banner_url : undefined }
                        />

                        <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="bg-[#1a2235]/50 border-[#1a2235] min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Data</Label>
                            <Input
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                placeholder="Ex: Janeiro 2023"
                                className="bg-[#1a2235]/50 border-[#1a2235]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="result">Resultado (opcional)</Label>
                            <Input
                                id="result"
                                name="result"
                                value={formData.result || ""}
                                onChange={handleInputChange}
                                placeholder="Ex: 1º Lugar"
                                className="bg-[#1a2235]/50 border-[#1a2235]"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={cancelAction} className="gap-2">
                            <X className="h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button onClick={() => isCreating ? handleCreateHackathon() : handleUpdateHackathon(isEditing!)} className="gap-2">
                            <Save className="h-4 w-4" />
                            {isCreating ? "Criar Hackathon" : "Salvar Alterações"}
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Hackathons list */}
            <div className="grid grid-cols-1 gap-4">
                {hackathons.length === 0 && !isCreating ? (
                    <div className="text-center py-8 bg-[#2C3953]/50 rounded-lg">
                        <p>Nenhum hackathon encontrado.</p>
                        <Button onClick={startCreating} variant="link" className="mt-2">
                            Criar seu primeiro hackathon
                        </Button>
                    </div>
                ) : (
                    hackathons.map((hackathon, index) => (
                        <Card key={hackathon.id} className="border-0 bg-[#2C3953]/50 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
                                <div className="aspect-video md:aspect-square overflow-hidden bg-[#1a2235]">
                                    <Image
                                        src={hackathon.banner_url || "/placeholder.svg"}
                                        alt={hackathon.title}
                                        width={800}
                                        height={450}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold">
                                            {hackathon.title}
                                        </h3>
                                        {hackathon.result && (
                                            <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                                {hackathon.result}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-blue-300 text-sm mb-2">
                                        {hackathon.date}
                                    </p>
                                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                        {hackathon.description}
                                    </p>

                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => moveHackathon(hackathon.id,"up")}
                                            disabled={index === 0}
                                            className="h-8 w-8 p-0"
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => moveHackathon(hackathon.id, "down")}
                                            disabled={index === hackathons.length - 1}
                                            className="h-8 w-8 p-0"
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => startEditing(hackathon)} className="gap-1">
                                            <Pencil className="h-3 w-3" />
                                            Editar
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteHackathon(hackathon.id)} className="gap-1">
                                            <Trash2 className="h-3 w-3" />
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
