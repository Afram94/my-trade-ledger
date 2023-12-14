import React, { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { PageProps, Trade } from '@/types';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ auth }: PageProps) {
    const trades = Array.isArray(auth.trade) ? auth.trade : [];
    const [timePeriod, setTimePeriod] = useState('week');

    const formatNumber = (value: string | number) => {
        const number = typeof value === 'string' ? parseFloat(value) : value;
        return isNaN(number) ? 'N/A' : number.toFixed(2);
    };
    

    // Calculate individual trade profit/loss
    trades.forEach(trade => {
        trade.calculatedProfitLoss = trade.initial_capital * (trade.percentage / 100);
    });

    // Filter trades by time period
    const filterTradesByTimePeriod = (trades: Trade[], period: string) => {
        const now = new Date();
        let startDate = new Date();

        switch (period) {
            case 'today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case '2today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                break;
            case '3today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
                break;
            case '4today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3);
                break;
            case '5today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4);
                break;
            case 'week':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                break;
            case '3months':
                startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                break;
            case '6months':
                startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                break;
            case 'year':
                startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                break;
            default:
                // Handles 'all' or undefined cases
                startDate = new Date(0); // Earliest possible date to include all trades
                break;
        }

        return trades.filter(trade => {
            const tradeDate = new Date(trade.created_at);
            return tradeDate >= startDate;
        });
    };

    const filteredTrades = useMemo(() => filterTradesByTimePeriod(trades, timePeriod), [trades, timePeriod]);


   // Calculate total profit/loss
   const totalProfitLoss = filteredTrades.reduce((acc, trade) => acc + trade.calculatedProfitLoss, 0);
   const formattedTotalProfitLoss = formatNumber(totalProfitLoss);

    // Prepare data for the line chart
    const lineChartData = {
        labels: filteredTrades.map((_, index) => `Trade ${index + 1}`),
        datasets: [
            {
                label: 'Profit/Loss per Trade',
                data: filteredTrades.map(trade => trade.calculatedProfitLoss),
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
            },
        ],
    };

    // Line chart options
    const lineChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Prepare data for the bar chart
    const barChartData = {
        labels: filteredTrades.map((_, index) => `Trade ${index + 1}`),
        datasets: [{
            label: 'Profit/Loss per Trade',
            data: filteredTrades.map(trade => trade.calculatedProfitLoss),
            backgroundColor: filteredTrades.map(trade => trade.calculatedProfitLoss >= 0 ? 'green' : 'red'),
        }]
    };

    // Bar chart options
    const barChartOptions = lineChartOptions; // Reuse the same options for simplicity



    const timePeriods = [
        { label: "Show All", value: "all" },
        { label: "Today", value: "today" },
        { label: "2 Today", value: "2today" },
        { label: "3 Today", value: "3today" },
        { label: "4 Today", value: "4today" },
        { label: "5 Today", value: "5today" },
        { label: "Week", value: "week" },
        { label: "Month", value: "month" },
        { label: "3 Months", value: "3months" },
        { label: "6 Months", value: "6months" },
        { label: "Year", value: "year" }
    ];
    

    return (
        <>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link className='bg-indigo-400 p-3 m-2 rounded-lg text-white font-bold text-md col-span-2 uppercase' href='/trades'>Show and add trades</Link>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            
                        {/* <div className='p-5 grid grid-cols-2 items-center text-center'>
                            <select className='bg-white border rounded p-2' value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
                                <option value="all">Show All</option>
                                <option value="today">Today</option>
                                <option value="2today">2-Today</option>
                                <option value="3today">3-Today</option>
                                <option value="4today">4-Today</option>
                                <option value="5today">5-Today</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                                <option value="3months">Last 3 Months</option>
                                <option value="6months">Last 6 Months</option>
                                <option value="year">Last Year</option>
                            </select>

                        </div> */}
                            <div className='p-5 flex items-center text-center my-12 '>
                            
                            {timePeriods.map(period => (
                                <button 
                                    key={period.value} 
                                    className={`p-2 mx-1 rounded-xl w-24 ${timePeriod === period.value ? 'bg-indigo-400 text-slate-100' : 'bg-slate-100'}`}
                                    onClick={() => setTimePeriod(period.value)}
                                >
                                    {period.label}
                                </button>
                            ))}
                        </div>

                        {/* Chart Components */}
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="w-full mx-auto" key={`line-chart-${timePeriod}`}>
                                <Line data={lineChartData} options={lineChartOptions} />
                            </div>
                            <div className="w-full mx-auto" key={`bar-chart-${timePeriod}`}>
                                <Bar data={barChartData} options={barChartOptions} />
                            </div>
                        </div>
                        <div className='flex justify-center items-center text-2xl mt-10'>
                            <div className='mx-3 font-bold'>
                                <strong className='text-gray-500'>Total Profit/Loss: </strong>
                                <p className={`flex justify-center text-gray-100 rounded-xl ${totalProfitLoss > 0 ? 'bg-green-500 text-green-200' : 'bg-red-500 text-red-200'}`}>
                                    {formatNumber(totalProfitLoss) } kr
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
