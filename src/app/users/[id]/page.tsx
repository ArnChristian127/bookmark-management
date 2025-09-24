"use client";
import { useEffect, useState, useMemo } from "react";
import { FaClipboardList, FaBookmark } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { DashboardCount } from "@/utils/count/functions";
import { useParams } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import CardCount from "@/components/CardCount";
import BarChart from "@/components/BarChart";

export default function Dashboard() {
    const [categoryCount, setCategoryCount] = useState<any>([]);
    const [bookmarkCount, setBookmarkCount] = useState<any>([]);
    const [favoriteCount, setFavoriteCount] = useState<any>([]);
    const [bookmarksPerMonth, setBookmarksPerMonth] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();
    const id = params.id;
    const labels = useMemo(() => {
        const now = new Date();
        return Array.from({ length: 6 }).map((_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
            return d.toLocaleString("default", { month: "short" });
        });
    }, []);
    const reload = async () => {
        const categoryCount = await DashboardCount.getCategoryCount(id);
        const bookmarkCount = await DashboardCount.getBookmarkCount(id);
        const favoriteCount = await DashboardCount.getFavoriteCount(id);
        const bookmarksPerMonth = await DashboardCount.getBookmarksPerMonth(id);
        setCategoryCount(categoryCount);
        setBookmarkCount(bookmarkCount);
        setFavoriteCount(favoriteCount);
        setBookmarksPerMonth(bookmarksPerMonth);
        setLoading(false);
        setTimeout(() => {
            setLoading(true);
        }, 1500);
    }
    const myData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: "Bookmarks per Month",
                data: bookmarksPerMonth.map((item: any) => item.total),
            },
        ],
    }), [labels, bookmarksPerMonth]);
    useEffect(() => {
        reload();
    }, [])
    return (
        <>
            <div>
                <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-semibold">
                        Bookmark Dashboard
                    </h1>
                    <MdDashboard className="text-3xl text-green-400" />
                </div>
                <hr className="my-3 border-t border-gray-300" />
                <button onClick={reload} className="my-3 px-3 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-3 hover:bg-gray-100 shadow">
                    <IoReloadOutline className="text-md md:text-lg lg:text-xl" />
                    Refresh
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? (
                        <>
                            <CardCount
                                title="Total Categories"
                                icons={<FaClipboardList className="text-lg md:text-xl lg:text-2xl" />}
                                count={categoryCount}
                            />
                            <CardCount
                                title="Total Bookmarks"
                                icons={<FaBookmark className="text-lg md:text-xl lg:text-2xl" />}
                                count={bookmarkCount}
                            />
                            <CardCount
                                title="Favorites"
                                icons={<MdFavorite className="text-lg md:text-xl lg:text-2xl" />}
                                count={favoriteCount}
                            />
                        </>
                    ) : (
                        <>
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
                {loading ? (
                    <BarChart className="mt-5" data={myData} />
                ): (
                    <div className="animate-pulse mt-5 ">
                        <div className="h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-300 rounded-lg"></div>
                    </div>
                )}
            </div>
        </>
    )
}