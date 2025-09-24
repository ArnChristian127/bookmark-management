type InputProps = {
    typeInput: 'standard' | 'withIcon';
    className?: string;
    icons?: React.ReactNode;
    placeholder: string;
    type: "text" | "password" | "email";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({ typeInput, className, icons, placeholder, type, value, onChange }: InputProps) {
    return (
        <>
            {typeInput === 'withIcon' ? (
                <div className={`flex items-center gap-3 p-3 rounded-lg border border-gray-300 ${className}`}>
                    {icons}
                    <input
                        className="outline-none w-full"
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            ) : (
                <input
                    className={`outline-none w-full rounded-lg border border-gray-300 p-2 px-3 ${className}`}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            )}
        </>
    )
}