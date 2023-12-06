// Create.tsx
import React, { useState } from 'react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface CreateTradeProps {
    closeModal: () => void;
}

const Create: React.FC<CreateTradeProps> = ({ closeModal }) => {
    const [newTrade, setNewTrade] = useState({
        stock_name: '',
        buy_price: '',
        sell_price: '',
        status: false,
        percentage: ''
    });

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'status') {
            // Directly update the status as a boolean
            setNewTrade({ ...newTrade, status: value === 'true' });
        } else {
            // Handle other string inputs
            setNewTrade({ ...newTrade, [name]: value });
        }
    };

    // Handle form submission
    const handleNewTradeSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Post request to /trades endpoint
        axios.post('/trades', newTrade)
            .then(response => {
                // Close the modal and reset the form upon successful submission
                closeModal();
                setNewTrade({ stock_name: '', buy_price: '', sell_price: '', status: false, percentage: '' });
            })
            .catch(error => {
                // Log any error during the request
                console.error('Error adding trade:', error);
            });
    };

    return (
        <form onSubmit={handleNewTradeSubmit}>
            <div className='grid grid-cols-2 gap-2'>
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
                
                <TextInput
                    type="number"
                    name="percentage"
                    placeholder="Percentage"
                    value={newTrade.percentage}
                    onChange={handleInputChange}
                />
                
                <select name="status" onChange={handleInputChange} value={String(newTrade.status)}>
                    <option value="false">Loss</option>
                    <option value="true">Profit</option>
                </select>

            </div>
            <div className='flex justify-end mt-2'>
                <PrimaryButton type="submit">Add Trade</PrimaryButton>
            </div>
        </form>
    );
};

export default Create;
