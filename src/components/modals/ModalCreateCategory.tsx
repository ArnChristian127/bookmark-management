import Input from "../input/Input"

type ModalCreateCategoryProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}
export default function ModalCreateCategory({ value, onChange, onClose, onSubmit }: ModalCreateCategoryProps) {
    return (
        <>
            <div className="inset-0 fixed bg-black opacity-50 z-60"/>
            <div className="inset-0 fixed flex items-center justify-center px-3 z-60">
                <form onSubmit={onSubmit} className="bg-white rounded-lg w-100 p-5 space-y-3">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Add Category</h1>
                    <Input
                        typeInput="standard"
                        placeholder="Category Name"
                        type="text"
                        value={value}
                        onChange={onChange}
                    />
                    <div className="flex items-center justify-between gap-5">
                        <button type="submit" className="w-full rounded-lg p-2 bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500">
                            Add
                        </button>
                        <button type="button" onClick={onClose} className="w-full rounded-lg p-2 bg-red-400 text-white hover:bg-red-500 focus:bg-red-500">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}