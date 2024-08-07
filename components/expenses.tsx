import { useState, useEffect } from 'react';

interface ExpensesProps {
    month: number;
    year: number;
}

export default function Expenses({ month, year }: ExpensesProps) {
    const [expensesData, setExpensesData] = useState<any[]>([]);

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

    }, [month, year]);

    return (
        <section id="expenses">
            <h2 className="text-center">Latest Expenses</h2>
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