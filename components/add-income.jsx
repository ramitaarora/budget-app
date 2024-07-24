import { useState } from 'react';
import DateSelector from './date-selector';
import CurrencyInput from 'react-currency-input-field';

export default function AddIncome() {

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

        const formattedAmount = amount.replace(/[^\d.-]/g, '');

        const res = await fetch('/api/income', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, date, amount: formattedAmount })
        });

        if (res.ok) {
            setFormState({
                description: '',
                date: '',
                amount: ''
            });
            // Change later
            alert('New income created!');
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Add Income</p>
                <div>
                    <input
                        placeholder="Description"
                        name="description"
                        type="text"
                        value={formState.description}
                        onChange={handleChange}
                    />
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