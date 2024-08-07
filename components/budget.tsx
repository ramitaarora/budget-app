import { useState, useEffect } from 'react';

interface BudgetProps {
    month: number;
    year: number;
}

export default function Budget({ month, year }: BudgetProps) {
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [budgetData, setBudgetData] = useState<any[]>([]);
    const [incomeData, setIncomeData] = useState<any[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);

    // const today = new Date();
    // const month = today.getMonth() + 1;
    // const monthName = today.toLocaleString('en-US', { month: 'long' });
    // const year = today.getFullYear();

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
    }, [month, year]);

    useEffect(() => {
        setTotalExpenses(expensesData.reduce((acc, obj) => acc + Number(obj.amount), 0));
        setTotalIncome(incomeData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [expensesData, incomeData]);

    return (
        <section id="budget">
            <h2 className="text-center">Budget</h2>
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