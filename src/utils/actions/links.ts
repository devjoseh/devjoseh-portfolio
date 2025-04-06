"use server";

import { createClient } from "@/utils/supabase/server";
import { Link } from "../types/links";

export async function fetchLinks(): Promise<Link[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("links")
        .select()
        .order("order_index", { ascending: true })

    if (error) throw error;
    return data;
}

export async function updateLink(formData:any, id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("links")
        .update(formData)
        .eq("id", id);
    
    if (error) throw error;
    return true;   
}

export async function createLink(formData:any) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("links")
        .insert(formData)
        .select();
    
    if (error) throw error;
    return data;
}

export async function deleteLink(id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", id);
    
    if (error) throw error;
    return true;  
}