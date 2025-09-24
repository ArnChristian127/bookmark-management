"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { Auth } from "@/utils/supabase/functions";
import { FiPlus } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { createClient } from "@/utils/supabase/client";
import ModalCreateCategory from "@/components/ModalCreateCategory";
import Link from "next/link";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [addCategory, setAddCategory] = useState("");
    const [categories, setCategories] = useState<any>([]);
    const router = useRouter();
    const params = useParams();
    const supabase = createClient();
    const id = params.id;
    const links = [
        { name: 'Account', href: `/users/${id}/account`, icon: <CiUser/> },
        { name: 'Dashboard', href: `/users/${id}`, icon: <MdDashboard/> }
    ]
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
    }
    useEffect(() => {
        Auth.AuthGuardSession(router);
        fetchCategories();
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
                    {links.map((item, index) => (
                        <div className="hover:bg-slate-700" key={index}>
                            <Link href={item.href} className="py-2 rounded-md flex items-center gap-3 px-3">
                                {item.icon}
                                {item.name}
                            </Link>
                        </div>
                    ))}
                    <button onClick={() => setOpen(true)} className="hover:bg-slate-700 flex items-center gap-2 px-3 py-2 w-full">
                        <FiPlus/>
                        Add Category
                    </button>
                    <div>
                        <h1 className="text-gray-300 px-3 mt-5">Categories</h1>
                    </div>
                    <div className="flex-grow overflow-y-auto flex flex-col">
                        {categories.map((items: any) => (
                            <Link href={`/users/${id}/category/${items.id}`} key={items.id} className="px-3 py-2 hover:bg-slate-700">
                                @{items.title}
                            </Link>
                        ))}
                    </div>
                </aside>
                <header className="bg-purple-400 flex items-center justify-between px-4">
                    <h1 className="text-white font-semibold text-md md:text-lg lg:text-xl">
                        Bookmark Management
                    </h1>
                </header>
                <main className="bg-gray-50 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    )
}