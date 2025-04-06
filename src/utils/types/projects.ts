import { Database } from "./database.types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export type ProjectLink = {
    name: string;
    url: string;
    icon: string;
};

export interface ProjectLinksManagerProps {
    links: ProjectLink[];
    onChange: (links: ProjectLink[]) => void;
}