import { useState, useEffect } from 'react';

export default function UpdateCategory({ incomeVisibility, setIncomeVisibility }) {
    const [formState, setFormState] = useState({
        name: '',
        parent_category: '',
        budget: '',
        flexible: false
    });

    const [categoryID, setCategoryID] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (categoryID) {
                    const res = await fetch(`/api/category?id=${categoryID}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!res.ok) {
                        throw new Error('Failed to fetch category data');
                    };

                    const data = await res.json();
                    setFormState({
                        name: data[0].name,
                        parent_category: data[0].parent_category,
                        budget: data[0].budget,
                        flexible: data[0].flexible
                    })
                } else {
                    const res = await fetch('/api/category', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!res.ok) {
                        throw new Error('Failed to fetch category data');
                    };

                    const data = await res.json();
                    setCategories(data);
                }
            } catch (err) {
                console.error('Error making GET request:', err);
            };
        };
        fetchCategories();
    }, [categoryID]);

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        const checkedValue = type === 'radio' ? (value === 'true') : value;

        setFormState({
            ...formState,
            [name]: checkedValue,
        });
    };

    const handleCategorySelection = async (event) => {
        const { value } = event.target;

        setCategoryID(value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { name, parent_category, budget, flexible } = formState;

        const res = await fetch(`/api/category?id=${categoryID}`, {
            method: 'PUT',
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
            alert('Category updated!');
        }
    };

    const closeModal = () => {
        setIncomeVisibility('hidden');
    };

    return (
        <div className={"modal-background " + incomeVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form>
                        <p>Choose a category to update:</p>
                        <select onChange={handleCategorySelection}>
                            <option value="">--</option>
                            {
                                categories?.map((category) => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </form>
                    <form onSubmit={handleFormSubmit}>
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
            </div>
        </div>
    )
}