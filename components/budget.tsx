import { useState, useEffect } from 'react';
import { Budget, budgetData } from '../frontend-test-data/budget';
// import { expensesData } from '../frontend-test-data/expenses';

export default function Budget() {
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [expensesData, setExpensesData] = useState<any[]>([]);

    const today = new Date();
    const month = today.getMonth();
    const monthName = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await fetch(`/api/expenses?month=${month}&year=${year}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type' : 'application/json',
                    }
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch expenses data');
                };

                const data = await res.json();
                console.log(data);
                setExpensesData(data);
            } catch (err) {
                console.error('Error making GET request:' , err);
            };
        };

        fetchExpenses();
    }, [month, year]);

    useEffect(() => {
        setTotalExpenses(expensesData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [expensesData]);

    return (
        <section id="budget">
            <h2 className="text-center">Budget</h2>
            <h3>Current Month: {monthName} {year}</h3>
            <div id="total-budget">
                <h3>Remaining Budget</h3>
                <p>${totalExpenses} / ${budgetData[0].amount}</p>
            </div>
            <div id="income">
                <h3>Income</h3>
                <p></p>
            </div>
            <div id="savings-goals">
                <h3>Monthly Savings Goal</h3>
                <p>${budgetData[0].savings_goal}</p>
            </div>
        </section>
    );
}