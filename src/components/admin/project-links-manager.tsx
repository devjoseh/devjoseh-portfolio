"use client";

import { Plus, Trash2, LinkIcon, Github, ExternalLink, FileText, Instagram, Database, Newspaper, Youtube, Linkedin, Mail,} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { ProjectLink, ProjectLinksManagerProps } from "@/utils/types/projects";
import { Button, Label, Input } from "@/components/index";
import { useState } from "react";

const availableIcons = [
    { value: "link", label: "Link", icon: <LinkIcon className="h-4 w-4" /> },
    { value: "github", label: "GitHub", icon: <Github className="h-4 w-4" /> },
    { value: "external", label: "Site", icon: <ExternalLink className="h-4 w-4" /> },
    { value: "docs", label: "Documentação", icon: <FileText className="h-4 w-4" /> },
    { value: "instagram", label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { value: "drive", label: "Google Drive", icon: <Database className="h-4 w-4" /> },
    { value: "news", label: "Notícias", icon: <Newspaper className="h-4 w-4" /> },
    { value: "youtube", label: "YouTube", icon: <Youtube className="h-4 w-4" /> },
    { value: "linkedin", label: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
    { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
];

export function ProjectLinksManager({ links, onChange }: ProjectLinksManagerProps) {
    const [newLink, setNewLink] = useState<ProjectLink>({
        name: "",
        url: "",
        icon: "link",
    });

    const handleAddLink = () => {
        if (!newLink.name || !newLink.url) return;

        const updatedLinks = [...links, { ...newLink }];
        onChange(updatedLinks);
        setNewLink({ name: "", url: "", icon: "link" });
    };

    const handleRemoveLink = (index: number) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        onChange(updatedLinks);
    };

    const handleLinkChange = (field: keyof ProjectLink, value: string) => {
        setNewLink((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-4">
            <Label>Links do Projeto</Label>

            {/* Lista de links existentes */}
            {links.length > 0 ? (
                <div className="space-y-2">
                    {links.map((link, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-[#1a2235]/30 rounded-md">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#2C3953] rounded-md">
                                {availableIcons.find((i) => i.value === link.icon)?.icon || <LinkIcon className="h-4 w-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {link.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {link.url}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-white"
                                onClick={() => handleRemoveLink(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-4 bg-[#1a2235]/30 rounded-md text-gray-400 text-sm">
                    Nenhum link adicionado
                </div>
            )}

            {/* Formulário para adicionar novo link */}
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3">
                    <Select value={newLink.icon} onValueChange={(value) => handleLinkChange("icon", value)}>
                        <SelectTrigger className="bg-[#1a2235]/50 border-[#1a2235]">
                            <SelectValue placeholder="Ícone" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableIcons.map((icon) => (
                                <SelectItem key={icon.value} value={icon.value} className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        {icon.icon}
                                        <span>{icon.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-4">
                    <Input
                        placeholder="Nome do link"
                        value={newLink.name}
                        onChange={(e) => handleLinkChange("name", e.target.value)}
                        className="bg-[#1a2235]/50 border-[#1a2235]"
                    />
                </div>
                <div className="col-span-4">
                    <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={(e) => handleLinkChange("url", e.target.value)}
                        className="bg-[#1a2235]/50 border-[#1a2235]"
                    />
                </div>
                <div className="col-span-1">
                    <Button
                        type="button"
                        size="icon"
                        onClick={handleAddLink}
                        disabled={!newLink.name || !newLink.url}
                        className="w-full h-full"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
