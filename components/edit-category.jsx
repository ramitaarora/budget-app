import CurrencyInput from "react-currency-input-field"
import { useState, useEffect } from 'react';

export default function EditCategory({ editModalVisibility, setEditModalVisibility, editID }) {
    const [formState, setFormState] = useState({ name: '', budget: '' });

    const closeModal = () => {
        setEditModalVisibility('hidden')
    }

    const getCategory = async () => {
        try {
            const response = await fetch(`/api/category?id=${editID}`);
            if (response.ok) {
                const data = await response.json();
                // console.log(...data);
                setFormState(...data);
            }
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (editID) {
            getCategory();
        }
    }, [editID])

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        if (name === "name") {
            setFormState({
                ...formState,
                name: value,
            });
        }
        if (name === "budget") {
            console.log(value.split('$')[1])
            setFormState({
                ...formState,
                budget: Number(value.split('$')[1]),
            });
        }
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const { id, name, account_id, flexible, budget, parent_id} = formState;

        try {
            const response = await fetch(`/api/category?id=${id}&account=${account_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name, 
                    parent_id,
                    budget, 
                    flexible 
                })
            })

            if (response.ok) {
                getCategory();
                alert('Category edit successful!')
            }
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log(formState);
    }, [formState])

    return (
        <div className={"modal-background " + editModalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={submitForm}>
                        <h2>Edit Category</h2>
                        <div className="modal-form">

                            <div className="modal-form-line">
                                <label className="form-line-left">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleFormChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Budget</label>
                                <CurrencyInput
                                    name="budget"
                                    prefix="$"
                                    defaultValue={0}
                                    value={formState.budget ? formState.budget : 0}
                                    onChange={handleFormChange}
                                    className="form-line-right"
                                />
                            </div>

                            <div className="modal-form-line">
                                <label className="form-line-left">Type (Optional):</label>
                                <select
                                    name="parent_category"
                                    className="form-line-right"
                                >
                                    {/*typeOptions.length && typeOptions.map((type, index) => (
                                        <option value={type.id} key={index}>{type.name}</option>
                                    ))*/}
                                </select>
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