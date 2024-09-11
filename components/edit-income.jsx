import CurrencyInput from "react-currency-input-field"
import { useState, useEffect } from 'react';

export default function EditIncome({ editModalVisibility, setEditModalVisibility, editID }) {
    const [formState, setFormState] = useState({ description: '', date: '', amount: '' });

    const closeModal = () => {
        setEditModalVisibility('hidden')
    }

    const getIncome = async () => {
        try {
            const response = await fetch(`/api/income?id=${editID}`);
            if (response.ok) {
                const data = await response.json();
                // console.log(...data);
                setFormState(...data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (editID) {
            getIncome();
        }
    }, [editID])

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
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const { id: editID, description, amount, date } = formState;

        try {
            const response = await fetch(`/api/income?id=${editID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description,
                    amount,
                    date
                })
            })

            if (response.ok) {
                alert('Income edit successful!')
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={"modal-background " + editModalVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={submitForm}>
                        <h2>Edit Income</h2>
                        <div className="modal-form">

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
    )
}