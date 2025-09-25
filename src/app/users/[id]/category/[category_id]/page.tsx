// Import necessary hooks and components
"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { animate, stagger } from "animejs";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import CardBookmark from "@/components/cards/CardBookmark";
import ModalCreateBookmark from "@/components/modals/ModalCreateBookmark";
import ModalEditBookmark from "@/components/modals/ModalEditBookmark";
import ModalOption from "@/components/modals/ModalOption";

// Main component for displaying bookmarks in a category
export default function Bookmarks() {
    // State for category info
    const [category, setCategory] = useState<any>(null);
    // State for list of bookmarks
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    // Loading state for animation
    const [loading, setLoading] = useState(false);
    // Modal state for creating bookmark
    const [open, setOpen] = useState(false);
    // States for new bookmark fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    // States for editing bookmark
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editUrl, setEditUrl] = useState("");
    const [editModal, setEditModal] = useState(false);
    // State for option modal (delete confirmation)
    const [optionModal, setOptionModal] = useState(false);
    // Map to track favorite bookmarks
    const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});
    // State for bookmark to delete
    const [deleteId, setDeleteId] = useState<string | null>(null);
    // Get route parameters
    const params = useParams();
    // Create Supabase client
    const supabase = createClient();
    // Get category id from params
    const id = params.category_id as string;
    // Placeholder cards for loading state
    const placeholders = useMemo(() =>
        Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="animate-pulse">
                <div className="h-50 bg-gray-300 rounded-lg"></div>
            </div>
        )), []
    );
    // Fetch category info from database
    const fetchCategory = useCallback(async () => {
        const { data } = await supabase
            .from("category")
            .select("*")
            .eq("id", id)
            .single();
        setCategory(data);
    }, [id, supabase]);
    // Fetch bookmarks for the category
    const fetchBookmarks = useCallback(async () => {
        const { data } = await supabase
            .from("bookmarks")
            .select("*")
            .eq("category_id", id)
            .order("id", { ascending: false });
        if (data) {
            setBookmarks(data);
            // Build favorite map for quick lookup
            const favMap: Record<string, boolean> = {};
            data.forEach((b: any) => {
                favMap[b.id] = !!b.is_favorite;
            });
            setFavoriteMap(favMap);
        }
    }, [id, supabase]);
    // Add a new bookmark to the database
    const addBookmark = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("bookmarks").insert({
            users_id: category?.users_id,
            category_id: id,
            title,
            description,
            link: url,
        });
        if (!error) {
            setTitle("");
            setDescription("");
            setUrl("");
            setOpen(false);
            fetchBookmarks();
        } else {
            console.error(error);
        }
    };
    // Prepare to edit a bookmark
    const editBookmark = (b: any) => {
        setEditId(b.id);
        setEditTitle(b.title);
        setEditDescription(b.description);
        setEditUrl(b.link);
        setEditModal(true);
    };
    // Submit edited bookmark to database
    const handlerEditBookmark = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;
        await supabase
            .from("bookmarks")
            .update({
                title: editTitle,
                description: editDescription,
                link: editUrl,
            })
            .eq("id", editId);
        setEditModal(false);
        fetchBookmarks();
    };
    // Open delete confirmation modal
    const confirmDelete = (b: any) => {
        setOptionModal(true);
        setDeleteId(b.id);
    };
    // Delete a bookmark from database
    const deleteBookmark = async () => {
        if (!deleteId) return;
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", deleteId);

        if (!error) {
            fetchBookmarks();
        } else {
            console.error(error);
        }
        setOptionModal(false);
    };
    // Refresh category and bookmarks, trigger loading animation
    const refresh = useCallback(() => {
        fetchCategory();
        fetchBookmarks();
        setLoading(false);
        setTimeout(() => setLoading(true), 1500);
    }, [fetchCategory, fetchBookmarks]);
    // Set document title based on category
    useEffect(() => {
        document.title = `Category - ${category?.title || "Category"}`;
    }, [category]);
    // Refresh data on mount
    useEffect(() => {
        refresh();
    }, [refresh]);
    // Animate cards when loading
    useEffect(() => {
        if (loading) {
            animate(".stagger-card", {
                opacity: [0, 1],
                translateY: [40, 0],
                delay: stagger(150),
                duration: 300,
                easing: "easeOutQuad",
            });
        }
    }, [loading]);
    // Animate modals when opened
    useEffect(() => {
        if (editModal || open || optionModal) {
            animate(".pop-up", {
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 300,
                easing: "easeInOutQuad",
            });
        }
    }, [editModal, open, optionModal]);
    // Render UI
    return (
        <>
            {/* Option modal for delete confirmation */}
            {optionModal && (
                <ModalOption
                    className="pop-up"
                    title="Are you sure you want to delete this bookmark?"
                    onClose={() => setOptionModal(false)}
                    onDelete={deleteBookmark}
                />
            )}
            {/* Modal for creating a new bookmark */}
            {open && (
                <ModalCreateBookmark
                    className="pop-up"
                    onClose={() => setOpen(false)}
                    title={title}
                    description={description}
                    url={url}
                    onChangeTitle={(e) => setTitle(e.target.value)}
                    onChangeDescription={(e) => setDescription(e.target.value)}
                    onChangeUrl={(e) => setUrl(e.target.value)}
                    onSubmit={addBookmark}
                />
            )}
            {/* Modal for editing a bookmark */}
            {editModal && (
                <ModalEditBookmark
                    className="pop-up"
                    onClose={() => setEditModal(false)}
                    title={editTitle}
                    description={editDescription}
                    url={editUrl}
                    onChangeTitle={(e) => setEditTitle(e.target.value)}
                    onChangeDescription={(e) => setEditDescription(e.target.value)}
                    onChangeUrl={(e) => setEditUrl(e.target.value)}
                    onSubmit={handlerEditBookmark}
                />
            )}
            {/* Main content: bookmarks list and add button */}
            {loading ? (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                            Category "{category?.title}"
                        </h1>
                        <button
                            onClick={() => setOpen(true)}
                            className="my-3 px-3 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-3 hover:bg-gray-100 shadow"
                        >
                            Add Bookmark
                        </button>
                    </div>
                    <hr className="my-3 border-t border-gray-300" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {bookmarks.map((b: any) => (
                            <CardBookmark
                                className="stagger-card"
                                key={b.id}
                                title={b.title}
                                description={b.description}
                                url={b.link}
                                editBookmark={() => editBookmark(b)}
                                deleteBookmark={() => confirmDelete(b)}
                                isFavorite={!!favoriteMap[b.id]}
                                setFavorite={async () => {
                                    const updatedFavorite = !favoriteMap[b.id];
                                    setFavoriteMap(prev => ({
                                        ...prev,
                                        [b.id]: updatedFavorite
                                    }));
                                    await supabase
                                        .from("bookmarks")
                                        .update({ is_favorite: updatedFavorite })
                                        .eq("id", b.id);
                                    fetchBookmarks();
                                }}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="animate-pulse">
                        <div className="h-20 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {placeholders}
                    </div>
                </>
            )}
        </>
    );
}