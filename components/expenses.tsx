import { useState, useEffect } from 'react';

export default function Expenses() {
    const [expensesData, setExpensesData] = useState<any[]>([]);

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    useEffect(() => {
        const fetchExpenses = async () => {
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
                setExpensesData(data);
            } catch (err) {
                console.error('Error making GET request:', err);
            };
        };

        fetchExpenses();
    }, []);

    return (
        <section id="expenses">
            <div className="card-header">
                <h2>Latest Expenses</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
            </div>
            <div id="recent-expenses">
                {expensesData.length > 0 ? (
                    expensesData.map((expense, index) => (
                        <p key={index}>{expense.description} - ${expense.amount}</p>
                    ))
                ) : (
                    <p>No expenses.</p>
                )}
            </div>
        </section>
    );
}