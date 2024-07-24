import { useState, useEffect } from 'react';

export default function Budget() {
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [budgetData, setBudgetData] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);

    useEffect(() => {
        setTotalExpenses(expensesData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [expensesData])

    const getData = async () => {
        try {
            // setLoading(true);
            const response = await fetch('/api/budget', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setBudgetData(data);
                try {
                    const response = await fetch('/api/expenses', {
                        method: 'GET'
                    });
                    if (response.ok) {
                        const data = await response.json();
                        // console.log(data);
                        setExpensesData(data);
                        // setLoading(false);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            {budgetData.length ? (
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
            ) : null}
        </div>
    );
}