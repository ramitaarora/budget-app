import { useState } from 'react';
import MonthSelector from './month-selector';
import CurrencyInput from 'react-currency-input-field';

export default function AddBudget() {

    const [formState, setFormState] = useState({ date: '', amount: '', savings_goal: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

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
            // Change later
            alert('New budget created!');
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Add Budget</p>
                <div>
                    <MonthSelector date={formState.date} onChange={handleChange} />
                    <label>Amount: </label>
                    <CurrencyInput
                        name="amount"
                        prefix="$"
                        defaultValue={0}
                        decimalsLimit={2}
                        onChange={handleChange}
                    />
                    <label>Savings Goal: </label>
                    <CurrencyInput
                        name="savings_goal"
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