"use client";

import { Button, Input, Label } from "@/components/index";
import { uploadFile } from "@/utils/actions/image-upload";
import { Upload, X, ImageIcon } from "lucide-react";
import { useState } from "react";
import type React from "react";
import Image from "next/image";

interface ImageUploadProps {
    onImageUploaded: (url: string) => void;
    folder: string; // 'projects' ou 'hackathons'
    existingImageUrl?: string;
}

export default function ImageUpload({
    onImageUploaded,
    folder,
    existingImageUrl,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>( existingImageUrl || null );
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Verificar tipo de arquivo
        if (!selectedFile.type.startsWith("image/")) {
            setError("Por favor, faça upload apenas de imagens");
            return;
        }

        // Verificar tamanho do arquivo (limite de 5MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError("A imagem deve ter menos de 5MB.");
            return;
        }

        setError(null);
        setFile(selectedFile);

        // Criar URL de preview
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Selecione uma imagem para fazer upload.");
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            // Gerar nome de arquivo único
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            // Fazer upload para o Supabase Storage
            const uploadedFileUrl = await uploadFile(filePath, file)

            // Retornar URL para o componente pai
            onImageUploaded(uploadedFileUrl);
        } catch (err) {
            console.error("Erro ao fazer upload da imagem:", err);
            setError("Falha ao fazer upload da imagem. Tente novamente.");
        } finally {
            setIsUploading(false);
        }
    };

    const clearImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setFile(null);
        setError(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="image">Imagem</Label>

                {previewUrl ? (
                    <div className="relative">
                        <div className="aspect-video rounded-md overflow-hidden bg-[#1a2235]/70 border border-[#1a2235]">
                            <Image
                                src={previewUrl || "/placeholder.svg"}
                                alt="Preview"
                                width={800}
                                height={450}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={clearImage}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-[#2C3953] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a2235]/30">
                        <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-400 mb-2">
                            Arraste uma imagem ou clique para selecionar
                        </p>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                document.getElementById("image")?.click()
                            }
                            className="mt-2"
                        >
                            Selecionar Imagem
                        </Button>
                    </div>
                )}
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {file && !existingImageUrl && (
                <Button type="button" onClick={handleUpload} disabled={isUploading} className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    {isUploading ? "Enviando..." : "Fazer Upload"}
                </Button>
            )}

            {file && existingImageUrl && (
                <Button type="button" onClick={handleUpload} disabled={isUploading} className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    {isUploading ? "Atualizando..." : "Atualizar Imagem"}
                </Button>
            )}
        </div>
    );
}
