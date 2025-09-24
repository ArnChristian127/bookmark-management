"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";
import { animate } from "animejs";
import { Auth } from "@/utils/supabase/functions";
import AuthForm from "@/components/auth/AuthForm";
import ModalMsg from "@/components/modals/ModalMsg";
export default function Authentication() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignUp) {
            const error = await Auth.SignUp(username, email, password);
            if (error) {
                setModalMessage(error);
                setShowModal(true);
            } else {
                setIsSignUp(false);
                setUsername("");
                setEmail("");
                setPassword("");
            }
        } else {
            const { data, signInError } = await Auth.SignIn(email, password);
            const id = data?.user?.id;
            if (signInError) {
                setModalMessage(signInError.message);
                setShowModal(true);
            } else {
                router.push(`/users/${id}`);
            }
        }
    }
    useEffect(() => {
        animate('.pop-up', {
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 400,
            easing: 'easeInOutQuad'
        })
    }, [showModal])
    useEffect(() => {
        Auth.AuthGuardSession(router);
    }, [])
    return (
        <>
            {showModal && (
                <ModalMsg
                    className="pop-up"
                    icons={<IoIosWarning className="text-3xl md:text-4xl lg:text-5xl text-red-400"/>}
                    title={isSignUp ? "Sign Up Error" : "Sign In Error"}
                    message={modalMessage}
                    color="bg-red-100"
                    onClose={() => setShowModal(false)}
                />
            )}
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