import exp from 'constants';
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

interface ChartData {
    title: string;
    data: (string | number)[][] | [];
    columns: { type: string, label: string }[];
}

export default function SpendingChart() {
    const [loading, setLoading] = useState<boolean>(false);
    const [spendingData, setSpendingData] = useState<(string | number)[][] | []>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);
    let sortedData: any[] = [];

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/category', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setCategoryData(data);
                try {
                    const response = await fetch('/api/expenses', {
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
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])

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

    const data: ChartData = {
        title: '',
        columns: [
            { type: 'string', label: 'Type' },
            { type: 'number', label: 'Amount' },
        ],
        data: spendingData,
    };

    return (
        <section id="spending-chart">
            <h2>Spending Chart</h2>
            <div id="chart" className="overflow-hidden">
                <Chart
                    chartType="PieChart"
                    width="400px"
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
        </section>
    );
}