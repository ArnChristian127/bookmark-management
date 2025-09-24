import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
type Props = {
    data?: ChartData<"bar", number[], string>;
    options?: ChartOptions<"bar">;
    className?: string;
    color?: string;
};
const sampleData: ChartData<"bar", number[], string> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Sales",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "rgba(192,132,252,0.8)",
            borderColor: "rgba(147,51,234,1)",
            borderWidth: 1,
        },
    ],
};
const defaultOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Bar Chart",
        },
        tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                precision: 0,
            },
        },
    },
};
export default function BarChart({ data = sampleData, options, className = "", color = "rgba(192,132,252,0.8)" }: Props) {
    const coloredData = {
        ...data,
        datasets: data.datasets.map((ds) => ({
            ...ds,
            backgroundColor: ds.backgroundColor || color,
            borderColor: ds.borderColor || "rgba(147,51,234,1)",
        })),
    };
    const mergedOptions = { ...defaultOptions, ...(options || {}) } as ChartOptions<"bar">;
    return (
        <div className={`w-full p-4 bg-white rounded-lg shadow-lg border border-gray-300 ${className}`}>
            <div className="pt-2 h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                <Bar data={coloredData} options={mergedOptions} />
            </div>
        </div>
    );
}
