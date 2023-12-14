import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface CreateTradeProps {
    closeModal: () => void;
}

const Create: React.FC<CreateTradeProps> = ({ closeModal }) => {
    // State for the new trade
    const [newTrade, setNewTrade] = useState({
        /* trade_type_id: '', */
        initial_capital: '',
        stock_name: '',
        buy_price: '',
        sell_price: '',
        status: false,
        percentage: '',
        fee_percentage: 0.50,
    });

    // State for the list of trade types
    /* const [tradeTypes, setTradeTypes] = useState<TradeType[]>([]); */

    // Fetch trade types when the component mounts
    /* useEffect(() => {
        axios.get('/trade-types-data')
            .then(response => {
                console.log(response.data); // Log the response data
                setTradeTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching trade types:', error);
            });
    }, []); */

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'status') {
            setNewTrade({ ...newTrade, [name]: value === 'true' });
        } else {
            setNewTrade({ ...newTrade, [name]: value });
        }
    };

    // Handle form submission
    const handleNewTradeSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post('/trades', newTrade)
            .then(response => {
                closeModal();
                setNewTrade({ /* trade_type_id: '', */initial_capital: '', stock_name: '', buy_price: '', sell_price: '', status: false, percentage: '', fee_percentage: 0.50 });
            })
            .catch(error => {
                console.error('Error adding trade:', error);
            });
    };

    return (
        <form onSubmit={handleNewTradeSubmit}>
            <div className='grid grid-cols-2 gap-2'>
            {/* {Array.isArray(tradeTypes) && (
                <select 
                    name="trade_type_id" 
                    onChange={handleInputChange} 
                    value={newTrade.trade_type_id}
                >
                    <option value="">Select Trade Type</option>
                    {tradeTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            )} */}


                <TextInput 
                    type="number"
                    name="initial_capital"
                    placeholder="Initial capital"
                    value={newTrade.initial_capital}
                    onChange={handleInputChange} 
                />
                <TextInput 
                    type="text"
                    name="stock_name"
                    placeholder="Stock Name"
                    value={newTrade.stock_name}
                    onChange={handleInputChange} 
                />
                <TextInput
                    type="number"
                    name="buy_price"
                    placeholder="Buy Price"
                    value={newTrade.buy_price}
                    onChange={handleInputChange}
                />
                <TextInput
                    type="number"
                    name="sell_price"
                    placeholder="Sell Price"
                    value={newTrade.sell_price}
                    onChange={handleInputChange}
                />
                <select 
                    name="fee_percentage"
                    value={newTrade.fee_percentage}
                    onChange={handleInputChange}
                >
                    {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5].map(value => (
                        <option key={value} value={value}>{value}%</option>
                    ))}
                </select>
                {/* <TextInput
                    type="number"
                    name="percentage"
                    placeholder="Percentage"
                    value={newTrade.percentage}
                    onChange={handleInputChange}
                /> */}
                {/* <select name="status" onChange={handleInputChange} value={String(newTrade.status)}>
                    <option value="false">Loss</option>
                    <option value="true">Profit</option>
                </select> */}
            </div>
            <div className='flex justify-end mt-2'>
                <PrimaryButton type="submit">Add Trade</PrimaryButton>
            </div>
        </form>
    );
};

export default Create;
