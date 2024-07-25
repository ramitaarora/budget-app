import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function AddCategory({ modalVisibility, setModalVisibility }) {

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
        const formattedBudget = budget.replace(/[^\d.-]/g, '');

        const res = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parent_category, budget: formattedBudget, flexible })
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
                            <label>Budget: </label>
                            <CurrencyInput
                                name="budget"
                                prefix="$"
                                defaultValue={0}
                                decimalsLimit={2}
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
            </div>
        </div>
    )
}