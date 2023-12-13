// Show.tsx
import React from 'react';
import { PageProps, Trade } from '@/types';
import CreateModal from './Components/CreateModal';

const Show: React.FC<PageProps> = ({ auth }) => {
    const trades = auth.trade;
    
    // Function to safely format numbers
    const formatNumber = (value: any) => {
        const number = parseFloat(value);
        return isNaN(number) ? 'N/A' : number.toFixed(2);
    };

    // Calculate individual trade profit/loss and total profit/loss
    let totalProfitLoss = 0;
    trades.forEach(trade => {
        const profitOrLoss = trade.initial_capital * (trade.percentage / 100);
        totalProfitLoss += profitOrLoss;
        trade.calculatedProfitLoss = profitOrLoss; // Storing calculated profit/loss in the trade object
    });

    return (
        <div className="container mx-auto p-4">
            <CreateModal />

            <div className="my-4">
                <strong>Total Profit/Loss: </strong>
                kr{formatNumber(totalProfitLoss)}
            </div>

            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Initial Capital</th>
                        <th className="px-4 py-3">Stock Name</th>
                        <th className="px-4 py-3">Buy Price</th>
                        <th className="px-4 py-3">Sell Price</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Percentage</th>
                        <th className="px-4 py-3">Profit/Loss</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {trades.map((trade: Trade) => (
                        <tr key={trade.id} className={`text-gray-700 ${trade.buy_price < trade.sell_price ? 'bg-green-300' : 'bg-red-300'}`}>
                            <td className="px-4 py-3 text-sm">{trade.id}</td>
                            <td className="px-4 py-3 text-sm">kr{formatNumber(trade.initial_capital)}</td>
                            <td className="px-4 py-3 text-sm">{trade.stock_name}</td>
                            <td className="px-4 py-3 text-sm">kr{formatNumber(trade.buy_price)}</td>
                            <td className="px-4 py-3 text-sm">
                                {trade.sell_price ? `kr${formatNumber(trade.sell_price)}` : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm">{trade.buy_price > trade.sell_price ? 'Loss' : 'Profit'}</td>
                            <td className="px-4 py-3 text-sm">
                                {trade.percentage ? `${formatNumber(trade.percentage)}%` : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                kr{formatNumber(trade.calculatedProfitLoss)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Show;
