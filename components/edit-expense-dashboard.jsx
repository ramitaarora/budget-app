import CurrencyInput from "react-currency-input-field"
import { useState, useEffect } from 'react';

export default function EditExpense({ editModalVisibility, setEditModalVisibility, editID }) {
    const [formState, setFormState] = useState({ description: '', amount: '', id: '', date: '', category_id: '' });
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        if (editID) {
            getExpense();
            getCategories();
        }
    }, [editID])

    const getExpense = async () => {
        try {
            const response = await fetch(`/api/expenses?id=${editID}`);
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setFormState(...data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getCategories = async () => {
        try {
            const response = await fetch(`api/category`);
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setCategoryOptions(data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)

        if (name === "amount") {
            setFormState({
                ...formState,
                [name]: Number(value.split('$')[1]),
            })
        } else {
            setFormState({
                ...formState,
                [name]: value
            })
        }
    }

    const submitForm = async () => {
        event.preventDefault();

        const { description, amount, category_id, date } = formState;

        try {
            const response = await fetch(`/api/expenses?id=${editID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    description: description,
                    amount: amount,
                    category_id: category_id,
                    date: date
                })
            }) 

            if (response.ok) {
                alert('Expense edit successful!')
                setFormState({ description: '', amount: '', id: '', date: '', category_id: '' });
                closeModal();
            }
        } catch(err) {
            console.err(err)
        }
    }

    const closeModal = () => {
        setEditModalVisibility('hidden')
    }

    return (
        <div className={"modal-background " + editModalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={submitForm}>
                        <h2>Edit Expense</h2>
                        <div className="modal-form">

                            <div className="modal-form-line">
                                <label className="form-line-left">Description: </label>
                                <input
                                    name="description"
                                    type="text"
                                    value={formState.description}
                                    onChange={handleFormChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Amount: </label>
                                <CurrencyInput
                                    name="amount"
                                    type="text"
                                    value={formState.amount}
                                    prefix="$"
                                    className="form-line-right"
                                    onChange={handleFormChange}
                                />
                            </div>

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
                                <label className="form-line-left">Date:</label>
                                <input 
                                    name="date"
                                    type="date" 
                                    className="form-line-right"
                                    value={formState.date.slice(0, 10)} 
                                    onChange={handleFormChange}
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
    )
}