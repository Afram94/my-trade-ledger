import React from 'react';
import { PageProps, TradeType } from '@/types';
import CreateTypeTradeModal from './Components/CreateTypeTradeModal';

const ShowTradeTypes: React.FC<PageProps> = ({ auth }) => {
    const tradeTypes = auth.trade_type; // Assuming this is an array of TradeType objects

    console.log(tradeTypes);

    return (
        <div className="container mx-auto p-4">
            <CreateTypeTradeModal />
            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Initial Capital</th>
                        <th className="px-4 py-3">Uses Compounding Interest</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {tradeTypes?.map((tradeType: TradeType) => (
                        <tr key={tradeType.id} className="text-gray-700">
                            <td className="px-4 py-3 text-sm">{tradeType.id}</td>
                            <td className="px-4 py-3 text-sm">{tradeType.name}</td>
                            <td className="px-4 py-3 text-sm">{tradeType.initial_capital}</td>
                            <td className="px-4 py-3 text-sm">{tradeType.uses_compounding_interest ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowTradeTypes;
