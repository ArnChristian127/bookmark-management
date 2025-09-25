// Authentication Page
// coded by Arn Christian
"use client";
// Import React hooks and components
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";
import { animate } from "animejs";
import { Auth } from "@/utils/supabase/functions";
import AuthForm from "@/components/auth/AuthForm";
import ModalMsg from "@/components/modals/ModalMsg";

// Main authentication component
export default function Authentication() {
    // State for username input
    const [username, setUsername] = useState("");
    // State for email input
    const [email, setEmail] = useState("");
    // State for password input
    const [password, setPassword] = useState("");
    // State for modal message
    const [modalMessage, setModalMessage] = useState("");
    // State to check if user is signing up
    const [isSignUp, setIsSignUp] = useState(false);
    // State to show/hide modal
    const [showModal, setShowModal] = useState(false);
    // Router for navigation
    const router = useRouter();
    // Handler for form submit
    const handlerSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // If signing up, call sign up function
        if (isSignUp) {
            const error = await Auth.SignUp(username, email, password);
            if (error) {
                setModalMessage(error);
                setShowModal(true);
                return;
            } 
            setIsSignUp(false);
        } else {
            // If signing in, call sign in function
            const { data, signInError } = await Auth.SignIn(email, password);
            if (signInError) {
                setModalMessage(signInError.message);
                setShowModal(true);
            } else {
                const id = data?.user?.id;
                if (id) router.push(`/users/${id}`);
            }
        }
        // Declaring array for callbacks (not used)
    }, [isSignUp, username, email, password, router]);
    // Set document title on mount
    useEffect(() => {
        document.title = "Bookmark Management - Authentication";
    }, []);
    // Animate modal when shown
    useEffect(() => {
        if (showModal) {
            animate('.pop-up', {
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 400,
                easing: 'easeInOutQuad'
            })
        }
    }, [showModal]);
    // Check if user is already signed in, otherwise logout
    useEffect(() => {
        Auth.AuthGuardSession(router);
    }, [router]);
    // Render authentication UI
    return (
        <>
            {/* Modal for error messages */}
            {showModal && (
                <ModalMsg
                    className="pop-up"
                    icons={<IoIosWarning className="text-3xl md:text-4xl lg:text-5xl text-red-400" />}
                    title={isSignUp ? "Sign Up Error" : "Sign In Error"}
                    message={modalMessage}
                    color="bg-red-100"
                    onClose={() => setShowModal(false)}
                />
            )}
            {/* Desktop layout with form and background image */}
            <div className="lg:h-screen lg:grid lg:grid-cols-3 hidden">
                <div className="bg-white flex items-center justify-center px-3">
                    <AuthForm
                        username={username}
                        email={email}
                        password={password}
                        usernameChange={(e) => setUsername(e.target.value)}
                        emailChange={(e) => setEmail(e.target.value)}
                        passwordChange={(e) => setPassword(e.target.value)}
                        submit={handlerSubmit}
                        isSignUpCheck={isSignUp}
                        setSignUpCheck={setIsSignUp}
                    />
                </div>
                <div className="bg-[url('/assets/auth-bg.jpg')] bg-center bg-cover col-span-2" />
            </div>
            {/* Mobile layout with form over background image */}
            <div className="h-screen lg:hidden flex items-center justify-center px-3 bg-[url('/assets/auth-bg.jpg')] bg-center bg-cover">
                <AuthForm
                    username={username}
                    email={email}
                    password={password}
                    usernameChange={(e) => setUsername(e.target.value)}
                    emailChange={(e) => setEmail(e.target.value)}
                    passwordChange={(e) => setPassword(e.target.value)}
                    submit={handlerSubmit}
                    isSignUpCheck={isSignUp}
                    setSignUpCheck={setIsSignUp}
                />
            </div>
        </>
    )
}