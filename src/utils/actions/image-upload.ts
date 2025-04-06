"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadFile(filePath:string, file:File) {
    const supabase = await createClient();

    const { error: uploadError } = await supabase.storage
        .from("banners")
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
        .from("banners")
        .getPublicUrl(filePath)

    return publicUrl;  
}