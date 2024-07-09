import { useState, useEffect } from 'react';
import { Expenses, expensesData } from "../frontend-test-data/expenses";

export default function Expenses() {
    const [expensesData, setExpensesData] = useState<any[]>([]);
    // const [sortedExpenses, setSortedExpenses] = useState<Expenses[]>(expensesData);
    // const sortedExpensesData = expensesData.sort((a, b) => b.date.getTime() - a.date.getTime());

    const today = new Date();
    const month = today.getMonth();
    // const monthName = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await fetch(`/api/expenses?month=${month}&year=${year}&limit=5`, {
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

    return (
        <section id="expenses">
            <h2 className="text-center">Latest Expenses</h2>
            <div id="recent-expenses">
                {/* <p>{sortedExpenses[0].description} - ${sortedExpenses[0].amount}</p>
                <p>{sortedExpenses[1].description} - ${sortedExpenses[1].amount}</p>
                <p>{sortedExpenses[2].description} - ${sortedExpenses[2].amount}</p> */}
            </div>
        </section>
    );
}