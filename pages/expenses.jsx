import { useState, useEffect } from 'react';
import AddExpense from '../components/add-expense';
import EditExpense from '../components/edit-expense';
import BulkEditExpenses from '../components/bulk-edit-expenses';

export default function Expenses() {
    const [fullDate, setFullDate] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [expenseData, setExpenseData] = useState([]);
    const [editModalVisibility, setEditModalVisibility] = useState('hidden');
    const [bulkEditModalVisibility, setBulkEditModalVisibility] = useState('hidden');
    const [addModalVisibility, setAddModalVisibility] = useState('hidden');
    const [editID, setEditID] = useState();
    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [bulkEdit, setBulkEdit] = useState(false);

    const chooseBulkEdit = () => {
        setBulkEdit(prevBulkEdit => !prevBulkEdit);
    };

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
    };

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

    const getCategoryName = (inputID) => {
        const category = categoryNames.find(category => category.id === inputID);
        return category ? category.name : 'Unknown Category';
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`api/category`);
            if (response.ok) {
                const data = await response.json();
                setCategoryNames(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchExpense();
    }, [selectedMonth, selectedYear]);

    const openEditModal = (event) => {
        setEditID(event.target.id);
        setEditModalVisibility('visible');
    };

    const openBulkEditModal = () => {
        if (selectedExpenses.length > 0) {
            setBulkEditModalVisibility('visible');
        } else {
            alert('No selected expenses to edit.')
        };
    };

    const openAddModal = () => {
        setAddModalVisibility('visible');
    };

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
            fetchExpense();
        } catch (err) {
            console.error('Error making DELETE request:', err);
        };
    };

    const handleSelectExpense = (id) => {
        setSelectedExpenses(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const clearSelectedExpenses = () => {
        setSelectedExpenses([]);
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
            <AddExpense
                addModalVisibility={addModalVisibility}
                setAddModalVisibility={setAddModalVisibility}
                fetchExpense={fetchExpense}
            />
            <EditExpense
                editModalVisibility={editModalVisibility}
                setEditModalVisibility={setEditModalVisibility}
                editID={editID}
                fetchExpense={fetchExpense}
            />
            <BulkEditExpenses
                bulkEditModalVisibility={bulkEditModalVisibility}
                setBulkEditModalVisibility={setBulkEditModalVisibility}
                selectedExpenses={selectedExpenses}
                clearSelectedExpenses={clearSelectedExpenses}
                fetchExpense={fetchExpense}
            />
            <div id="income">
                <div className="w-full flex justify-between items-center">
                    <h3 onClick={openAddModal} className="cursor-pointer">Expenses: </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openAddModal} className="cursor-pointer">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                    <button onClick={chooseBulkEdit}>Edit Multiple?</button>
                    {
                        bulkEdit &&
                        <button onClick={openBulkEditModal}>Bulk Edit</button>
                    }
                </div>
                {expenseData.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    {bulkEdit && <th>Select</th>}
                                    <th>Category</th>
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
                                        {
                                            bulkEdit &&
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedExpenses.includes(expense.id)}
                                                    onChange={() => handleSelectExpense(expense.id)}
                                                />
                                            </td>
                                        }
                                        <td>{getCategoryName(expense.category_id)}</td>
                                        <td>{formatDate(expense.date)}</td>
                                        <td>{expense.description}</td>
                                        <td>${expense.amount}</td>
                                        <td>
                                            <button onClick={(event) => openEditModal(event)} id={expense.id}>
                                                e
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => deleteExpense(expense.id)}>
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