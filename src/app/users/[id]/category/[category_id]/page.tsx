"use client";
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client";
import CardBookmark from "@/components/cards/CardBookmark";
import ModalCreateBookmark from "@/components/modals/ModalCreateBookmark";
import ModalEditBookmark from "@/components/modals/ModalEditBookmark";
export default function Bookmarks() {
    const [category, setCategory] = useState<any>(null);
    const [bookmarks, setBookmarks] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editUrl, setEditUrl] = useState("");
    const [editId, setEditId] = useState("");
    const [editModal, setEditModal] = useState(false);
    const params = useParams();
    const id = params.category_id;
    const supabase = createClient();
    const placeholder = []
    for (let i = 0; i < 6; i++) {
        placeholder.push(
            <div key={i} className="animate-pulse">
                <div className="h-50 bg-gray-300 rounded-lg"></div>
            </div>
        )
    }
    const fetchCategory = async () => {
        const { data } = await supabase.from('category').select('*').eq('id', id).single();
        setCategory(data);
    }
    const fetchBookmarks = async () => {
        const { data } = await supabase.from('bookmarks').select('*').eq('category_id', id).order('id', { ascending: false });
        setBookmarks(data);
    }
    const addBookmark = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('bookmarks').insert({
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
            console.log(error);
        }
    }
    const editBookmark = (edit: any) => {
        setEditId(edit.id);
        setEditTitle(edit.title);
        setEditDescription(edit.description);
        setEditUrl(edit.link);
        setEditModal(true);
    }
    const handlerEditBookmark = async (e: React.FormEvent) => {
        e.preventDefault();
        await supabase.from('bookmarks').update({
            title: editTitle,
            description: editDescription,
            link: editUrl,
        }).eq('id', editId);
        setEditModal(false);
        fetchBookmarks();
    }
    const deleteBookmark = async (delete_id: string) => {
        const { error } = await supabase.from('bookmarks').delete().eq('id', delete_id);
        if (!error) {
            fetchBookmarks();
        } else {
            console.log(error);
        }
    }
    const refresh = async () => {
        fetchCategory();
        fetchBookmarks();
        setLoading(false);
        setTimeout(() => {
            setLoading(true);
        }, 1500)
    }
    useEffect(() => {
        refresh();
    }, [])
    return (
        <>
            {open && (
                <ModalCreateBookmark
                    onClose={() => setOpen(false)}
                    title={title}
                    description={description}
                    url={url}
                    onChangeTitle={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    onChangeDescription={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    onChangeUrl={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    onSubmit={addBookmark}
                />
            )}
            {editModal && (
                <ModalEditBookmark
                    onClose={() => setEditModal(false)}
                    title={editTitle}
                    description={editDescription}
                    url={editUrl}
                    onChangeTitle={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
                    onChangeDescription={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                    onChangeUrl={(e: React.ChangeEvent<HTMLInputElement>) => setEditUrl(e.target.value)}
                    onSubmit={handlerEditBookmark}
                />
            )}
            {loading ? (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                            Category "{category?.title}"
                        </h1>
                        <button onClick={() => setOpen(true)} className="my-3 px-3 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-3 hover:bg-gray-100 shadow">
                            Add Bookmark
                        </button>
                    </div>
                    <hr className="my-3 border-t border-gray-300" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {bookmarks?.map((bookmark: any) => (
                            <CardBookmark
                                key={bookmark.id}
                                title={bookmark.title}
                                description={bookmark.description}
                                url={bookmark.link}
                                editBookmark={() => editBookmark(bookmark)}
                                deleteBookmark={() => deleteBookmark(bookmark.id)}
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
                        {placeholder}
                    </div>
                </>
            )}
        </>
    )
}