import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/index";
import { HackathonsManager } from "./hackathons-manager";
import { ProjectsManager } from "./projects-manager";
import { ExperiencesManager } from "./experiences-manager";
import { LinksManager } from "./links-manager";

export async function AdminDashboard() {
    return (
        <main className="container mx-auto px-4 py-8">
            <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="projects">Projetos</TabsTrigger>
                    <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
                    <TabsTrigger value="experiences">Experiências</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                </TabsList>

                <TabsContent value="projects">
                    <ProjectsManager />
                </TabsContent>

                <TabsContent value="hackathons">
                    <HackathonsManager />
                </TabsContent>

                <TabsContent value="experiences">
                    <ExperiencesManager />
                </TabsContent>

                <TabsContent value="links">
                    <LinksManager />
                </TabsContent>
            </Tabs>
        </main>
    );
}
