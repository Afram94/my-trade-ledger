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
    const feePercentage = 0.50; // Total fee percentage for round-trip trade
    let totalProfitLoss = 0;
    /* trades.forEach(trade => {
        const profitOrLoss = trade.initial_capital * (trade.percentage / 100);
        totalProfitLoss += profitOrLoss;
        trade.calculatedProfitLoss = profitOrLoss; // Storing calculated profit/loss in the trade object
    }); */

    /* trades.forEach(trade => {
        const profitOrLoss = trade.initial_capital * (trade.percentage / 100);

        // Adjusting profit/loss by subtracting the fee
        const feeAmount = trade.initial_capital * (feePercentage / 100);
        const adjustedProfitLoss = profitOrLoss - feeAmount;

        totalProfitLoss += adjustedProfitLoss;
        trade.calculatedProfitLoss = adjustedProfitLoss;
    }); */

    trades.forEach(trade => {
        const profitOrLoss = trade.initial_capital * (trade.percentage / 100);
    
        // Adjusting profit/loss by subtracting the fee
        const feeAmount = trade.initial_capital * (trade.fee_percentage / 100);
        const adjustedProfitLoss = profitOrLoss - feeAmount;
    
        totalProfitLoss += adjustedProfitLoss;
        trade.calculatedProfitLoss = adjustedProfitLoss;
    });

    return (
        <div className="container mx-auto p-4">

            <div className="my-4 flex justify-between text-2xl">
                <div>
                    <CreateModal />
                </div>
                <div className='flex items-center'>
                    <p className='mx-3 font-bold'>
                        <strong className='text-gray-500'>Total Profit/Loss: </strong>
                        <p className={`flex justify-center text-gray-100 rounded-xl ${totalProfitLoss > 0 ? 'bg-green-500 text-green-200' : 'bg-red-500 text-red-200'}`}>
                            {formatNumber(totalProfitLoss) } kr
                        </p>
                    </p>
                </div>
            </div>

            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        <th className="px-4 py-3 text-[14px]">ID</th>
                        <th className="px-4 py-3 text-[14px]">Stock Name</th>
                        <th className="px-4 py-3 text-[14px]">Money In</th>
                        <th className="px-4 py-3 text-[14px]">Buy Price</th>
                        <th className="px-4 py-3 text-[14px]">Sell Price</th>
                        <th className="px-4 py-3 text-[14px]">Status</th>
                        <th className="px-4 py-3 text-[14px]">A/F - Percentage</th>
                        <th className="px-4 py-3 text-[14px]">A/F - Profit/Loss</th>
                        <th className="px-4 py-3 text-[14px]">Fee %</th>
                        <th className="px-4 py-3 text-[14px]">Fee</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {trades.map((trade: Trade, index) => (
                        <tr key={trade.id} className={`text-gray-700 gap-y-2`}> {/* ${Number(trade.buy_price) < Number(trade.sell_price) ? 'bg-green-200' : 'bg-red-200'} */}
                            <td className="px-4 py-3 text-md">
                                <p className={`${Number(trade.buy_price) < Number(trade.sell_price) ? 'bg-green-500' : 'bg-red-500'} rounded-full text-center items-center text-gray-100 h-8 w-8 py-1 font-bold`}>{index + 1}</p>
                            </td>
                            <td className="px-4 py-3 text-md font-mono text-indigo-600">{trade.stock_name}</td>
                            <td className="px-4 py-3 text-md font-bold text-indigo-600">{formatNumber(trade.initial_capital)} kr</td>
                            <td className="px-4 py-3 text-md bg-green-200 font-bold text-green-700">{formatNumber(trade.buy_price)} kr</td>

                            <td className="px-4 py-3 text-md text-md bg-red-200 font-bold text-red-700">
                                {trade.sell_price ? `${formatNumber(trade.sell_price)} kr` : 'N/A'}
                            </td>

                            <td className={`px-4 py-3 text-md font-bold ${Number(trade.buy_price) < Number(trade.sell_price) ? 'text-green-500' : 'text-red-500'}`}>{Number(trade.buy_price) > Number(trade.sell_price) ? 'Loss ↓' : 'Profit ↑'}</td>
                            <td className={`px-4 py-3 text-md font-bold ${Number(trade.buy_price) < Number(trade.sell_price) ? 'text-green-500' : 'text-red-500'}`}>
                                {trade.percentage ? `${formatNumber(trade.percentage - (trade.fee_percentage))}%` : 'N/A'}
                            </td>
                            <td className={`px-4 py-3 text-md font-bold ${Number(trade.buy_price) < Number(trade.sell_price) ? 'text-green-500' : 'text-red-500'}`}>
                                {formatNumber(trade.calculatedProfitLoss)} kr
                            </td>
                            <td className="px-4 py-3 text-md">
                                {formatNumber(trade.fee_percentage)} %
                            </td>
                            <td className="px-4 py-3 text-md">
                                {trade.initial_capital ? `${formatNumber(trade.initial_capital * (trade.fee_percentage / 100))} kr` : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Show;
