import { createClient } from "./client";
import { useRouter } from "next/navigation";
export class Auth {
    static async SignUp(username: string, email: string, password: string) {
        if (username.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        if (!username) {
            return 'Username is required';
        }
        const supabase = createClient();
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });
        if (signUpError) return signUpError.message;
        const { error: insertError } = await supabase.from('users').insert({
            id: data.user?.id,
            username,
            email,
        });
        if (insertError) return insertError.message;
        return 'Sign Up Successful';
    }
    static async SignIn(email: string, password: string) {
        const supabase = createClient();
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, signInError }
    }
    static async AuthGuardSession(router: any) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push('/');
        } else {
            router.push(`/users/${session.user.id}`);
        }
    }
    static async SignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
    }
}