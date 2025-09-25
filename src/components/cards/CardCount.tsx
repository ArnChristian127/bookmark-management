//coded by Arn Christian
//Component CardCount
// Define the props for the CardCount component
type CardCountProps = {
    title: string; // The title to display (e.g., Categories, Bookmarks, Favorites)
    count: number | string; // The count value to display
    icons: any; // The icon(s) to display next to the title
    className?: string; // Optional additional CSS classes for styling
}
// CardCount component displays a styled card with a title, icon(s), and count
export default function CardCount({ title, count, icons, className = "" }: CardCountProps) {
    return (
        // Card container with border, padding, rounded corners, shadow, and custom classes
        <div className={`border border-gray-300 p-5 rounded-lg shadow-lg grid grid-cols-1 gap-3 bg-white ${className}`}>
            {/* Header section with title and icons */}
            <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">{title}</h1>
                {icons}
            </div>
            {/* Display the count value */}
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">{count}</p>
        </div>
    )
}