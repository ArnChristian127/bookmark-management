// Enable client-side rendering
"use client";
// Import React hooks and components
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Auth } from "@/utils/supabase/functions";
import { createClient } from "@/utils/supabase/client";
import { animate } from "animejs";
import ModalCreateCategory from "@/components/modals/ModalCreateCategory";
import SideBar from "@/components/navbars/SideBar";
import Navbar from "@/components/navbars/Navbar";

// Main layout component for user dashboard
export default function Dashboard({ children }: { children: React.ReactNode }) {
    // State for navbar open/close
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    // State for create category modal
    const [open, setOpen] = useState(false);
    // State for new category input
    const [addCategory, setAddCategory] = useState("");
    // State for list of categories
    const [categories, setCategories] = useState<any[]>([]);
    // State for user info
    const [user, setUser] = useState<any>(null);
    // State for editing category
    const [editCategory, setEditCategory] = useState(false);
    // Ref for navbar animation
    const animeSlideNav = useRef<any>(null);
    // Router and params from Next.js
    const router = useRouter();
    const params = useParams();
    // Supabase client
    const supabase = createClient();
    // Get user id from params
    const id = params.id as string;
    // Fetch categories from database
    const fetchCategories = useCallback(async () => {
        const { data } = await supabase
            .from("category")
            .select("*")
            .eq("users_id", id);
        setCategories(data || []);
    }, [id, supabase]);
    // Add a new category to database
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("category").insert({
            users_id: id,
            title: addCategory,
        });
        if (!error) {
            setAddCategory("");
            setOpen(false);
            fetchCategories();
        } else {
            console.error(error);
        }
    };
    // Get current user info
    const getUser = async () => {
        const user = await Auth.GetUser();
        setUser(user);
    };
    // Sign out user and redirect to home
    const handleSignOut = async () => {
        await Auth.SignOut();
        router.push("/");
    };
    // Delete a category from database
    const deleteCategory = async (categoryid: string) => {
        await supabase.from("category").delete().eq("id", categoryid);
        router.push(`/users/${id}`);
        fetchCategories();
    };
    // Toggle navbar open/close with animation
    const navbarToggler = () => {
        if (isNavbarOpen) {
            animate(animeSlideNav.current, {
                translateX: [0, "-100%"],
                opacity: [1, 0],
                duration: 300,
                easing: "easeInOutQuad",
                onComplete: () => setIsNavbarOpen(false),
            });
        } else {
            setIsNavbarOpen(true);
        }
    };
    // Initial effect: guard session, fetch categories, get user
    useEffect(() => {
        Auth.AuthGuardSession(router);
        fetchCategories();
        getUser();
    }, [fetchCategories, router]);
    // Animate navbar when opened
    useEffect(() => {
        if (isNavbarOpen) {
            animate(animeSlideNav.current, {
                translateX: ["-100%", 0],
                duration: 300,
                opacity: [0, 1],
                easing: "easeInOutQuad",
            });
        }
    }, [isNavbarOpen]);
    // Render layout UI
    return (
        <>
            {/* Modal for creating a new category */}
            {open && (
                <ModalCreateCategory
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    onClose={() => setOpen(false)}
                    onSubmit={handleAddCategory}
                />
            )}
            {/* Main grid layout with sidebar and navbar */}
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
                    ref={animeSlideNav}
                    user={user}
                    isNavbarOpen={isNavbarOpen}
                    setIsNavbarOpen={navbarToggler}
                    id={id}
                    categories={categories}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                    setOpen={setOpen}
                    deleteCategory={deleteCategory}
                    handleSignOut={handleSignOut}
                />
                {/* Main content area */}
                <main className="bg-gray-50 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    );
}