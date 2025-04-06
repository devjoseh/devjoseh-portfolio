"use server";

import { createClient } from "@/utils/supabase/server";
import { Hackathon } from "../types/hackathons";

type FormData = Omit<Hackathon, "created_at" | "id" | "order_index">

export async function fetchHackathons(): Promise<Hackathon[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("hackathons")
        .select()
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false })

    if (error) throw error;
    return data;
}

export async function createHackathon(formData:FormData) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("hackathons")
        .insert([
            {
                ...formData
            },
        ])
        .select();
    
    if (error) throw error;
    return data;
}

export async function updateHackathon(formData:any, id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("hackathons")
        .update(formData)
        .eq("id", id);
    
    if (error) throw error;
    return true;   
}

export async function deleteHackathon(id:number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("hackathons")
        .delete()
        .eq("id", id);
    
    if (error) throw error;
    return true;  
}

