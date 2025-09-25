//coded by Arn Christian
//Component Input
//dynamic component for input
// Define the props for the Input component
type InputProps = {
    typeInput: 'standard' | 'withIcon' | 'textarea'; // Type of input to render
    className?: string; // Optional additional CSS classes for styling
    icons?: React.ReactNode; // Optional icon(s) to display (for withIcon type)
    placeholder: string; // Placeholder text for the input/textarea
    type: "text" | "password" | "email"; // Input type for standard and withIcon
    value: string; // Value of the input/textarea
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler for input
    onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Change handler for textarea
}
// Input component renders different input styles based on typeInput prop
export default function Input({ typeInput, className, icons, placeholder, type, value, onChange, onChangeTextArea }: InputProps) {
    // Render input with icon if typeInput is 'withIcon'
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
    // Render standard input if typeInput is 'standard'
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
    // Render textarea if typeInput is 'textarea'
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
    // Return null if typeInput does not match any known type
    return null;
}