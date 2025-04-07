"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchProjects() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .select()
        .order("order_index", { ascending: false })

    if (error) throw error;
    return data;
}

export async function createProject(formData:any) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .insert(formData)
        .select();
    
    if (error) throw error;
    return data;
}

export async function updateProject(formData:any, id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("projects")
        .update(formData)
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