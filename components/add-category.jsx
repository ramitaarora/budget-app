import { useState } from 'react';

export default function AddCategory({ accountID }) {

    const [formState, setFormState] = useState({ name: '', parent_category: '', color: '', budget: '', flexible: false, account_id: accountID });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const { name, parent_category, color, budget, flexible, account_id } = formState;

        const res = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parent_category, color, budget, flexible, account_id })
        });

        if (res.ok) {
            setFormState({
                name: '',
                parent_category: '',
                color: '',
                budget: '',
                flexible: ''
            });
            // Change later
            alert('New category created!');
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Add Category</p>
                <div>
                    <input
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <label>Type:</label>
                    <select
                        name="parent_category"
                        value={formState.parent_category}
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
                        placeholder="Color"
                        name="color"
                        type="text"
                        value={formState.color}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Budget"
                        name="budget"
                        type="number"
                        value={formState.budget}
                        onChange={handleChange}
                    />
                    <label>
                        Flexible:
                        <input
                            name="flexible"
                            type="checkbox"
                            value={formState.flexible}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}