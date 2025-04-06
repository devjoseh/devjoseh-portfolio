import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, Label, Input, Particles, FormMessage, Message, SubmitButton } from "@/components/index"
import { signIn as signInAction } from "@/utils/actions/auth";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a2235] to-[#2C3953] flex items-center justify-center p-4 relative">
            <Particles className="absolute inset-0" />

            <div className="w-full max-w-md z-10">
                <Card className="border-0 shadow-xl bg-[#2C3953]/80 backdrop-blur-sm pt-5 pb-5">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Painel Administrativo
                        </CardTitle>
                        <CardDescription className="text-center">
                            Entre com suas credenciais para acessar o painel
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex-1 flex flex-col min-w-64">
                            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                />
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    required
                                />
                                <SubmitButton
                                    pendingText="Entrando..."
                                    formAction={signInAction}
                                >
                                    Entrar
                                </SubmitButton>
                                <FormMessage message={searchParams} />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Link className="w-full" href="/">
                            <Button variant="outline" className="w-full cursor-pointer">
                                <Home className="mr-2 h-4 w-4" />
                                Voltar para o site
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}