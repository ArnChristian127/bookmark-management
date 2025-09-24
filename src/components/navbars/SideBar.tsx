import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { CiEdit, CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

type SideBarProps = {
  id: any;
  categories: any[];
  editCategory: boolean;
  setEditCategory: (v: boolean) => void;
  setOpen: (v: boolean) => void;
  deleteCategory: (id: string) => void;
  handleSignOut: () => void;
}
export default function SideBar({ id, categories, editCategory, setEditCategory, setOpen, deleteCategory, handleSignOut }: SideBarProps) {
  return (
    <aside className="hidden lg:flex row-span-2 bg-slate-800 text-white flex-col">
      <h1 className="text-gray-300 p-3">Navigations</h1>
      <div className="hover:bg-slate-700">
        <Link href={`/users/${id}`} className="px-3 py-2 flex items-center gap-2">
          <MdDashboard />
          Dashboard
        </Link>
      </div>
      <button onClick={() => setOpen(true)} className="hover:bg-slate-700 flex items-center gap-2 px-3 py-2 w-full">
        <FiPlus />
        Add Category
      </button>
      <div onClick={() => setEditCategory(!editCategory)} className="flex justify-between items-center px-3 mt-5">
        <h1 className="text-gray-300">Categories</h1>
        <button>
          <CiEdit className="hover:text-purple-400 focus:text-purple-400" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto flex flex-col mt-3 custom-scrollbar">
        {categories.map((items: any) => (
          <div className="flex items-center justify-between hover:bg-slate-700 w-full px-3 py-2" key={items.id}>
            <Link href={`/users/${id}/category/${items.id}`}>
              #{items.title}
            </Link>
            {editCategory && (
              <button onClick={() => deleteCategory(items.id)}>
                <MdDeleteOutline className="hover:text-red-400 focus:text-red-400" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="py-3">
        <hr className="my-3 border-t border-gray-600" />
        <button onClick={handleSignOut} className="flex items-center gap-2 px-3 hover:text-purple-400 focus:text-purple-400">
          <CiLogout />
          Sign Out
        </button>
      </div>
    </aside>
  );
}