import { useState } from 'react';
import DateSelector from './date-selector';
import CurrencyInput from 'react-currency-input-field';

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
                        <option value="6">Transporation</option>
                        <option value="9">Necessities</option>
                        <option value="10">Entertainment</option>
                        <option value="11">Holiday/Gifts</option>
                        <option value="12">Medical</option>
                        <option value="13">Misc.</option>
                    </select>
                    <DateSelector date={formState.date} onChange={handleChange} />
                    <label>Amount: </label>
                    <CurrencyInput
                        name="amount"
                        prefix="$"
                        defaultValue={0}
                        decimalsLimit={2}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}