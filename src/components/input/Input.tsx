type InputProps = {
    typeInput: 'standard' | 'withIcon' | 'textarea';
    className?: string;
    icons?: React.ReactNode;
    placeholder: string;
    type: "text" | "password" | "email";
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function Input({ typeInput, className, icons, placeholder, type, value, onChange, onChangeTextArea }: InputProps) {
    if (typeInput === 'withIcon') {
        return (
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
        )
    }
    else if (typeInput === 'standard') {
        return (
            <input
                className={`outline-none w-full rounded-lg border border-gray-300 p-2 px-3 ${className}`}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
            />
        )
    }
    else if (typeInput === 'textarea') {  
        return (
            <textarea
                className={`outline-none w-full rounded-lg border border-gray-300 p-2 px-3 ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChangeTextArea}
            />
        )
    }
    return null;
}