"use server";

import { createClient } from "@/utils/supabase/server";
import { Project } from "../types/projects";

type FormData = Omit<Project, "created_at" | "id" | "updated_at">

export async function fetchProjects(): Promise<Project[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .select()
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export async function createProject(formData:FormData) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .insert([
            {
                ...formData
            },
        ])
        .select();
    
    if (error) throw error;
    return data;
}

export async function updateProject(formData:FormData, id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("projects")
        .update({
            ...formData
        })
        .eq("id", id);
    
    if (error) throw error;
    return true;   
}

export async function deleteProject(id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
    
    if (error) throw error;
    return true;  
}