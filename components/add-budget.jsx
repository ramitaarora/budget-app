import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function AddBudget({ modalVisibility, setModalVisibility, budgetData }) {
    const [formState, setFormState] = useState({ date: '', amount: '', savings_goal: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     const { date, amount, savings_goal } = formState;

    //     const formattedAmount = amount.replace(/[^\d.-]/g, '');
    //     const formattedSavingsGoal = savings_goal.replace(/[^\d.-]/g, '');

    //     const res = await fetch('/api/budget', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ date, amount: formattedAmount, savings_goal: formattedSavingsGoal })
    //     });

    //     if (res.ok) {
    //         setFormState({
    //             date: '',
    //             amount: '',
    //             savings_goal: '',
    //         });
    //         // Change later
    //         alert('New budget created!');
    //     }
    // };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!budgetData || budgetData.length === 0) {
            const { date, amount, savings_goal } = formState;
            const formattedAmount = amount.replace(/[^\d.-]/g, '');
            const formattedSavingsGoal = savings_goal.replace(/[^\d.-]/g, '');

            const res = await fetch('/api/budget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, amount: formattedAmount, savings_goal: formattedSavingsGoal })
            });

            if (res.ok) {
                setFormState({
                    date: '',
                    amount: '',
                    savings_goal: '',
                });
                alert('New budget created!');
            }
        } else {
            alert('Budget data already exists.');
        }
    };

    const closeModal = () => {
        setModalVisibility('hidden');
    }

    return (
        <div className={"modal-background " + modalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={handleFormSubmit}>
                        <h2>Add Budget</h2>
                        <div className="modal-form">

                            <div className="modal-form-line">
                                <label className="form-line-left">Select Month: </label>
                                <input
                                    type="month"
                                    name="date"
                                    onChange={(event) => handleChange(event)}
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Amount: </label>
                                <CurrencyInput
                                    name="amount"
                                    prefix="$"
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    onChange={handleChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Savings Goal: </label>
                                <CurrencyInput
                                    name="savings_goal"
                                    prefix="$"
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    onChange={handleChange}
                                    className="form-line-right"
                                />
                            </div>
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}