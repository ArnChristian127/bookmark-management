//coded by Arn Christian
//Component Navbar
import { CiLogout, CiEdit } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { BsList } from "react-icons/bs";
import Link from "next/link";

type NavbarProps = {
    ref?: React.Ref<HTMLDivElement>;
    user: any;
    isNavbarOpen?: boolean;
    id: any;
    categories: any[];
    editCategory: boolean;
    setEditCategory: (v: boolean) => void;
    setOpen: (v: boolean) => void;
    deleteCategory: (id: string) => void;
    handleSignOut: () => void;
    setIsNavbarOpen: () => void;
}
export default function Navbar({ ref, user, isNavbarOpen, setIsNavbarOpen, id, categories, editCategory, setEditCategory, setOpen, deleteCategory, handleSignOut }: NavbarProps) {
    return (
       <>
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
                <button className="lg:hidden" onClick={() => setIsNavbarOpen()}>
                    <BsList className="text-2xl"/>
                </button>
            </header>
            {isNavbarOpen && (
                <nav ref={ref} className="fixed top-0 left-0 w-full min-h-screen bg-slate-800 text-white lg:hidden flex flex-col shadow-lg z-50">
                    <div className="flex justify-between items-center p-3">
                        <h1 className="text-gray-300">Navigations</h1>
                        <button onClick={() => setIsNavbarOpen()} className="text-md">
                            &#10005;
                        </button>
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
                    <div onClick={() => setEditCategory(!editCategory)} className="flex justify-between items-center px-3 mt-5">
                        <h1 className="text-gray-300">Categories</h1>
                        <button>
                            <CiEdit className="hover:text-purple-400 focus:text-purple-400"/>
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto flex flex-col mt-3 custom-scrollbar">
                        {categories.map((items: any) => (
                            <div className="flex items-center justify-between hover:bg-slate-700 w-full px-3 py-2" key={items.id}>
                                <Link href={`/users/${id}/category/${items.id}`} key={items.id}>
                                    #{items.title}
                                </Link>
                                {editCategory && (
                                    <button onClick={() => deleteCategory(items.id)}>
                                        <MdDeleteOutline className="hover:text-red-400 focus:text-red-400"/>
                                    </button>
                                )}
                            </div>
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
    );
}