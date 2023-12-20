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
    // Initialize total profit/loss across all trades to zero.
    let totalProfitLoss = 0;

    // Initialize counters for the number of profitable and losing trades.
    let profitableTrades = 0;
    let losingTrades = 0;

    // Initialize an object to track the best trade. It starts with the worst possible profitLoss value (-Infinity) and no trade (null).
    let bestTrade: { profitLoss: number; trade: Trade | null } = { profitLoss: -Infinity, trade: null };

    // Initialize an object to track the worst trade. It starts with the best possible profitLoss value (Infinity) and no trade (null).
    let worstTrade: { profitLoss: number; trade: Trade | null } = { profitLoss: Infinity, trade: null };
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

    // Iterate over each trade in the trades array.
    trades.forEach(trade => {
        // Calculate the raw profit or loss for the trade by multiplying the initial capital by the percentage gain/loss.
        const profitOrLoss = trade.initial_capital * (trade.percentage / 100);

        // Calculate the fee amount for the trade.
        const feeAmount = trade.initial_capital * (trade.fee_percentage / 100);

        // Adjust the profit or loss by subtracting the fee amount.
        const adjustedProfitLoss = profitOrLoss - feeAmount;

        // Accumulate the adjusted profit or loss to the total profit/loss.
        totalProfitLoss += adjustedProfitLoss;

        // Store the calculated profit or loss in the trade object.
        trade.calculatedProfitLoss = adjustedProfitLoss;

        // Update the count of profitable trades if the adjusted profit/loss is positive.
        if (adjustedProfitLoss > 0) {
            profitableTrades++;
        }
        // Update the count of losing trades if the adjusted profit/loss is negative.
        else if (adjustedProfitLoss < 0) {
            losingTrades++;
        }

        // Check and update the best trade if the current trade has a higher profit/loss than the current best.
        if (adjustedProfitLoss > bestTrade.profitLoss) {
            bestTrade = { profitLoss: adjustedProfitLoss, trade };
        }
        // Check and update the worst trade if the current trade has a lower profit/loss than the current worst.
        if (adjustedProfitLoss < worstTrade.profitLoss) {
            worstTrade = { profitLoss: adjustedProfitLoss, trade };
        }
    });

    return (
        <div className="container mx-auto p-4">

            <div className="my-4 text-2xl grid grid-cols-1 md:grid-cols-6 gap-2">
                <div className="flex items-center">
                    <CreateModal />
                </div>
                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-700 text-lg">Total Profit/Loss:</p>
                    <p className={`text-lg ${totalProfitLoss > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {formatNumber(totalProfitLoss)} kr
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-700 text-lg">Profitable Trades:</p>
                    <p className="text-lg text-green-500">{profitableTrades}</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-700 text-lg">Losing Trades:</p>
                    <p className="text-lg text-orange-500">{losingTrades}</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-700 text-lg">Best Trade:</p>
                    <p className="text-sm text-green-500 text-center">{bestTrade.trade ? `${bestTrade.trade.stock_name} with Profit/Loss: ${formatNumber(bestTrade.profitLoss)} kr` : 'N/A'}</p>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center items-center">
                    <p className="font-bold text-gray-700 text-lg">Worst Trade:</p>
                    <p className="text-sm text-red-500 text-center">{worstTrade.trade ? `${worstTrade.trade.stock_name} with Profit/Loss: ${formatNumber(worstTrade.profitLoss)} kr` : 'N/A'}</p>
                </div>
            </div>
            
            {/* </div> */}

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
