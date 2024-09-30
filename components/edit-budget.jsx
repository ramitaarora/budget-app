import { useState, useEffect } from 'react';

export default function EditBudget({ editModalVisibility, setEditModalVisibility, budgetData, fetchBudget }) {
    const [formState, setFormState] = useState({ date: '', amount: '', savings_goal: '', id: '' });

    useEffect(() => {
        if (budgetData.length) {
            setFormState({
                amount: Number(budgetData[0].amount),
                savings_goal: Number(budgetData[0].savings_goal),
                date: budgetData[0].date,
                id: budgetData[0].id
            })
        }
    }, [budgetData])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { date, amount, savings_goal, id } = formState;
        const currencyTest = new RegExp('^\\d+(\\.\\d{2})?$');
        
        const amountTest = currencyTest.test(amount);
        const savingsTest = currencyTest.test(savings_goal);

        if (!amountTest || !savingsTest) {
            alert('Please input only numbers and decimal places and try again.')
        } else {
            const res = await fetch(`/api/budget?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    date: date,
                    amount: Number(amount), 
                    savings_goal: Number(savings_goal) 
                })
            });
    
            if (res.ok) {
                setFormState({
                    amount: '',
                    savings_goal: '',
                });
                fetchBudget();
                closeModal()
            }
        }
    };

    const deleteBudget = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/budget?id=${budgetData[0].id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                alert('Budget deleted.');
                setFormState({
                    amount: '',
                    savings_goal: '',
                });
                fetchBudget();
                closeModal();
            }
        } catch(err) {
            console.error(err);
        }
    }

    const resetForm = (event) => {
        event.preventDefault();
        setFormState({
            amount: '',
            savings_goal: '',
        });
    }

    const closeModal = () => {
        setEditModalVisibility('hidden');
    }

    return (
        <div className={"modal-background " + editModalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={handleFormSubmit}>
                        <h2>Edit Budget</h2>
                        <div className="modal-form">

                            <div className="modal-form-line">
                                <label className="form-line-left">Amount: </label>
                                <input
                                    name="amount"
                                    value={formState.amount}
                                    onChange={handleChange}
                                    className="form-line-right"
                                    required
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Savings Goal: </label>
                                <input
                                    name="savings_goal"
                                    value={formState.savings_goal}
                                    onChange={handleChange}
                                    className="form-line-right"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit">Save</button>
                        <button onClick={deleteBudget}>Delete Budget</button>
                        <button type="reset" onClick={resetForm}>Reset form</button>
                    </form>
                </div>
            </div>
        </div>
    )
}