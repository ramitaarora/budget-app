import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function AddIncome({ incomeVisibility, setIncomeVisibility, fetchIncome }) {

    const [formState, setFormState] = useState({ description: '', date: '', amount: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { description, date, amount } = formState;

        const currencyTest = new RegExp('^\\d+(\\.\\d{2})?$');
        
        const amountTest = currencyTest.test(amount);

        if (!amountTest) {
            alert('Please input only numbers and decimal places for Amount and try again.')
        } else {
            const res = await fetch('/api/income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, date, amount: amount })
            });
    
            if (res.ok) {
                setFormState({
                    description: '',
                    date: '',
                    amount: ''
                });
                fetchIncome();
                closeModal();
            }
        }
    };

    const resetForm = (event) => {
        event.preventDefault();
        setFormState({
            description: '',
            date: '',
            amount: ''
        });
    }

    const closeModal = () => {
        setIncomeVisibility('hidden');
    };

    return (
        <div className={"modal-background " + incomeVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={handleFormSubmit}>
                        <h2>Add Income</h2>
                        <div className="modal-form">
                            <div className="modal-form-line">
                                <label className="form-line-left">Description: </label>
                                <input
                                    placeholder="Description"
                                    name="description"
                                    type="text"
                                    value={formState.description}
                                    onChange={handleChange}
                                    className="form-line-right"
                                    required
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Date: </label>
                                <input 
                                    type="date" 
                                    name="date"
                                    value={formState.date}
                                    onChange={handleChange} 
                                    className="form-line-right"
                                    required 
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Amount: </label>
                                <input
                                    name="amount"
                                    onChange={handleChange}
                                    value={formState.amount}
                                    className="form-line-right"
                                    required
                                />
                            </div>

                        </div>
                        <button type="submit">Save</button>
                        <button type="reset" onClick={resetForm}>Reset Form</button>
                    </form>
                </div>
            </div>
        </div>
    )
}