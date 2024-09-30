import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function BulkEditExpenses({ bulkEditModalVisibility, setBulkEditModalVisibility, selectedExpenses, clearSelectedExpenses, fetchExpense }) {

    const [formState, setFormState] = useState({ category_id: '', description: '', date: '', amount: '' });
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        if (selectedExpenses) {
            fetchCategories();
        }
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`api/category`);
            if (response.ok) {
                const data = await response.json();
                setCategoryOptions(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const closeModal = () => {
        setBulkEditModalVisibility('hidden');
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        if (name === "description") {
            setFormState({
                ...formState,
                description: value
            });
        }
        if (name === "date") {

            const localDate = new Date(value);
            const updatedDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));

            setFormState({
                ...formState,
                date: updatedDate.toISOString().split('T')[0]
            });
        }
        if (name === "amount") {
            setFormState({
                ...formState,
                amount: Number(value.split('$')[1])
            })
        }
        else {
            setFormState({
                ...formState,
                [name]: value
            })
        }
    };

    const submitForm = async (event) => {
        event.preventDefault();

        const updateData = Object.keys(formState).reduce((acc, key) => {
            if (formState[key] !== '') {
                acc[key] = formState[key];
            }
            return acc;
        }, {});

        const updates = selectedExpenses.map(id => ({
            id,
            ...updateData
        }));

        try {
            const response = await fetch('/api/expenses', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (response.ok) {
                alert('Bulk expense update successful!');
                clearSelectedExpenses();
                fetchExpense();
                closeModal();
            } else {
                throw new Error('Bulk update failed');
            }
        } catch (err) {
            console.error('Error updating expenses:', err);
            alert('Failed to update expenses.');
        }
    };

    return (
        <div className={"modal-background " + bulkEditModalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8 l-2.647 2.646 a.5.5 0 0 0 .708 .708 L8 8.707 l2.646 2.647 a.5.5 0 0 0 .708-.708 L8.707 8 l2.647-2.646 a.5.5 0 0 0-.708-.708 L8 7.293z" />
                    </svg>
                    <form onSubmit={submitForm}>
                        <h2>Edit Expenses</h2>
                        <div className="modal-form">

                            <div className="modal-form-line">
                                <label className="form-line-left">Category: </label>
                                <select
                                    name="category_id"
                                    className="form-line-right"
                                    value={formState.category_id}
                                    onChange={handleFormChange}
                                >
                                    {categoryOptions.length && categoryOptions.map((category, index) => (
                                        <option value={category.id} key={index}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Description</label>
                                <input
                                    name="description"
                                    type="text"
                                    value={formState.description}
                                    onChange={handleFormChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    value={formState.date}
                                    onChange={handleFormChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Amount</label>
                                <CurrencyInput
                                    name="amount"
                                    prefix="$"
                                    decimalsLimit={2}
                                    maxLength={20}
                                    defaultValue={0}
                                    value={formState.amount ? formState.amount : 0}
                                    onChange={handleFormChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div>
                                <button type="submit">Save</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
