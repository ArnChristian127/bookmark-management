// Enable client-side rendering
"use client";
// Import React hooks and components
import { useEffect, useState, useMemo } from "react";
import { FaClipboardList, FaBookmark } from "react-icons/fa";
import { animate, stagger } from "animejs";
import { IoReloadOutline } from "react-icons/io5";
import { MdFavorite, MdDashboard } from "react-icons/md";
import { DashboardCount } from "@/utils/count/functions";
import { useParams } from "next/navigation";
import CardCount from "@/components/cards/CardCount";
import BarChart from "@/components/charts/BarChart";

// Main dashboard component
export default function Dashboard() {
    // State for total categories
    const [categoryCount, setCategoryCount] = useState<number>(0);
    // State for total bookmarks
    const [bookmarkCount, setBookmarkCount] = useState<number>(0);
    // State for total favorites
    const [favoriteCount, setFavoriteCount] = useState<number>(0);
    // State for bookmarks per month (for chart)
    const [bookmarksPerMonth, setBookmarksPerMonth] = useState<any[]>([]);
    // Loading state for animation and data
    const [loading, setLoading] = useState<boolean>(false);
    // Get user id from route params
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    // Generate labels for the last 6 months
    const labels = useMemo(() => {
        const now = new Date();
        return Array.from({ length: 6 }).map((_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
            return d.toLocaleString("default", { month: "short" });
        });
    }, []);
    // Set document title on mount
    useEffect(() => {
        document.title = "Bookmark Management - Dashboard";
    }, []);
    // Reload dashboard data from backend
    const reload = async () => {
        if (!id) return;
        setLoading(true);
        try {
            // Fetch all counts and chart data in parallel
            const [category, bookmark, favorite, perMonth] = await Promise.all([
                DashboardCount.getCategoryCount(id),
                DashboardCount.getBookmarkCount(id),
                DashboardCount.getFavoriteCount(id),
                DashboardCount.getBookmarksPerMonth(id),
            ]);
            setCategoryCount(category);
            setBookmarkCount(bookmark);
            setFavoriteCount(favorite);
            setBookmarksPerMonth(perMonth);
        } finally {
            setLoading(false);
        }
    }
    // Prepare chart data for BarChart
    const myData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: "Bookmarks per Month",
                data: bookmarksPerMonth.map((item) => item.total),
            },
        ],
    }), [labels, bookmarksPerMonth]);
    // Reload data when id changes
    useEffect(() => {
        reload();
    }, [id]);
    // Animate cards when loading is finished
    useEffect(() => {
        if (loading) return;
        animate('.stagger-card', {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(150),
            duration: 300,
            easing: 'easeOutQuad',
        });
    }, [loading]);
    // Render dashboard UI
    return (
        <>
            <div>
                {/* Header section with dashboard title and icon */}
                <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                        Bookmark Dashboard
                    </h1>
                    <MdDashboard className="text-3xl text-green-400" />
                </div>
                <hr className="my-3 border-t border-gray-300" />
                {/* Refresh button to reload data */}
                <button onClick={reload} className="my-3 px-3 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-3 hover:bg-gray-100 shadow">
                    <IoReloadOutline className="text-md md:text-lg lg:text-xl" />
                    Refresh
                </button>
                {/* Card counts for categories, bookmarks, favorites */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {!loading ? (
                        <>
                            <CardCount
                                title="Total Categories"
                                icons={<FaClipboardList className="text-lg md:text-xl lg:text-2xl" />}
                                count={categoryCount}
                                className="stagger-card"
                            />
                            <CardCount
                                title="Total Bookmarks"
                                icons={<FaBookmark className="text-lg md:text-xl lg:text-2xl" />}
                                count={bookmarkCount}
                                className="stagger-card"
                            />
                            <CardCount
                                title="Favorites"
                                icons={<MdFavorite className="text-lg md:text-xl lg:text-2xl" />}
                                count={favoriteCount}
                                className="stagger-card"
                            />
                        </>
                    ) : (
                        <>
                            {/* Loading placeholders for cards */}
                            <div className="animate-pulse">
                                <div className="h-30 bg-gray-300 rounded-lg"></div>
                            </div>
                            <div className="animate-pulse">
                                <div className="h-30 bg-gray-300 rounded-lg"></div>
                            </div>
                            <div className="animate-pulse">
                                <div className="h-30 bg-gray-300 rounded-lg"></div>
                            </div>
                        </>
                    )}
                </div>
                {/* Bar chart for bookmarks per month */}
                {!loading ? (
                    <BarChart className="mt-5 stagger-card" data={myData} />
                ) : (
                    <div className="animate-pulse mt-5">
                        <div className="h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-300 rounded-lg"></div>
                    </div>
                )}
            </div>
        </>
    )
}