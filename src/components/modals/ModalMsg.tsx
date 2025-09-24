type ModalWarningMsgProps = {
    className: string;
    icons: React.ReactNode;
    title: string;
    message: string;
    color: string;
    onClose: () => void;
}
export default function ModalMsg({ className, icons, title, message, color, onClose }: ModalWarningMsgProps) {
    return (
        <>
            <div className="inset-0 fixed bg-black opacity-50 z-50"/>
            <div className="inset-0 fixed flex items-center justify-center px-3 z-50 overflow-hidden">
                <div className={`bg-white p-5 rounded-lg w-100 flex items-center flex-col space-y-3 ${className}`}>
                    <div className={`h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 ${color} rounded-full flex justify-center items-center`}>
                        {icons}
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">{title}</h1>
                    <p>{message}</p>
                    <button onClick={onClose} className="w-full p-3 rounded-lg bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500">
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}