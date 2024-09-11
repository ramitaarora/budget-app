import exp from 'constants';
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

interface ChartData {
    title: string;
    data: (string | number)[][] | [];
    columns: { type: string, label: string }[];
}

interface SpendingChartProps {
    month: number,
    year: number
}

export default function SpendingChart({ month, year }: SpendingChartProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [spendingData, setSpendingData] = useState<(string | number)[][] | []>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [budgetData, setBudgetData] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    let sortedData: any[] = [];

    let data: ChartData = {
        title: '',
        columns: [
            { type: 'string', label: 'Type' },
            { type: 'number', label: 'Amount' },
        ],
        data: spendingData,
    };

    const getData = async () => {
        try {
            const response = await fetch('/api/category', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // console.log("categories", data);
                setCategoryData(data);

                try {
                    const response = await fetch(`/api/budget?month=${month}&year=${year}`, {
                        method: 'GET'
                    });
                    if (response.ok) {
                        const data = await response.json();
                        // console.log("budget", data);
                        setBudgetData(data);

                        try {
                            const response = await fetch(`/api/expenses?month=${month}&year=${year}`, {
                                method: 'GET'
                            });
                            if (response.ok) {
                                const data = await response.json();
                                // console.log("expenses", data);
                                setExpensesData(data);
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
        if (month && year) {
            getData();
        }
    }, [month, year])

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

    useEffect(() => {
        if (spendingData.length) {
            data = {
                title: '',
                columns: [
                    { type: 'string', label: 'Type' },
                    { type: 'number', label: 'Amount' },
                ],
                data: spendingData,
            };
            setLoading(false);
        }
    }, [spendingData])

    return (
        <div>
            <section id="spending-chart">
                <div className="card-header">
                    <h2>Spending Chart</h2>
                </div>
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