import { useState, useEffect } from 'react';

export default function AddCategory({ addModalVisibility, setAddModalVisibility, budgetData, getData, month, year }) {
    const [formState, setFormState] = useState({ name: '', parent_category: '', budget: '', recurring: true });
    const [typeOptions, setTypeOptions] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch(`/api/category?month=${month}&year=${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTypeOptions([{ name: '', id: '' }]);
                setCategoryData(data);

                for (let i = 0; i < data.length; i++) {
                    if (data[i].parent_id === null) {
                        const findCategory = typeOptions.find((category) => category.id === data[i].id);
                        if (!findCategory) {
                            setTypeOptions((prev) => [...prev, data[i]]);
                        }
                    }
                }
            }
        } catch (err) {
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

        const { name, parent_category, budget, recurring } = formState;

        let parent_id = null;
        if (parent_category.length) {
            parent_id = Number(parent_category);
        }

        const currencyTest = new RegExp('^\\d+(\\.\\d{2})?$');

        const budgetTest = currencyTest.test(budget);

        if (!budgetTest) {
            alert('Please input only numbers and decimal places for budget and try again.');
            return;
        }

        if (parent_category.length === 0) {
            // Parent category Test
            const totalParentBudget = categoryData
                .filter(category => category.parent_id === null)
                .reduce((acc, category) => acc + Number(category.budget), 0);
    
            if (totalParentBudget + Number(budget) > Number(budgetData[0].amount)) {
                alert('Category budget exceeds monthly budget amount.');
                return;
            }
        } else {
            // Child category Test
            const parent_id = Number(parent_category);
            const parentCategory = categoryData.find(category => category.id === parent_id);
            const totalChildBudget = categoryData
                .filter(category => category.parent_id === parent_id)
                .reduce((acc, category) => acc + Number(category.budget), 0);
    
            if (totalChildBudget + Number(budget) > Number(parentCategory?.budget)) {
                alert('The total budget for child categories exceeds the available budget for the parent category.');
                return;
            }
        }

        try {
            const res = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    parent_id,
                    budget,
                    recurring,
                    date: `${year}-${month}-01`
                })
            });

            if (res.ok) {
                setFormState({
                    name: '',
                    parent_category: '',
                    budget: '',
                    recurring: true
                });
                getData();
                // alert('New category created!');
                closeModal();
            }
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category. Please try again.');
        }
    }

    const resetForm = (event) => {
        event.preventDefault();
        setFormState({
            name: '',
            parent_category: '',
            budget: '',
            recurring: true,
        });
    }

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
                                    required
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
                                <input
                                    name="budget"
                                    onChange={handleChange}
                                    className="form-line-right"
                                    required
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Recurring?</label>
                                <div id="radio-buttons" className="form-line-right">
                                    <label className="flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="recurring"
                                            value="true"
                                            onChange={handleChange}
                                            checked={formState.recurring === true}
                                        />
                                        True
                                    </label>
                                    <label className="flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="recurring"
                                            value="false"
                                            onChange={handleChange}
                                            checked={formState.recurring === false}
                                        />
                                        False
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit">Save</button>
                            <button type="reset" onClick={resetForm}>Reset Form</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}