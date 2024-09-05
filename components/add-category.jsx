import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function AddCategory({ addModalVisibility, setAddModalVisibility }) {
    const [formState, setFormState] = useState({ name: '', parent_category: '', budget: '', flexible: false });
    const [typeOptions, setTypeOptions] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch('/api/category', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setTypeOptions([{ name: '', id: '' }, ...data]);
            }
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

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

        let parent_id = null;
        if (parent_category.length) {
            parent_id = Number(parent_category);
        }

        const res = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name, 
                parent_id,
                budget: formattedBudget, 
                flexible 
            })
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
        setAddModalVisibility('hidden');
    }

    return (
        <div className={"modal-background " + addModalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={handleFormSubmit}>
                        <h2>Add Category</h2>
                        <div className="modal-form">

                            <div className="modal-form-line">
                                <label className="form-line-left">Name</label>
                                <input
                                    placeholder="Name"
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                    className="form-line-right"
                                />
                            </div>
                            <div className="modal-form-line">
                                <label className="form-line-left">Type (Optional):</label>
                                <select
                                    name="parent_category"
                                    value={formState.parent_category}
                                    onChange={handleChange}
                                    className="form-line-right"
                                >
                                {typeOptions.length && typeOptions.map((type, index) => (
                                    <option value={type.id} key={index}>{type.name}</option>
                                ))}
                                </select>
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Budget: </label>
                                <CurrencyInput
                                    name="budget"
                                    prefix="$"
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    onChange={handleChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Flexible?</label>
                                <div id="radio-buttons" className="form-line-right">
                                    <label className="flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="flexible"
                                            value="true"
                                            onChange={handleChange}
                                            checked={formState.flexible === true}
                                        />
                                        True
                                    </label>
                                    <label className="flex items-center justify-center">
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
                            </div>
                        </div>
                        <div>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}