type CardCountProps = {
    title: string;
    count: number | string;
    icons: any;
}
export default function CardCount({title, count, icons}: CardCountProps) {
    return (
        <div className="border border-gray-300 p-5 rounded-lg shadow-lg grid grid-cols-1 gap-3 bg-white">
            <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">{title}</h1>
                {icons}
            </div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">{count}</p>
        </div>
    )
}