"use client";

import { fetchExperiences as fetchExperiencesDb, createExperience, updateExperience, deleteExperience } from "@/utils/actions/experience";
import { Button, Input, Label, Textarea, ErrorMessage, Popover, PopoverContent, PopoverTrigger, LoadingSpinner } from "@/components";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Save, X, ChevronUp, ChevronDown } from "lucide-react";
import { Experience } from "@/utils/types/experiences";
import { useEffect, useState } from "react";
import type React from "react";

const popularEmojis = [ "💻", "🚀", "🎨", "📱", "🔧", "📊", "🌐", "📝", "🎓", "💡", "🔍", "⚙️", "📈", "🛠️", "🧩", "🔬", "📚", "🧠", "🤖", "🔐", "📡", "🏆", "🎯", "💬" ];

export function ExperiencesManager() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<
        Omit<Experience, "id" | "created_at" | "updated_at" | "order_index">
    >({
        title: "",
        company: "",
        period: "",
        description: "",
        icon: "💻",
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchExperiencesDb();
            setExperiences(data || []);
        } catch (err) {
            console.error("Erro ao buscar experiências:", err);
            setError("Não foi possível carregar as experiências. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateExperience = async () => {
        try {
            setIsSaving(true);
            setError(null);

            const maxOrderIndex = experiences.length > 0
                ? Math.max(...experiences.map((exp) => exp.order_index))
                : -1;

            const createData = {
                ...formData,
                order_index: maxOrderIndex + 1
            }

            const data = await createExperience(createData);
            setExperiences((prev) => [data[0], ...prev]);

            resetForm();
            setIsCreating(false);
        } catch (err) {
            console.error("Erro ao criar experiência:", err);
            setError("Não foi possível criar a experiência. Tente novamente mais tarde.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateExperience = async (id: number) => {
        try {
            setIsSaving(true);
            setError(null);

            const updateData = {
                ...formData
            };

            await updateExperience(updateData, id);

            setExperiences((prev) => prev.map((experience) =>
                experience.id === id ? { 
                    ...experience, 
                    ...formData
                } : experience)
            );

            resetForm();
            setIsEditing(null);
        } catch (err) {
            console.error("Erro ao atualizar experiência:", err);
            setError("Não foi possível atualizar a experiência. Tente novamente mais tarde.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteExperience = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir esta experiência?"))
            return;

        try {
            setError(null);
            await deleteExperience(id);

            setExperiences((prev) => prev.filter((experience) => experience.id !== id));

            reorderExperiences();
        } catch (err) {
            console.error("Erro ao excluir experiência:", err);
            setError("Não foi possível excluir a experiência. Tente novamente mais tarde.");
        }
    };

    const moveExperience = async (id: number, direction: "up" | "down") => {
        const currentIndex = experiences.findIndex((exp) => exp.id === id);
        if (currentIndex === -1) return;

        const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

        // Verificar se o novo índice é válido
        if (newIndex < 0 || newIndex >= experiences.length) return;

        // Trocar as posições
        const newExperiences = [...experiences];
        const temp = newExperiences[currentIndex].order_index;
        newExperiences[currentIndex].order_index = newExperiences[newIndex].order_index;
        newExperiences[newIndex].order_index = temp;

        // Ordenar pelo order_index
        newExperiences.sort((a, b) => b.order_index - a.order_index);

        // Atualizar o estado
        setExperiences(newExperiences);

        try {
            setError(null);

            await updateExperience({ order_index: newExperiences[currentIndex].order_index }, newExperiences[currentIndex].id);
            await updateExperience({ order_index: newExperiences[newIndex].order_index }, newExperiences[newIndex].id);
        } catch (err) {
            console.error("Erro ao reordenar experiências:", err);
            setError("Não foi possível reordenar as experiências. Tente novamente mais tarde.");

            // Reverter as mudanças em caso de erro
            fetchExperiences();
        }
    };

    const reorderExperiences = async () => {
        try {
            const sortedExperiences = [...experiences].sort((a, b) => b.order_index - a.order_index);
        
            for (let i = 0; i < sortedExperiences.length; i++) {
                await updateExperience({ order_index: sortedExperiences.length - 1 - i }, sortedExperiences[i].id);
            }

            fetchExperiences();
        } catch (err) {
            console.error("Erro ao reordenar experiências:", err);
            setError("Não foi possível reordenar as experiências. Tente novamente mais tarde.");
        }
    };

    const startEditing = (experience: Experience) => {
        setFormData({
            title: experience.title,
            company: experience.company,
            period: experience.period,
            description: experience.description,
            icon: experience.icon,
        });

        setIsEditing(experience.id);
        setIsCreating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetForm = () => {
        setFormData({
            title: "",
            company: "",
            period: "",
            description: "",
            icon: "💻",
        });
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
                <LoadingSpinner text="Carregando experiências..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Experiências</h2>
                {!isCreating && !isEditing && (
                    <Button onClick={startCreating} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nova Experiência
                    </Button>
                )}
            </div>

            {error && <ErrorMessage message={error} />}

            {/* Form for creating/editing */}
            {(isCreating || isEditing !== null) && (
                <Card className="border-0 bg-[#2C3953]/80 pt-4 pb-4">
                    <CardHeader>
                        <CardTitle>
                            {isCreating
                                ? "Nova Experiência"
                                : "Editar Experiência"}
                        </CardTitle>
                        <CardDescription>
                            {isCreating
                                ? "Preencha os dados para criar uma nova experiência"
                                : "Atualize os dados da experiência"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Cargo</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="bg-[#1a2235]/50 border-[#1a2235]"
                                placeholder="Ex: Desenvolvedor Full Stack"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company">Empresa</Label>
                            <Input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="bg-[#1a2235]/50 border-[#1a2235]"
                                placeholder="Ex: Tech Solutions Inc."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="period">Período</Label>
                            <Input
                                id="period"
                                name="period"
                                value={formData.period}
                                onChange={handleInputChange}
                                className="bg-[#1a2235]/50 border-[#1a2235]"
                                placeholder="Ex: 2021 - Presente"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="bg-[#1a2235]/50 border-[#1a2235] min-h-[100px]"
                                placeholder="Descreva suas responsabilidades e conquistas nesta posição"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon">Ícone</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="icon"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleInputChange}
                                    className="bg-[#1a2235]/50 border-[#1a2235] flex-1"
                                    placeholder="Insira um emoji ou texto"
                                    maxLength={4}
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-auto">
                                            Emojis
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0" align="end">
                                        <div className="p-4">
                                            <h4 className="mb-2 text-sm font-medium">
                                                Emojis Populares
                                            </h4>
                                            <div className="grid grid-cols-6 gap-2">
                                                {popularEmojis.map((emoji) => (
                                                    <Button
                                                        key={emoji}
                                                        variant="outline"
                                                        className="h-10 w-10 p-0 text-xl"
                                                        onClick={() => setFormData((prev) => ({ ...prev, icon: emoji }))}
                                                    >
                                                        {emoji}
                                                    </Button>
                                                ))}
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-xs text-muted-foreground">
                                                    Dica: Você também pode colar
                                                    qualquer emoji do seu
                                                    teclado ou usar sites como{" "}
                                                    <a
                                                        href="https://emojipedia.org/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:underline"
                                                    >
                                                        Emojipedia
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl">
                                    {formData.icon || "?"}
                                </div>
                                <span className="text-sm text-gray-400">
                                    Visualização do ícone
                                </span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={cancelAction} className="gap-2">
                            <X className="h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => isCreating ? handleCreateExperience() : handleUpdateExperience(isEditing!)}
                            className="gap-2"
                            disabled={isSaving}
                        >
                            <Save className="h-4 w-4" />
                            {isSaving
                                ? "Salvando..." : isCreating
                                ? "Criar Experiência" : "Salvar Alterações"}
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Experiences list */}
            <div className="grid grid-cols-1 gap-4">
                {experiences.length === 0 && !isCreating ? (
                    <div className="text-center py-8 bg-[#2C3953]/50 rounded-lg">
                        <p>Nenhuma experiência encontrada.</p>
                        <Button onClick={startCreating} variant="link" className="mt-2">
                            Criar sua primeira experiência
                        </Button>
                    </div>
                ) : (
                    experiences.map((experience, index) => (
                        <Card key={experience.id} className="border-0 bg-[#2C3953]/50 overflow-hidden">
                            <CardContent className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4">
                                    <div className="bg-[#1a2235] rounded-lg flex items-center justify-center">
                                        <div className="text-4xl">
                                            {experience.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                            <h3 className="text-lg sm:text-xl font-semibold">
                                                {experience.title}
                                            </h3>
                                            <span className="text-blue-300 text-xs sm:text-sm mt-1 md:mt-0">
                                                {experience.period}
                                            </span>
                                        </div>
                                        <p className="text-blue-200 mb-3 sm:mb-4">
                                            {experience.company}
                                        </p>
                                        <p className="text-gray-300 text-sm line-clamp-2">
                                            {experience.description}
                                        </p>

                                        <div className="flex justify-end items-center mt-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => moveExperience(experience.id,"up")}
                                                    disabled={index === 0}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <ChevronUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => moveExperience(experience.id, "down")}
                                                    disabled={index === experiences.length - 1}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => startEditing(experience)}
                                                    className="gap-1"
                                                >
                                                    <Pencil className="h-3 w-3" />
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteExperience(experience.id)}
                                                    className="gap-1"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Excluir
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
