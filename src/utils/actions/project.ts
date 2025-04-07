"use server";

import { ProjectLink, CustomProject, Project } from "../types/projects";
import { createClient } from "@/utils/supabase/server";
import { Json } from "../types/database.types";

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

export const isProjectLink = (link: any): link is ProjectLink => {
    return typeof link === 'object' && 
        link !== null &&
        'name' in link && 
        'url' in link && 
        'icon' in link;
};

export const safeLinksParse = (links: Json): ProjectLink[] => {
    if (!links || !Array.isArray(links)) return [];
    return links.filter(isProjectLink);
};

export const parseProject = (project: Project): CustomProject => ({
    ...project,
    links: safeLinksParse(project.links)
});

export const prepareProjectForDB = (
    project: Omit<CustomProject, "id" | "created_at">
): Omit<Project, "id" | "created_at"> => ({
    ...project,
    links: project.links as unknown as Json,
    order_index: project.order_index ?? 0,
});