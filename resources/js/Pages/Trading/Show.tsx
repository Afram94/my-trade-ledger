import React from 'react';
import { PageProps, Trade } from '@/types';
import CreateModal from './Components/CreateModal';

const Show: React.FC<PageProps> = ({ auth }) => {
    const trades = auth.trade; // Assuming this is an array of Trade objects

    return (
        <div className="container mx-auto p-4">
            <CreateModal />
            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Stock Name</th>
                        <th className="px-4 py-3">Buy Price</th>
                        <th className="px-4 py-3">Sell Price</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Percentage</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {trades.map((trade: Trade) => (
                        <tr key={trade.id} className="text-gray-700">
                            <td className="px-4 py-3 text-sm">{trade.id}</td>
                            <td className="px-4 py-3 text-sm">{trade.stock_name}</td>
                            <td className="px-4 py-3 text-sm">{trade.buy_price}</td>
                            <td className="px-4 py-3 text-sm">{trade.sell_price}</td>
                            <td className="px-4 py-3 text-sm">{trade.status ? 'Profit' : 'Loss'}</td>
                            <td className="px-4 py-3 text-sm">{trade.percentage}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Show;
