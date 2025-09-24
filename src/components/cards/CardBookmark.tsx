type BookmarksProps = {
    title: string;
    description: string;
    url: string;
    deleteBookmark: () => void;
    editBookmark:() => void;
}
export default function Bookmark({ title, description, url, deleteBookmark, editBookmark }: BookmarksProps) {
    return (
        <>
            <div className="border border-gray-300 p-5 rounded-lg shadow-lg">
                <p><strong>Title:</strong> {title}</p>
                <p className="overflow-hidden w-full"><strong>Url:</strong> <a href={url} className="text-blue-400 hover:text-blue-500 focus:text-blue-500 underline">{url}</a></p>
                <p><strong>Description:</strong></p>
                <div className="h-10 overflow-y-auto">
                    <h1>{description}</h1>
                </div>
                <hr className="my-3 border-t border-gray-300" />
                <div className="flex justify-between items-center mt-3 gap-5">
                    <button onClick={editBookmark} className="bg-green-400 hover:bg-green-500 focus:bg-green-500 text-white w-full rounded-lg py-1">Edit</button>
                    <button onClick={deleteBookmark} className="bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white w-full rounded-lg py-1">Delete</button>
                </div>
            </div>
        </>
    )
}