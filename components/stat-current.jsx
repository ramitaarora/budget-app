import { useState, useEffect } from 'react';

export default function StatCurrent({ budgetData, setBudgetData, expensesData }) {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [stat, setStat] = useState(0)

    useEffect(() => {
        setTotalExpenses(expensesData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [expensesData]);

    useEffect(() => {
        if (budgetData.length ){
            if (totalExpenses > budgetData[0].amount) {
                setStat(totalExpenses - budgetData[0].amount)
            } else {
                setStat(budgetData[0].amount - totalExpenses)
            }
        }

    }, [totalExpenses])

    return (
        <div className="stat">
            <div className="h-full flex flex-col justify-between">
                <h3 className="max-sm:text-sm">Your are</h3>

                {budgetData.length ? (
                    <p className="text-6xl self-center max-sm:text-4xl" style={{ color: totalExpenses > budgetData[0]?.amount ? 'red' : 'black' }}>
                        ${stat}
                    </p>
                ) : (
                    <p>${stat}</p>
                )}

                <p className="self-end max-sm:text-sm">{totalExpenses > budgetData[0]?.amount ? "over" : "under"} budget</p>
            </div>
        </div>
    )
}