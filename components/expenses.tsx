import { useState, useEffect } from 'react';
import AddExpense from './add-expense';
import EditExpense from './edit-expense-dashboard';

interface ExpensesProps {
    month: number;
    year: number;
    timezone: string,
}

export default function Expenses({ month, year, timezone }: ExpensesProps) {
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [addModalVisibility, setAddModalVisibility] = useState<string>('hidden');
    const [editModalVisibility, setEditModalVisibility] = useState<string>('hidden');
    const [editID, setEditID] = useState<number>();

    const fetchExpense = async () => {
        try {
            const res = await fetch(`/api/expenses?month=${month}&year=${year}&limit=5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch expenses data');
            };

            const data = await res.json();
            // console.log(data);
            setExpensesData(data);
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    useEffect(() => {

        fetchExpense();

    }, [month, year]);

    const formatDate = (date: any) => {
        const fullDate = new Date(date);
        const timeZoneDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeZone: timezone
        }).format(fullDate);
        return timeZoneDate;
    }

    const deleteExpense = async (event: any) => {
        console.log(event.target.id);
        try {
            const response = await fetch(`api/expenses?id=${event.target.id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                alert('Expense deleted.')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const openAddModal = () => {
        setAddModalVisibility('visible');
    }

    const openEditModal = (event: any) => {
        setEditID(event.target.id)
        setEditModalVisibility('visible');
    }

    return (
        <section id="expenses">
            <AddExpense addModalVisibility={addModalVisibility} setAddModalVisibility={setAddModalVisibility} fetchExpense={fetchExpense} />
            <EditExpense editModalVisibility={editModalVisibility} setEditModalVisibility={setEditModalVisibility} editID={editID} fetchExpense={fetchExpense} />
            <div className="card-header">
                <h2>Latest Expenses</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openAddModal}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
            </div>
            <div id="recent-expenses">
                {expensesData.length > 0 ? (
                    expensesData.map((expense, index) => (
                        <div key={index} className="w-full flex justify-between ">
                            <p className="w-1/6">{formatDate(expense.date)}</p>
                            <p className="w-1/6">${expense.amount}</p>
                            <p className="w-3/6">{expense.description}</p>
                            <div className="w-1/6 flex justify-evenly cursor-pointer">
                                <img src="./edit.svg" alt="edit" id={expense.id} onClick={(event) => openEditModal(event)} />
                                <img src="./delete.svg" alt="delete" id={expense.id} onClick={(event) => deleteExpense(event)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No expenses.</p>
                )}
            </div>
        </section>
    );
}