//implentation by Arn Christian
//create shortcut function for dashboard counts
import { createClient } from "@/utils/supabase/client";
export class DashboardCount {
    //bookmark count
    static async getBookmarkCount(id: any) {
        const supabase = createClient();
        const { count } = await supabase.from('bookmarks').select('*', { count: "exact", head: true }).eq('users_id', id);
        console.log(count)
        return count as number;
    }
    //category count
    static async getCategoryCount(id: any) {
        const supabase = createClient();
        const { count } = await supabase.from('category').select('*', { count: "exact", head: true }).eq('users_id', id);
        return count as number;
    }
    //favorite count
    static async getFavoriteCount(id: any) {
        const supabase = createClient();
        const { count } = await supabase.from('bookmarks').select('*', { count: "exact", head: true }).eq('users_id', id).eq('is_favorite', true);
        return count as number;
    }
    //bookmarks per month total
    static async getBookmarksPerMonth(id: any) {
        const supabase = createClient();
        //query function in supabase
        /*
            create or replace function bookmarks_per_month(user_uuid uuid)
            returns table(month date, total bigint)
            language sql
            as $$
                select date_trunc('month', created_at)::date as month, count(*) as total
                from bookmarks
                where users_id = user_uuid
                group by month
                order by month;
            $$;
        */
        const { data } = await supabase.rpc("bookmarks_per_month", {
            user_uuid: id,
        });
        return data as Array<any>;
    }
}