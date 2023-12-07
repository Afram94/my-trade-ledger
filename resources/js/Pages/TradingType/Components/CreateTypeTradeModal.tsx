import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import Create from '@/Pages/TradingType/Create';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaPlus } from 'react-icons/fa';

const CreateTypeTradeModal: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <PrimaryButton className='my-3' onClick={() => setModalOpen(true)}>
                <FaPlus/>
                <p className='px-2'>Add a type to your trade</p>
                
            </PrimaryButton>

            <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="p-4">
                    <h2 className="text-lg font-medium mb-4 flex justify-center">Create New Type trade</h2>
                    <Create closeModal={() => setModalOpen(false)} />
                </div>
            </Modal>
        </div>
    );
}

export default CreateTypeTradeModal;
