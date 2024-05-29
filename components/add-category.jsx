import { useState } from 'react';

export default function AddCategory() {

    const [formState, setFormState] = useState({ name: '', parent_category: '', budget: '', flexible: false });

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        const checkedValue = type === 'radio' ? (value === 'true') : value;

        setFormState({
            ...formState,
            [name]: checkedValue,
        });
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const { name, parent_category, budget, flexible } = formState;

        const res = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parent_category, budget, flexible })
        });

        if (res.ok) {
            setFormState({
                name: '',
                parent_category: '',
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
                        placeholder="Budget"
                        name="budget"
                        type="number"
                        value={formState.budget}
                        onChange={handleChange}
                    />
                    <p>Flexible?</p>
                    <label>
                        <input
                            type="radio"
                            name="flexible"
                            value="true"
                            onChange={handleChange}
                            checked={formState.flexible === true}
                        />
                        True
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="flexible"
                            value="false"
                            onChange={handleChange}
                            checked={formState.flexible === false}
                        />
                        False
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}