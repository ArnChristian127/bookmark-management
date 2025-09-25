//implemented by Arn Christian
//create shortcut function for auth
import { createClient } from "./client";
export class Auth {
    /*
    * Sign Up
    * @param {string} username - username of the user
    * @param {string} email - email of the user
    * @param {string} password - password of the user
    * @returns {string} - Sign Up Successful or Error Message
    */
    static async SignUp(username: string, email: string, password: string) {
        if (username.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        if (!username) {
            return 'Username is required' as string;
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
        return false as boolean;
    }
    /*
    * Sign In
    * @param {string} email - email of the user
    * @param {string} password - password of the user
    * @returns {string} - Sign In Successful or Error Message
    */
    static async SignIn(email: string, password: string) {
        const supabase = createClient();
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, signInError } as any;
    }
    /*
    * Auth Guard Session
    * @param {any} router - router object
    * @returns {void}
    */
    static async AuthGuardSession(router: any) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push('/');
        } else {
            router.push(`/users/${session.user.id}`);
        }
    }
    /*
    * Get User
    * @returns {any} - user data
    */
    static async GetUser() {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        const { data: userData  } = await supabase.from('users').select('*').eq('id', user?.id).single();
        return userData as any;
    }
    /*
    * Sign Out
    * @returns {void}
    */
    static async SignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
    }
}