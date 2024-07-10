import { useState, useEffect } from 'react';

export default function Expenses() {
    const [expensesData, setExpensesData] = useState<any[]>([]);

    const today = new Date();
    const month = today.getMonth();
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
            <h2 className="text-center">Latest Expenses</h2>
            <div id="recent-expenses">
                {expensesData.length > 0 ? (
                    <>
                        <p>{expensesData[0]?.description} - ${expensesData[0]?.amount}</p>
                        <p>{expensesData[1]?.description} - ${expensesData[1]?.amount}</p>
                        <p>{expensesData[2]?.description} - ${expensesData[2]?.amount}</p>
                        <p>{expensesData[3]?.description} - ${expensesData[3]?.amount}</p>
                        <p>{expensesData[4]?.description} - ${expensesData[4]?.amount}</p>
                    </>
                ) : (
                    <p>No expenses.</p>
                )}
            </div>
        </section>
    );
}