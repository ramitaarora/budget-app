import { useState, useEffect } from 'react';
import EditBudget from './edit-budget';
import AddBudget from './add-budget';

export default function StatSavings({ budgetData, setBudgetData, fetchBudget }) {
    const [addModalVisibility, setAddModalVisibility] = useState('hidden');
    const [editModalVisibility, setEditModalVisibility] = useState('hidden');

    const openAddModal = () => {
        setAddModalVisibility('visible');
    }

    const openEditModal = () => {
        setEditModalVisibility('visible');
    }

    return (
        <div className="stat">
            <AddBudget addModalVisibility={addModalVisibility} setAddModalVisibility={setAddModalVisibility} fetchBudget={fetchBudget} />
            <EditBudget editModalVisibility={editModalVisibility} setEditModalVisibility={setEditModalVisibility} budgetData={budgetData} fetchBudget={fetchBudget} />
            <div className="h-full flex flex-col justify-between">
                <div className="w-full flex justify-between items-center">
                    <h3>You have saved</h3>
                    {budgetData.length ? (
                        <img src="./edit.svg" alt="edit" onClick={openEditModal} />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openAddModal}>
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg>
                    )}
                </div>

                {budgetData.length ? (
                    <p className="text-6xl self-center">${budgetData[0]?.savings_goal}</p>
                ) : (
                    <p>$0</p>
                )}

                <p className="self-end">so far</p>
            </div>
        </div>
    )
}