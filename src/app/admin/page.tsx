import { signOut as signOutAction } from "@/utils/actions/auth";
import { isAuthenticated } from "@/utils/actions/auth";
import { AdminDashboard } from "@/components/index";
import { Button } from "@/components/index";
import Link from 'next/link'

export default async function ProtectedPage() {
    const user = await isAuthenticated()

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a2235] to-[#2C3953] text-white">
            <header className="bg-[#1a2235] shadow-md py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">

                    <h1 className="text-xl font-bold">Olá, {user.email}</h1>

                    <form action={signOutAction}>
                        <Button type="submit" variant={"outline"}>
                            Desconectar
                        </Button>
                    </form>
                </div>
            </header>

            <AdminDashboard/>
        </div>
    )
}