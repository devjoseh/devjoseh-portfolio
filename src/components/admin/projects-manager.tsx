"use client";

import { fetchProjects as fetchProjectsDb, createProject, updateProject, deleteProject, prepareProjectForDB, parseProject } from "@/utils/actions/project";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus, Save, Trash2, X, ExternalLink, Github, LinkIcon, ChevronUp, ChevronDown } from "lucide-react";
import { Button, Label, Input, Textarea, LoadingSpinner } from "@/components/index";
import type { CustomProject, ProjectLink } from "@/utils/types/projects";
import { ProjectLinksManager } from "./project-links-manager";
import { useState, useEffect } from "react";
import ImageUpload from "./image-upload";
import Image from "next/image";

const iconMap: Record<string, React.ReactNode> = {
    link: <LinkIcon size={12} />,
    github: <Github size={12} />,
    external: <ExternalLink size={12} />,
};

export function ProjectsManager() {
    const [projects, setProjects] = useState<CustomProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form state
    const [formData, setFormData] = useState<
    Omit<CustomProject, "id" | "created_at">
  >({
      title: "",
      description: "",
      image_url: "",
      tags: [],
      links: [],
      order_index: 0,
  });

    const [imageUploaded, setImageUploaded] = useState(false);
    const [tagsInput, setTagsInput] = useState<string>("")

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchProjectsDb();
            setProjects(data.map(parseProject));
        } catch (err) {
            console.error("Erro ao buscar projetos:", err);
            setError("Não foi possível carregar os projetos. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        setTagsInput(inputValue)

        const tagsArray = inputValue
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
  
        setFormData((prev) => ({ ...prev, tags: tagsArray }))
    };

    const handleLinksChange = (links: ProjectLink[]) => {
        setFormData((prev) => ({ ...prev, links }));
    };

    const handleCreateProject = async () => {
        if (!formData.image_url) {
            setError("É necessário fazer upload de uma imagem para o projeto.");
            return;
        }

        try {
            const maxOrderIndex = projects.length > 0
                ? Math.max(...projects.map((exp) => exp.order_index))
                : -1;

            const createData = {
                ...formData,
                order_index: maxOrderIndex + 1
            };
            
            const dbData = prepareProjectForDB(createData);
            const data = await createProject(dbData);
            setProjects((prev) => [parseProject(data[0]), ...prev]);
            
            resetForm();
            setIsCreating(false);
        } catch (err) {
            console.error("Erro ao criar projeto:", err);
            setError("Não foi possível criar o projeto. Tente novamente mais tarde.");
        }
    };

    const handleUpdateProject = async (id: number) => {
        if (!formData.image_url) {
            setError("É necessário fazer upload de uma imagem para o projeto.");
            return;
        }

        try {
            const dbData = prepareProjectForDB(formData);
            await updateProject(dbData, id);

            setProjects((prev) => prev.map((project) =>
                project.id === id ? parseProject({ ...project, ...dbData }) : project
            ));

            resetForm();
            setIsEditing(null);
        } catch (err) {
            console.error("Erro ao atualizar projeto:", err);
            setError("Não foi possível atualizar o projeto. Tente novamente mais tarde.");
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

        try {
            await deleteProject(id);

            setProjects((prev) => prev.filter((project) => project.id !== id));
            reorderProjects()
        } catch (err) {
            console.error("Erro ao excluir projeto:", err);
            setError("Não foi possível excluir o projeto. Tente novamente mais tarde.");
        }
    };

    const moveProject = async (id: number, direction: "up" | "down") => {
        const currentIndex = projects.findIndex((exp) => exp.id === id);
        if (currentIndex === -1) return;

        const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

        // Verificar se o novo índice é válido
        if (newIndex < 0 || newIndex >= projects.length) return;

        // Trocar as posições
        const newProjects = [...projects];
        const temp = newProjects[currentIndex].order_index;
        newProjects[currentIndex].order_index = newProjects[newIndex].order_index;
        newProjects[newIndex].order_index = temp;

        // Ordenar pelo order_index
        newProjects.sort((a, b) => b.order_index - a.order_index);

        // Atualizar o estado
        setProjects(newProjects);

        try {
            setError(null);

            await updateProject({ order_index: newProjects[currentIndex].order_index }, newProjects[currentIndex].id);
            await updateProject({ order_index: newProjects[newIndex].order_index }, newProjects[newIndex].id);
        } catch (err) {
            console.error("Erro ao reordenar projetos:", err);
            setError("Não foi possível reordenar os projetos. Tente novamente mais tarde.");

            // Reverter as mudanças em caso de erro
            fetchProjects();
        }
    };

    const reorderProjects = async () => {
        try {
            const sortedProjects = [...projects].sort((a, b) => b.order_index - a.order_index);
        
            for (let i = 0; i < sortedProjects.length; i++) {
                await updateProject({ order_index: sortedProjects.length - 1 - i }, sortedProjects[i].id);
            }

            fetchProjects();
        } catch (err) {
            console.error("Erro ao reordenar projetos:", err);
            setError("Não foi possível reordenar os projetos. Tente novamente mais tarde.");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            image_url: "",
            tags: [],
            links: [],
            order_index: 0
        });

        setTagsInput("")
        setImageUploaded(false);
    };

    const startEditing = (project: CustomProject) => {
        setFormData({
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            tags: project.tags,
            links: project.links,
            order_index: project.order_index
        });

        setTagsInput(project.tags.join(", "));
        setImageUploaded(true);
        setIsEditing(project.id);
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
                <LoadingSpinner text="Carregando projetos..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Projetos</h2>
                {!isCreating && !isEditing && (
                    <Button onClick={startCreating} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Projeto
                    </Button>
                )}
            </div>

            {error && (<div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-md">{error}</div>)}

            {/* Form for creating/editing */}
            {(isCreating || isEditing !== null) && (
                <Card className="border-0 bg-[#2C3953]/80 pt-4 pb-4">
                    <CardHeader>
                        <CardTitle>
                            {isCreating ? "Novo Projeto" : "Editar Projeto"}
                        </CardTitle>
                        <CardDescription>
                            {isCreating
                                ? "Preencha os dados para criar um novo projeto"
                                : "Atualize os dados do projeto"}
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

                        <ImageUpload
                            onImageUploaded={(url) => {
                                setFormData((prev) => ({ ...prev, image_url: url }));
                                setImageUploaded(true);
                            }}

                            folder="projects"
                            existingImageUrl={isEditing !== null ? formData.image_url : undefined}
                        />

                        <div className="space-y-2">
                            <Label htmlFor="tags">
                                Tags (separadas por vírgula)
                            </Label>
                            <Input
                                id="tags"
                                name="tags"
                                value={tagsInput}
                                onChange={handleTagsChange}
                                className="bg-[#1a2235]/50 border-[#1a2235]"
                                placeholder="React, TypeScript, Tailwind CSS"
                            />
                        </div>

                        {/* Novo componente para gerenciar links */}
                        <ProjectLinksManager
                            links={formData.links}
                            onChange={handleLinksChange}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={cancelAction} className="gap-2">
                            <X className="h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => isCreating ? handleCreateProject() : handleUpdateProject(isEditing!)}
                            className="gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {isCreating ? "Criar Projeto" : "Salvar Alterações"}
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Projects list */}
            <div className="grid grid-cols-1 gap-4">
                {projects.length === 0 && !isCreating ? (
                    <div className="text-center py-8 bg-[#2C3953]/50 rounded-lg">
                        <p>Nenhum projeto encontrado.</p>
                        <Button onClick={startCreating} variant="link" className="mt-2">
                            Criar seu primeiro projeto
                        </Button>
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <Card key={project.id} className="border-0 bg-[#2C3953]/50 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
                                <div className="aspect-video md:aspect-square overflow-hidden bg-[#1a2235]">
                                    <Image
                                        src={project.image_url ||"/placeholder.svg"}
                                        alt={project.title}
                                        width={800}
                                        height={450}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {project.links && project.links.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.links.map(
                                                (link, index) => (
                                                    <Button
                                                        key={index}
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-1 text-xs h-auto py-1"
                                                        onClick={() =>window.open(link.url, "_blank")}
                                                    >
                                                        {link.icon && iconMap[link.icon] 
                                                        ? (iconMap[link.icon]) 
                                                        : (<LinkIcon size={12}/>)} {link.name}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => moveProject(project.id,"up")}
                                            disabled={index === 0}
                                            className="h-8 w-8 p-0"
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => moveProject(project.id, "down")}
                                            disabled={index === projects.length - 1}
                                            className="h-8 w-8 p-0"
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => startEditing(project)}
                                            className="gap-1"
                                        >
                                            <Pencil className="h-3 w-3" />
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="gap-1"
                                        >
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
