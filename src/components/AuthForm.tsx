import { CiUser, CiMail, CiLock } from "react-icons/ci";
import Input from "./Input"

type AuthFormProps = {
    username: string;
    email: string;
    password: string;
    usernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
    setSignUpCheck: (value: boolean) => void;
    isSignUpCheck: boolean;
}
export default function AuthForm({ username, email, password, usernameChange, emailChange, passwordChange, submit, setSignUpCheck, isSignUpCheck }: AuthFormProps) {
    return (
        <form className="bg-white p-5 rounded-lg w-100 border border-gray-300 lg:border-none" onSubmit={submit}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Bookmark Management <span className="text-purple-400">Sign In</span>
            </h1>
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
            <Input 
                typeInput="withIcon"
                className="mt-3"
                icons={<CiMail className="text-lg md:text-xl lg:text-2xl"/>}
                placeholder="Email"
                type="email"
                value={email}
                onChange={emailChange}
            />
            <Input
                typeInput="withIcon"
                className="mt-3"
                icons={<CiLock className="text-lg md:text-xl lg:text-2xl"/>}
                placeholder="Password"
                type="password"
                value={password}
                onChange={passwordChange}
            />
            <button type="submit" className="mt-3 w-full rounded-lg p-3 bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500">
                { isSignUpCheck ? 'Sign Up' : 'Sign In'}
            </button>
            {isSignUpCheck && (
                <button type="button" onClick={() => setSignUpCheck(false)} className="mt-3 w-full rounded-lg p-3 bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500">
                    Back
                </button>
            )}
            {!isSignUpCheck && (
                <p className="text-center mt-3">
                    Don't have account? <span onClick={() => setSignUpCheck(true)} className="text-purple-400 hover:text-purple-500 focus:text-purple-500 cursor-pointer">Create new account</span>
                </p>
            )}
        </form>
    )
}