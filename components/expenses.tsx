import { useState, useEffect } from 'react';
import { Expenses, expensesData } from "../frontend-test-data/expenses";

export default function Expenses() {
    const [sortedExpenses, setSortedExpenses] = useState<Expenses[]>(expensesData);

    useEffect(() => {
        setSortedExpenses(expensesData.sort((a, b) => b.date.getTime() - a.date.getTime()));
    }, [])

    return (
        <section id="expenses">
            <h2 className="text-center">Latest Expenses</h2>
            <div id="recent-expenses">
                <p>{sortedExpenses[0].description} - ${sortedExpenses[0].amount}</p>
                <p>{sortedExpenses[1].description} - ${sortedExpenses[1].amount}</p>
                <p>{sortedExpenses[2].description} - ${sortedExpenses[2].amount}</p>
            </div>
        </section>
    );
}