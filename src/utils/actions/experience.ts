"use server";

import { createClient } from "@/utils/supabase/server";
import { Experience } from "../types/experiences";

type FormData = Omit<Experience, "id" | "created_at" | "updated_at" | "order_index">;

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

export async function createExperience(formData:FormData, order_index:number) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("experiences")
        .insert([
            {
                ...formData,
                order_index: order_index + 1
            },
        ])
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

export async function updateItems(
    item1: { order:number, id:number }, 
    item2: { order:number, id:number }
) {
    const supabase = await createClient();

    await Promise.all([
        supabase
            .from("experiences")
            .update({ order_index: item1.order })
            .eq("id", item1.id),
        supabase
            .from("experiences")
            .update({ order_index: item2.order })
            .eq("id", item2.id)
    ])

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