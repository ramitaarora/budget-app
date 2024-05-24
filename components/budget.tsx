import { useState, useEffect } from 'react';
import { Budget, budgetData } from '../frontend-test-data/budget';
import { expensesData } from '../frontend-test-data/expenses';

export default function Budget() {
    const [totalExpenses, setTotalExpenses] = useState<number>(0);

    useEffect(() => {
        setTotalExpenses(expensesData.reduce((acc, obj) => acc + obj.amount, 0));
    }, [totalExpenses])

    return (
        <section id="budget">
            <h2 className="text-center">Budget</h2>
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