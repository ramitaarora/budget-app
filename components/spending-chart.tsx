import exp from 'constants';
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

interface ChartData {
    title: string;
    data: (string | number)[][] | [];
    columns: { type: string, label: string }[];
}

interface SpendingChartProps {
    fullDate: string;
}

export default function SpendingChart({ fullDate }: SpendingChartProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [spendingData, setSpendingData] = useState<(string | number)[][] | []>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [budgetData, setBudgetData] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    let sortedData: any[] = [];

    const getData = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/category', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setCategoryData(data);

                try {
                    const response = await fetch(`/api/budget?date=${fullDate}`, {
                        method: 'GET'
                    });
                    if (response.ok) {
                        const data = await response.json();
                        // console.log(data);
                        setBudgetData(data);

                        try {
                            const response = await fetch(`/api/expenses?date=${fullDate}`, {
                                method: 'GET'
                            });
                            if (response.ok) {
                                const data = await response.json();
                                // console.log(data);
                                setExpensesData(data);
                                setLoading(false);
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (fullDate) {
            getData();
        }
    }, [fullDate])

    useEffect(() => {
        setTotalExpenses(expensesData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [expensesData])

    useEffect(() => {
        setSpendingData([]);

        for (let i = 0; i < expensesData.length; i++) {
            let inSorted = sortedData.find((item) => item.category_id === expensesData[i].category_id);

            if (!inSorted) {
                sortedData.push({
                    description: expensesData[i].description,
                    category_id: expensesData[i].category_id,
                    amount: Number(expensesData[i].amount),
                    date: expensesData[i].date,
                    id: expensesData[i].id,
                    user_id: expensesData[i].user_id
                });
            }
            else {
                for (let j = 0; j < sortedData.length; j++) {
                    if (sortedData[j].category_id === expensesData[i].category_id) {
                        sortedData[j].amount += Number(expensesData[i].amount);
                    }
                }
            }
        }
    }, [expensesData])

    useEffect(() => {
        for (let i = 0; i < sortedData.length - 1; i++) {
            let category = categoryData.filter((category) => sortedData[i].category_id === category.id);
            setSpendingData((prev) => [...(prev || []), [category[0].name, sortedData[i].amount]]);
        }

    }, [sortedData])

    useEffect(() => {
        const includesSavings = spendingData.some((item) => item[0] === "Savings Goal");
        const includesRemaining = spendingData.some((item) => item[0] === "Remaining Budget");

        if (!includesSavings && budgetData.length) {
            setSpendingData((prev) => [...(prev || []), ["Savings Goal", Number(budgetData[0].savings_goal)]]);
        }

        if (!includesRemaining && budgetData.length) {
            const remainingBudget = Number(budgetData[0].amount) - totalExpenses - budgetData[0].savings_goal;
            setSpendingData((prev) => [...(prev || []), ["Remaining Budget", remainingBudget]]);
        }

    }, [totalExpenses, spendingData, budgetData])

    const data: ChartData = {
        title: '',
        columns: [
            { type: 'string', label: 'Type' },
            { type: 'number', label: 'Amount' },
        ],
        data: spendingData,
    };

    return (
        <div>
            <section id="spending-chart">
                <h2>Spending Chart</h2>
                {loading ? <p>Loading...</p> : (
                    <div id="chart" className="overflow-hidden">
                        <Chart
                            chartType="PieChart"
                            width="350px"
                            height="300px"
                            data={[
                                [data.columns[0].label, data.columns[1].label],
                                ...data.data,
                            ]}
                            options={{
                                title: data.title,
                            }}
                        />
                    </div>
                )}
            </section>

        </div>
    );
}