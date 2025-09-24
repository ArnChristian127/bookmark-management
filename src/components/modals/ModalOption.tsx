import { IoIosWarning } from "react-icons/io";
type ModalOptionProps = {
    className?: string;
    title: string;
    onClose: () => void;
    onDelete: () => void;
}
export default function ModalOption({ className, title, onClose, onDelete }: ModalOptionProps) {       
    return (
        <>
            <div className="inset-0 fixed bg-black opacity-50 z-60"/>
            <div className="inset-0 fixed flex items-center justify-center px-3 z-60">
                <div className={`bg-white rounded-lg w-100 p-5 space-y-3 ${className} flex justify-center items-center flex-col`}>
                    <div className="h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 bg-red-100 rounded-full flex justify-center items-center">
                        <IoIosWarning className="text-3xl md:text-4xl lg:text-5xl text-red-400"/>
                    </div>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-center">{title}</h1>
                    <div className="flex justify-between items-center gap-5 w-full">
                        <button onClick={onDelete} className="bg-red-400 text-white hover:bg-red-500 focus:bg-red-500 w-full p-2 rounded-lg">
                            Delete
                        </button>
                        <button onClick={onClose} className="bg-green-400 text-white hover:bg-green-500 focus:bg-green-500 w-full p-2 rounded-lg">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}