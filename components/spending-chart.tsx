import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { Expenses, expensesData } from "../frontend-test-data/expenses";
import { categoryData } from '../frontend-test-data/categories';

interface ChartData {
    title: string;
    data: (string | number)[][] | [];
    columns: { type: string, label: string }[];
}

export default function SpendingChart() {
    const [spendingData, setSpendingData] = useState<(string | number)[][] | []>([]);
    let sortedData: Expenses[] = [];

    useEffect(() => {
        setSpendingData([]);

        for (let i = 0; i < expensesData.length; i++) {
            let inSorted = sortedData.find((item) => item.category_id === expensesData[i].category_id);

            if (!inSorted) {
                sortedData.push(expensesData[i]);
            }
            else {
                for (let j = 0; j < sortedData.length; j++) {
                    if (sortedData[j].category_id === expensesData[i].category_id) {
                        sortedData[j].amount += expensesData[i].amount;
                    }
                }
            }   
        }
    }, [expensesData])

    useEffect(() => {
        for (let i = 0; i < sortedData.length - 1; i++) {
            let category = categoryData.filter((category) => sortedData[i].category_id === category.id);
            setSpendingData( (prev) => [...(prev || []), [category[0].name, sortedData[i].amount]] );
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