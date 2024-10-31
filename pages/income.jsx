import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddIncome from '../components/add-income';
import EditIncome from '../components/edit-income';

export default function Income() {
    const [fullDate, setFullDate] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [incomeData, setIncomeData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [editModalVisibility, setEditModalVisibility] = useState('hidden');
    const [incomeVisibility, setIncomeVisibility] = useState('hidden');
    const [editID, setEditID] = useState();
    const [changeMonth, setChangeMonth] = useState(false);
    const router = useRouter();

    const navigate = async (event) => {
        if (event.target.id === "dashboard") {
            router.push('/dashboard')
        }
    }

    const chooseChangeMonth = () => {
        setChangeMonth(prevChangeMonth => !prevChangeMonth);
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

    const fetchIncome = async () => {
        try {
            const res = await fetch(`/api/income?month=${selectedMonth}&year=${selectedYear}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch income data');
            };

            const fetchedIncomeData = await res.json();
            setIncomeData(fetchedIncomeData);
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    useEffect(() => {
        fetchIncome();
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        setTotalIncome(incomeData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [incomeData]);

    const openEditModal = (event) => {
        setEditID(event.target.id);
        setEditModalVisibility('visible');
    }

    const openIncomeModal = () => {
        setIncomeVisibility('visible');
    }

    const deleteIncome = async (incomeID) => {
        try {
            const res = await fetch(`/api/income?id=${incomeID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch income data');
            };
            fetchIncome();
        } catch (err) {
            console.error('Error making DELETE request:', err);
        };
    };

    return (
        <section>
            <header className="text-center">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1 className="text-xl">Income</h1>
                    <img
                        id="dashboard"
                        src="./back-button.png"
                        alt="Home Button"
                        style={{ width: "15px", height: "15px", marginLeft: "10px" }}
                        onClick={(event) => navigate(event)}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
                    <div style={{ display: "flex" }}>
                        <button onClick={chooseChangeMonth}>
                            <img src="./left-button.png" alt="Change Arrow Icon" style={{ width: "18px", height: "auto", margin: "5px" }} />
                        </button>
                        <h1>{fullDate}</h1>
                        <button onClick={chooseChangeMonth}>
                            <img src="./right-button.png" alt="Change Arrow Icon" style={{ width: "18px", height: "auto", margin: "5px" }} />
                        </button>
                    </div>
                    {
                        changeMonth &&
                        <input type="month" name="date" onChange={(event) => setMonthYear(event)} />
                    }
                </div>
            </header>
            <AddIncome
                incomeVisibility={incomeVisibility}
                setIncomeVisibility={setIncomeVisibility}
                fetchIncome={fetchIncome}
            />
            <EditIncome
                editModalVisibility={editModalVisibility}
                setEditModalVisibility={setEditModalVisibility}
                editID={editID}
            />
            <div id="income">
                <div id="expense-income-nav" className="w-full flex justify-end items-center" style={{ paddingRight: "4%" }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="auto" fill="currentColor" viewBox="0 0 16 16" onClick={openIncomeModal} className="cursor-pointer">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                </div>
                <div id="expense-income-table">
                    {incomeData.length > 0 ? (
                        <>
                            <p>Total This Month: ${totalIncome}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomeData.map((income, index) => (
                                        <tr key={index}>
                                            <td onClick={(event) => openEditModal(event)} id={income.id}>
                                                {formatDate(income.date)}
                                            </td>
                                            <td onClick={(event) => openEditModal(event)} id={income.id}>
                                                {income.description}
                                            </td>
                                            <td onClick={(event) => openEditModal(event)} id={income.id}>
                                                ${income.amount}
                                            </td>
                                            <td>
                                                <button onClick={(event) => openEditModal(event)} id={income.id}>
                                                    <img
                                                        src="./edit-button.png"
                                                        alt="Edit Button"
                                                        style={{ width: "18px", height: "auto" }}
                                                    />
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => deleteIncome(income.id)} >
                                                    <img
                                                        src="./trash-button.png"
                                                        alt="Delete Button"
                                                        style={{ width: "18px", height: "auto" }}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>No income data.</p>
                    )}
                </div>
            </div>
        </section>
    );
}