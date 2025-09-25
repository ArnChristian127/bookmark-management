//coded by Arn Christian
// CardBookmark component: Displays a bookmark card with favorite, edit, and delete actions
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import heart icons for favorite toggle

// Props for CardBookmark: manages bookmark data and actions
type BookmarksProps = {
    isFavorite: boolean, // Indicates if bookmark is marked as favorite
    setFavorite: () => void, // Handler to toggle favorite status
    className: string, // Additional CSS classes for styling
    title: string; // Bookmark title
    description: string; // Bookmark description
    url: string; // Bookmark URL
    deleteBookmark: () => void; // Handler to delete bookmark
    editBookmark:() => void; // Handler to edit bookmark
}

// Main Bookmark functional component
export default function Bookmark({ isFavorite, setFavorite, className, title, description, url, deleteBookmark, editBookmark }: BookmarksProps) {
    return (
        // Card container with styling and layout
        <>
            <div className={`border border-gray-300 p-5 rounded-lg shadow-lg grid grid-cols-1 ${className}`}>
                {/* Display bookmark title */}
                <p><strong>Title:</strong> {title}</p>
                {/* Display bookmark URL as a clickable link */}
                <p className="overflow-hidden w-full"><strong>Url:</strong> <a href={url} className="text-blue-400 hover:text-blue-500 focus:text-blue-500 underline">{url}</a></p>
                {/* Display bookmark description */}
                <p><strong>Description:</strong></p>
                <h1>{description}</h1>
                {/* Divider line */}
                <hr className="my-3 border-t border-gray-300" />
                {/* Favorite button toggles heart icon and status */}
                <button onClick={setFavorite} className="flex items-center gap-2 cursor-pointer">
                    {isFavorite ? <FaRegHeart /> : <FaHeart className="text-red-400"/>}
                    <span>Add to Favorites</span>
                </button>
                {/* Edit and Delete buttons; Delete only shown if favorite */}
                <div className="flex justify-between items-center mt-3 gap-5">
                    <button onClick={editBookmark} className="bg-green-400 hover:bg-green-500 focus:bg-green-500 text-white w-full rounded-lg py-2">Edit</button>
                    {isFavorite && (<button onClick={deleteBookmark} className="bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white w-full rounded-lg py-2">Delete</button>)}
                </div>
            </div>
        </>
    )
}