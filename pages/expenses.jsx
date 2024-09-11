import { useState, useEffect } from 'react';
// import AddIncome from '../components/add-income';
// import EditIncome from '../components/edit-income';

export default function Expenses() {
    const [fullDate, setFullDate] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [expenseData, setExpenseData] = useState([]);
    const [editModalVisibility, setEditModalVisibility] = useState('hidden');
    const [addModalVisibility, setAddModalVisibility] = useState('hidden');
    const [editID, setEditID] = useState();

    useEffect(() => {
        const today = new Date();
        const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const formattedYear = today.getFullYear().toString()

        const timeZoneDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeZone: 'America/Los_Angeles',
        }).format(today);

        setFullDate(timeZoneDate);
        setSelectedMonth(formattedMonth);
        setSelectedYear(formattedYear);
    }, []);

    const setMonthYear = (event) => {
        const selectedDate = event.target.value;
        const newMonth = selectedDate.slice(5, 7);
        const newYear = selectedDate.slice(0, 4);
        setSelectedMonth(newMonth);
        setSelectedYear(newYear);
    };

    const formatDate = (incomeDate) => {
        const date = new Date(incomeDate);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: '2-digit',
            timeZone: 'UTC'
        }).format(date);
    }

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const res = await fetch(`/api/expenses?month=${selectedMonth}&year=${selectedYear}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch expense data');
                };

                const fetchedExpenseData = await res.json();
                setExpenseData(fetchedExpenseData);
            } catch (err) {
                console.error('Error making GET request:', err);
            };
        };
        fetchExpense();
    }, [selectedMonth, selectedYear]);

    const openEditModal = (event) => {
        setEditID(event.target.id);
        setEditModalVisibility('visible');
    }

    const openAddModal = () => {
        setAddModalVisibility('visible');
    }

    const deleteExpense = async (expenseID) => {
        try {
            const res = await fetch(`/api/expenses?id=${expenseID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch expense data');
            };
        } catch (err) {
            console.error('Error making DELETE request:', err);
        };
    };

    return (
        <section>
            <header className="text-center">
                <h1 className="text-xl">Expenses Page</h1>
                <h1>{fullDate}</h1>
                <div>
                    <p>Change Month: </p>
                    {/* <input type="month" name="date" value={`${selectedYear}-${selectedMonth}`} onChange={(event) => setMonthYear(event)} /> */}
                    <input type="month" name="date" onChange={(event) => setMonthYear(event)} />
                </div>
            </header>
            {/* <AddIncome
                addModalVisibility={addModalVisibility}
                setAddModalVisibility={setAddModalVisibility}
            />
            <EditIncome
                editModalVisibility={editModalVisibility}
                setEditModalVisibility={setEditModalVisibility}
                editID={editID}
            /> */}
            <div id="income">
                <div className="w-full flex justify-between items-center">
                    <h3 onClick={openAddModal} className="cursor-pointer">Expenses: </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openAddModal} className="cursor-pointer">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                </div>
                {expenseData.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenseData.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(expense.date)}</td>
                                        <td>{expense.description}</td>
                                        <td>${expense.amount}</td>
                                        <td>
                                            <button onClick={(event) => openEditModal(event)} id={expense.id}>
                                                e
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => deleteIncome(expense.id)}>
                                                x
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>No expense data.</p>
                )}
            </div>
        </section>
    );
}