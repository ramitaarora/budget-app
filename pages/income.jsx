import { useState, useEffect } from 'react';
import AddIncome from '../components/add-income';

export default function Income() {
    const [fullDate, setFullDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [incomeData, setIncomeData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    // const [modalVisibility, setModalVisibility] = useState('hidden');
    const [incomeVisibility, setIncomeVisibility] = useState('hidden');

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
            // timeZone: 'America/Los_Angeles'
        }).format(date);
    }

    useEffect(() => {
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
        fetchIncome();
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        setTotalIncome(incomeData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [incomeData]);

    const openModal = () => {
        setModalVisibility('visible');
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
        } catch (err) {
            console.error('Error making DELETE request:', err);
        };
    };

    const editIncome = async (incomeID) => {
        try {
            const res = await fetch(`/api/income?id=${incomeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch income data');
            };

            const deletedIncomeData = await res.json();
            return(deletedIncomeData);
        } catch (err) {
            console.error('Error making DELETE request:', err);
        };
    };

    return (
        <section>
            <header className="text-center">
                <h1 className="text-xl">Income Page</h1>
                <h1>{fullDate}</h1>
                <div>
                    <p>Change Month: </p>
                    {/* <input type="month" name="date" value={`${selectedYear}-${selectedMonth}`} onChange={(event) => setMonthYear(event)} /> */}
                    <input type="month" name="date" onChange={(event) => setMonthYear(event)} />
                </div>
            </header>
            <AddIncome incomeVisibility={incomeVisibility} setIncomeVisibility={setIncomeVisibility} />
            <div id="income">
                <div className="w-full flex justify-between items-center">
                    <h3 onClick={openIncomeModal} className="cursor-pointer">Total Monthly Income:</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openIncomeModal} className="cursor-pointer">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                </div>
                {incomeData.length > 0 ? (
                    <>
                        <p>${totalIncome}</p>
                    </>
                ) : (
                    <p>No income data.</p>
                )}
            </div>
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
                    {incomeData.map((income, index) => (
                        <tr key={index}>
                            <td>{formatDate(income.date)}</td>
                            <td>{income.description}</td>
                            <td>${income.amount}</td>
                            <td>
                                <button onClick={() => editIncome(income.id)}>
                                    e
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deleteIncome(income.id)}>
                                    x
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}