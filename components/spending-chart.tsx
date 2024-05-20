import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { expensesData } from "../frontend-test-data/expenses";
import { categoryData } from '../frontend-test-data/categories';

interface ChartData {
    title: string;
    data: (string | number)[][] | [];
    columns: { type: string, label: string }[];
}

export default function SpendingChart() {
    const [spendingData, setSpendingData] = useState<(string | number)[][] | []>([]);

    useEffect(() => {
        for (let i = 0; i < expensesData.length; i++) {
            let category = categoryData.filter((category) => expensesData[i].category_id === category.id);
            setSpendingData((pre) => [...pre, [category[0].name, expensesData[i].amount]]);
        }
    }, [])

    const data: ChartData = {
        title: 'May Expenses',
        columns: [
            { type: 'string', label: 'Type' },
            { type: 'number', label: 'Amount' },
        ],
        data: spendingData,
    };

    return (
        <section id="spending-chart">
            <h2>Spending Chart</h2>
            <div id="chart">
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="500px"
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