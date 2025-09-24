"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Auth } from "@/utils/supabase/functions";
import { createClient } from "@/utils/supabase/client";
import ModalCreateCategory from "@/components/modals/ModalCreateCategory";
import SideBar from "@/components/navbars/SideBar";
import Navbar from "@/components/navbars/Navbar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [addCategory, setAddCategory] = useState("");
    const [categories, setCategories] = useState<any>([]);
    const [user, setUser] = useState<any>(null);
    const [editCategory, setEditCategory] = useState(false);
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
    const deleteCategory = async (categoryid: string) => {
        await supabase.from('category').delete().eq('id', categoryid);
        router.push(`/users/${id}`);
        fetchCategories();
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
                <SideBar
                    id={id}
                    categories={categories}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                    setOpen={setOpen}
                    deleteCategory={deleteCategory}
                    handleSignOut={handleSignOut}
                />
                <Navbar
                    user={user}
                    isNavbarOpen={isNavbarOpen}
                    setIsNavbarOpen={() => setIsNavbarOpen(!isNavbarOpen)}
                    id={id}
                    categories={categories}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                    setOpen={setOpen}
                    deleteCategory={deleteCategory}
                    handleSignOut={handleSignOut}
                />
                <main className="bg-gray-50 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    )
}