"use client";
import { useState, useEffect } from "react"
import { animate, stagger } from "animejs";
import { useParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client";
import CardBookmark from "@/components/cards/CardBookmark";
import ModalCreateBookmark from "@/components/modals/ModalCreateBookmark";
import ModalEditBookmark from "@/components/modals/ModalEditBookmark";
import ModalOption from "@/components/modals/ModalOption";

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
    const [optionModal, setOptionModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const params = useParams();
    const supabase = createClient();
    const id = params.category_id;
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
    const closeOptionModal = (data: any) => {
        setOptionModal(true);
        setDeleteId(data.id);
    }
    const deleteBookmark = async () => {
        if (deleteId) {
            const { error } = await supabase.from('bookmarks').delete().eq('id', deleteId);
            if (!error) {
                fetchBookmarks();
            } else {
                console.log(error);
            }
        }
        setOptionModal(false);
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
    useEffect(() => {
        animate('.stagger-card', {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(150),
            duration: 300,
            easing: 'easeOutQuad',
        });
    }, [loading])
    useEffect(() => {
        animate('.pop-up', {
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        })
    }, [editModal, open, optionModal])
    return (
        <>
            {optionModal && (
                <ModalOption
                    className="pop-up"
                    title="Are you sure you want to delete this bookmark?"
                    onClose={() => setOptionModal(false)}
                    onDelete={() => deleteBookmark()}
                />
            )}
            {open && (
                <ModalCreateBookmark
                    className="pop-up"
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
                    className="pop-up"
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
                                className="stagger-card"
                                key={bookmark.id}
                                title={bookmark.title}
                                description={bookmark.description}
                                url={bookmark.link}
                                editBookmark={() => editBookmark(bookmark)}
                                deleteBookmark={() => closeOptionModal(bookmark)}
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