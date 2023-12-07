import React, { useState } from 'react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface CreateTradeTypeProps {
    closeModal: () => void;
}

const CreateTradeType: React.FC<CreateTradeTypeProps> = ({ closeModal }) => {
    const [newTradeType, setNewTradeType] = useState({
        name: '',
        initial_capital: '',
        uses_compounding_interest: false
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        setNewTradeType({ ...newTradeType, [name]: value });
    };

    const handleNewTradeTypeSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        axios.post('/trade-types', newTradeType)
            .then(response => {
                closeModal();
                setNewTradeType({ name: '', initial_capital: '', uses_compounding_interest: false });
            })
            .catch(error => {
                console.error('Error adding trade type:', error);
            });
    };

    return (
        <form onSubmit={handleNewTradeTypeSubmit}>
            <div className='grid grid-cols-2 gap-2'>
                <TextInput 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newTradeType.name}
                    onChange={handleInputChange} 
                />
                <TextInput
                    type="number"
                    name="initial_capital"
                    placeholder="Initial Capital"
                    value={newTradeType.initial_capital}
                    onChange={handleInputChange}
                />
                <label>
                    Uses Compounding Interest
                    <input 
                        type="checkbox" 
                        name="uses_compounding_interest" 
                        checked={newTradeType.uses_compounding_interest} 
                        onChange={handleInputChange} 
                    />
                </label>
            </div>
            <div className='flex justify-end mt-2'>
                <PrimaryButton type="submit">Add Trade Type</PrimaryButton>
            </div>
        </form>
    );
};

export default CreateTradeType;
