import { useState } from 'react';

export default function AddExpense() {

    const [formState, setFormState] = useState({ description: '', date: '', amount: '', category_id: '' });

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

        const res = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, date, amount, category_id })
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

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Add Expense</p>
                <div>
                    <input
                        placeholder="Description"
                        name="description"
                        type="text"
                        value={formState.description}
                        onChange={handleChange}
                    />
                    <label>Category:</label>
                    <select
                        name="category_id"
                        value={formState.category_id}
                        onChange={handleChange}
                    >
                        <option value="1">Food</option>
                        <option value="4">Rent</option>
                        <option value="5">Bills</option>
                        <option value="9">Transporation</option>
                        <option value="12">Necessities</option>
                        <option value="13">Entertainment</option>
                        <option value="14">Holiday/Gifts</option>
                        <option value="15">Medical</option>
                        <option value="16">Misc.</option>
                    </select>
                    <input
                        placeholder="Date"
                        name="date"
                        type="text"
                        value={formState.date}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Amount"
                        name="amount"
                        type="number"
                        value={formState.amount}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}