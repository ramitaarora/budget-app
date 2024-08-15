import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function AddExpense({ modalVisibility, setModalVisibility }) {
    const [formState, setFormState] = useState({ description: '', date: '', amount: '', category_id: '' });
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        try {
            const response = await fetch('api/category');
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setCategoryOptions(data);
            }
        } catch(err) {
            console.error(err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const { description, date, amount, category_id } = formState;

        const formattedAmount = amount.replace(/[^\d.-]/g, '');

        const res = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, date, amount: formattedAmount, category_id })
        });

        if (res.ok) {
            setFormState({
                description: '',
                date: '',
                amount: '',
                category_id: ''
            });
            // Change later
            alert('New expense created!');
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
                        <h2>Add Expense</h2>
                        <div className="modal-form">

                            <div className="modal-form-line">
                                <label className="form-line-left">Description</label>
                                <input
                                    placeholder="Description"
                                    name="description"
                                    type="text"
                                    value={formState.description}
                                    onChange={handleChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Category:</label>
                                <select
                                    name="category_id"
                                    value={formState.category_id}
                                    onChange={handleChange}
                                    className="form-line-right"
                                >
                                <option></option>
                                {categoryOptions.length && categoryOptions.map((category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                ))}
                                </select>
                            </div>
                            
                            <div className="modal-form-line">
                                <label className="form-line-left">Date:</label>
                                <input type="date" className="form-line-right" onChange={(event) => handleChange(event)} name="date"/>
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

                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}