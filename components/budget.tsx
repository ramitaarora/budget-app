import { useState, useEffect } from 'react';

export default function Budget() {
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [budgetData, setBudgetData] = useState<any[]>([]);
    const [incomeData, setIncomeData] = useState<any[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);

    const today = new Date();
    const month = today.getMonth() + 1;
    const monthName = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await fetch(`/api/expenses?month=${month}&year=${year}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch expenses data');
                };

                const fetchedExpensesData = await res.json();
                setExpensesData(fetchedExpensesData);
            } catch (err) {
                console.error('Error making GET request:', err);
            };
        };

        const fetchBudget = async () => {
            try {
                const res = await fetch(`/api/budget?month=${month}&year=${year}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch budget data');
                };

                const fetchedBudgetData = await res.json();
                setBudgetData(fetchedBudgetData);
            } catch (err) {
                console.error('Error making GET request:', err);
            };
        };

        const fetchIncome = async () => {
            try {
                const res = await fetch(`/api/income?month=${month}&year=${year}`, {
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

        fetchExpenses();
        fetchBudget();
        fetchIncome();
    }, []);

    useEffect(() => {
        setTotalExpenses(expensesData.reduce((acc, obj) => acc + Number(obj.amount), 0));
        setTotalIncome(incomeData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [expensesData, incomeData]);

    return (
        <section id="budget">
            <div className="card-header">
                <h2>Budget</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
            </div>
            <h3>Current Month: {monthName} {year}</h3>
            <div id="total-budget">
                <h3>Remaining Budget</h3>
                {budgetData.length > 0 ? (
                    <>
                        <p style={{ color: totalExpenses > budgetData[0]?.amount ? 'red' : 'black' }}>
                            ${totalExpenses} / ${budgetData[0]?.amount}
                        </p>
                    </>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
            <div id="income">
                <h3>Income</h3>
                {incomeData.length > 0 ? (
                    <>
                        <p>${totalIncome}</p>
                    </>
                ) : (
                    <p>No income data.</p>
                )}
            </div>
            <div id="savings-goals">
                <h3>Monthly Savings Goal</h3>
                {budgetData.length > 0 ? (
                    <>
                        <p>${budgetData[0]?.savings_goal}</p>
                    </>
                ) : (
                    <p>No budget data available.</p>
                )}
            </div>
        </section>
    );
}