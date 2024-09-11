import CurrencyInput from "react-currency-input-field";
import { useState, useEffect } from 'react';

export default function EditIncome({ editIncomeVisibility, setEditIncomeVisibility, incomeData }) {
    const submitForm = (event) => {
        return;
    }

    const closeModal = () => {
        setEditIncomeVisibility('hidden');
    }

    return (
        <div className={"modal-background " + editIncomeVisibility}>
            <div className="modal">
                <div className="modal-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={closeModal} className="exit">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <form onSubmit={submitForm}>
                        <h2>Edit Income</h2>
                        <div className="modal-form">

                            {incomeData?.map((income, index) => (
                                <div className="py-3">
                                    <div className="modal-form-line">
                                        <label className="form-line-left">Description: </label>
                                        <input
                                            name="description"
                                            type="text"
                                            value={income.description}
                                            // onChange={handleFormChange}
                                            className="form-line-right"
                                        />
                                    </div>

                                    <div className="modal-form-line">
                                        <label className="form-line-left">Amount: </label>
                                        <CurrencyInput
                                            name="amount"
                                            prefix="$"
                                            defaultValue={0}
                                            value={income.amount}
                                            // onChange={handleFormChange}
                                            className="form-line-right"
                                        />
                                    </div>

                                    <button>Delete Income</button>
                                </div>
                            ))}



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