import { createClient } from "@/utils/supabase/client";
export class DashboardCount {
    static async getBookmarkCount(id: string) {
        const supabase = createClient();
        const { count } = await supabase.from('bookmarks').select('*', { count: "exact", head: true }).eq('users_id', id);
        return count;
    }
    static async getCategoryCount(id: string) {
        const supabase = createClient();
        const { count } = await supabase.from('category').select('*', { count: "exact", head: true }).eq('users_id', id);
        return count;
    }
    static async getFavoriteCount(id: string) {
        const supabase = createClient();
        const { count } = await supabase.from('bookmarks').select('*', { count: "exact", head: true }).eq('users_id', id).eq('is_favorite', true);
        return count;
    }
    static async getBookmarksPerMonth(id: string) {
        const supabase = createClient();
        const { data } = await supabase.rpc("bookmarks_per_month", {
            user_uuid: id,
        });
        return data as Array<any>;
    }
}