//coded by Arn Christian
// AuthForm component: Handles authentication form for sign in and sign up
import { CiUser, CiMail, CiLock } from "react-icons/ci"; // Importing icons for input fields
import Input from "../input/Input"; // Custom Input component

// Props for AuthForm: manages state and handlers for form fields and UI toggling
type AuthFormProps = {
    username: string; // Username input value
    email: string; // Email input value
    password: string; // Password input value
    usernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for username change
    emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for email change
    passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for password change
    submit: (e: React.FormEvent<HTMLFormElement>) => void; // Handler for form submission
    setSignUpCheck: (value: boolean) => void; // Toggles between sign up and sign in
    isSignUpCheck: boolean; // Determines if sign up mode is active
}

// Main AuthForm functional component
export default function AuthForm({ username, email, password, usernameChange, emailChange, passwordChange, submit, setSignUpCheck, isSignUpCheck }: AuthFormProps) {
    return (
        // Form container with styling and submit handler
        <form className="bg-white p-5 rounded-lg w-100 border border-gray-300 lg:border-none" onSubmit={submit}>
            {/* Title for the form */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Bookmark Management <span className="text-purple-400">Sign In</span>
            </h1>
            {/* Username input only shown in sign up mode */}
            {isSignUpCheck && (
                <Input
                    typeInput="withIcon"
                    className="mt-3"
                    icons={<CiUser className="text-lg md:text-xl lg:text-2xl"/>}
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={usernameChange}
                />
            )}
            {/* Email input field */}
            <Input 
                typeInput="withIcon"
                className="mt-3"
                icons={<CiMail className="text-lg md:text-xl lg:text-2xl"/>}
                placeholder="Email"
                type="email"
                value={email}
                onChange={emailChange}
            />
            {/* Password input field */}
            <Input
                typeInput="withIcon"
                className="mt-3"
                icons={<CiLock className="text-lg md:text-xl lg:text-2xl"/>}
                placeholder="Password"
                type="password"
                value={password}
                onChange={passwordChange}
            />
            {/* Submit button changes text based on mode */}
            <button type="submit" className="mt-3 w-full rounded-lg p-3 bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500">
                { isSignUpCheck ? 'Sign Up' : 'Sign In'}
            </button>
            {/* Back button for sign up mode */}
            {isSignUpCheck && (
                <button type="button" onClick={() => setSignUpCheck(false)} className="mt-3 w-full rounded-lg p-3 bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500">
                    Back
                </button>
            )}
            {/* Link to switch to sign up mode if currently in sign in mode */}
            {!isSignUpCheck && (
                <p className="text-center mt-3">
                    Don't have account? <span onClick={() => setSignUpCheck(true)} className="text-purple-400 hover:text-purple-500 focus:text-purple-500 cursor-pointer">Create new account</span>
                </p>
            )}
        </form>
    )
}