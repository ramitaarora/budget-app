import { useState, useEffect } from 'react';
import StatCurrent from './stat-current';
import StatBudget from './stat-budget';
import StatSavings from './stat-savings';
import StatIncome from './stat-income';

interface BudgetProps {
    month: number;
    year: number;
}

export default function StatContainer({ month, year }: BudgetProps) {
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [budgetData, setBudgetData] = useState<any[]>([]);
    const [incomeData, setIncomeData] = useState<any[]>([]);

    const fetchExpenses = async () => {
        try {
            const res = await fetch(`/api/expenses?month=${month}&year=${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch expenses data');
            };

            const fetchedExpensesData = await res.json();
            setExpensesData(fetchedExpensesData);
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    const fetchBudget = async () => {
        try {
            const res = await fetch(`/api/budget?month=${month}&year=${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch budget data');
            };

            const fetchedBudgetData = await res.json();
            setBudgetData(fetchedBudgetData);
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    const fetchIncome = async () => {
        try {
            const res = await fetch(`/api/income?month=${month}&year=${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!res.ok) {
                throw new Error('Failed to fetch income data');
            };

            const fetchedIncomeData = await res.json();
            setIncomeData(fetchedIncomeData);
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    useEffect(() => {
        fetchExpenses();
        fetchBudget();
        fetchIncome();
    }, [month, year]);

    return (
        <div className="w-1/2 h-full flex flex-wrap justify-center items-center">
            <StatCurrent />
            <StatBudget budgetData={budgetData} setBudgetData={setBudgetData} expensesData={expensesData} fetchBudget={fetchBudget} />
            <StatIncome incomeData={incomeData} setIncomeData={setIncomeData} fetchIncome={fetchIncome} />
            <StatSavings budgetData={budgetData} setBudgetData={setBudgetData} fetchBudget={fetchBudget} />
        </div>
    )
}