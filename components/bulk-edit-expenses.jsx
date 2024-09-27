import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function BulkEditExpenses({ bulkEditModalVisibility, setBulkEditModalVisibility, selectedExpenses, fetchExpense }) {
    const closeModal = () => {
        setBulkEditModalVisibility('hidden');
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setBulkEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitBulkUpdate = async (event) => {
        event.preventDefault();

        const updates = selectedExpenses.map(id => ({
            id,
            ...bulkEditData
        }));

        try {
            const response = await fetch('/api/expenses', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (response.ok) {
                alert('Bulk expense update successful!');
                fetchExpense();
                closeModal();
            } else {
                throw new Error('Bulk update failed');
            }
        } catch (err) {
            console.error('Error updating expenses:', err);
            alert('Failed to update expenses.');
        }
    };

    return (
        <div className={"modal-background " + bulkEditModalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8 l-2.647 2.646 a.5.5 0 0 0 .708 .708 L8 8.707 l2.646 2.647 a.5.5 0 0 0 .708-.708 L8.707 8 l2.647-2.646 a.5.5 0 0 0-.708-.708 L8 7.293z" />
                    </svg>
                    {/* <form onSubmit={submitBulkUpdate}>
                        <h2>Edit Multiple Expenses</h2>
                        <div className="modal-form">
                            <div className="modal-form-line">
                                <label>Description</label>
                                <input
                                    name="description"
                                    type="text"
                                    value={bulkEditData.description}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="modal-form-line">
                                <label>Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    value={bulkEditData.date}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="modal-form-line">
                                <label>Amount</label>
                                <CurrencyInput
                                    name="amount"
                                    prefix="$"
                                    decimalsLimit={2}
                                    value={bulkEditData.amount}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
    );
}
