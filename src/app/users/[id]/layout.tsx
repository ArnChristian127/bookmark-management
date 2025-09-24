"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { Auth } from "@/utils/supabase/functions";
import { BsList } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { createClient } from "@/utils/supabase/client";
import ModalCreateCategory from "@/components/ModalCreateCategory";
import Link from "next/link";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [addCategory, setAddCategory] = useState("");
    const [categories, setCategories] = useState<any>([]);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const params = useParams();
    const supabase = createClient();
    const id = params.id;
    const fetchCategories = async () => {
        const { data } = await supabase.from('category').select('*').eq('users_id', id);
        setCategories(data);
    }
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('category').insert({
            users_id: id,
            title: addCategory,
        });
        if (!error) {
            setAddCategory("");
            setOpen(false);
        } else {
            console.log(error);
        }
        fetchCategories();
    }
    const getUser = async () => {
        const user = await Auth.GetUser();
        setUser(user);
    }
    const handleSignOut = async () => {
        await Auth.SignOut();
        router.push('/');
    }
    useEffect(() => {
        Auth.AuthGuardSession(router);
        fetchCategories();
        getUser();
    }, [])
    return (
        <>
            {open && (
                <ModalCreateCategory
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    onClose={() => setOpen(false)}
                    onSubmit={handleAddCategory}
                />
            )}
            <div className="h-screen grid grid-cols-1 lg:grid-cols-[16rem_1fr] grid-rows-[4rem_1fr]">
                <aside className="hidden lg:flex row-span-2 bg-slate-800 text-white flex-col">
                    <h1 className="text-gray-300 p-3">Navigations</h1>
                    <div className="hover:bg-slate-700">
                        <Link href={`/users/${id}`} className="px-3 py-2 flex items-center gap-2">
                            <MdDashboard/>
                            Dashboard
                        </Link>
                    </div>
                    <button onClick={() => setOpen(true)} className="hover:bg-slate-700 flex items-center gap-2 px-3 py-2 w-full">
                        <FiPlus/>
                        Add Category
                    </button>
                    <div>
                        <h1 className="text-gray-300 px-3 mt-5">Categories</h1>
                    </div>
                    <div className="flex-grow overflow-y-auto flex flex-col mt-3 custom-scrollbar">
                        {categories.map((items: any) => (
                            <Link href={`/users/${id}/category/${items.id}`} key={items.id} className="px-3 py-2 hover:bg-slate-700">
                                #{items.title}
                            </Link>
                        ))}
                    </div>
                    <div className="py-3">
                        <hr className="my-3 border-t border-gray-600" />
                        <button onClick={handleSignOut} className="flex items-center gap-2 px-3 hover:text-purple-400 focus:text-purple-400">
                            <CiLogout/>
                            Sign Out
                        </button>
                    </div>
                </aside>
                <header className="bg-purple-400 flex items-center justify-between px-4 text-white">
                    <h1 className="font-semibold text-md md:text-lg lg:text-xl">
                        Bookmark Management
                    </h1>
                    <div className="items-center gap-2 hidden lg:flex">
                        <div className="h-8 w-8 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-500 font-bold">
                            {user?.username.charAt(0).toUpperCase()}
                        </div>
                        <p>@{user?.email}</p>
                    </div>
                    <button className="lg:hidden" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                        <BsList className="text-2xl"/>
                    </button>
                </header>
                <main className="bg-gray-50 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
            {/* Mobile Navbar (so lazy to create into component) */}
            {isNavbarOpen && (
                <nav className="fixed top-0 left-0 w-full min-h-screen bg-slate-800 text-white lg:hidden flex flex-col shadow-lg z-50">
                    <div className="flex justify-between items-center p-3 border-b border-gray-700">
                        <h1 className="text-gray-300">Navigations</h1>
                        <button onClick={() => setIsNavbarOpen(false)} aria-label="Close menu" className="text-2xl px-2 py-1 hover:text-purple-400 focus:outline-none">&times;</button>
                    </div>
                    <div className="hover:bg-slate-700">
                        <Link href={`/users/${id}`} className="px-3 py-2 flex items-center gap-2">
                            <MdDashboard/>
                            Dashboard
                        </Link>
                    </div>
                    <button onClick={() => setOpen(true)} className="hover:bg-slate-700 flex items-center gap-2 px-3 py-2 w-full">
                        <FiPlus/>
                        Add Category
                    </button>
                    <div>
                        <h1 className="text-gray-300 px-3 mt-5">Categories</h1>
                    </div>
                    <div className="flex-grow overflow-y-auto flex flex-col mt-3 custom-scrollbar">
                        {categories.map((items: any) => (
                            <Link href={`/users/${id}/category/${items.id}`} key={items.id} className="px-3 py-2 hover:bg-slate-700">
                                #{items.title}
                            </Link>
                        ))}
                    </div>
                    <div className="py-3">
                        <hr className="my-3 border-t border-gray-600" />
                        <button onClick={handleSignOut} className="flex items-center gap-2 px-3 hover:text-purple-400 focus:text-purple-400">
                            <CiLogout/>
                            Sign Out
                        </button>
                    </div>
                </nav>
            )}
        </>
    )
}