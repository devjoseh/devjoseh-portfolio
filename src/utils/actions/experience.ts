"use server";

import { createClient } from "@/utils/supabase/server";
import { Experience } from "../types/experiences";

export async function fetchExperiences(): Promise<Experience[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("experiences")
        .select()
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false })

    if (error) throw error;
    return data;
}

export async function createExperience(formData:any) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("experiences")
        .insert(formData)
        .select();
    
    if (error) throw error;
    return data;
}

export async function updateExperience(formData:any, id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("experiences")
        .update(formData)
        .eq("id", id);
    
    if (error) throw error;
    return true;   
}

export async function deleteExperience(id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);
    
    if (error) throw error;
    return true;  
}