import { useState, useEffect } from 'react';
import AddIncome from './add-income';

export default function StatIncome( { incomeData, setIncomeData, fetchIncome }) {
    const [totalIncome, setTotalIncome] = useState(0);
    const [incomeVisibility, setIncomeVisibility] = useState('hidden');

    useEffect(() => {
        setTotalIncome(incomeData.reduce((acc, obj) => acc + Number(obj.amount), 0));
    }, [incomeData]);

    const openIncomeModal = () => {
        setIncomeVisibility('visible');
    }

    return (
        <div className="stat">
            <AddIncome incomeVisibility={incomeVisibility} setIncomeVisibility={setIncomeVisibility} fetchIncome={fetchIncome} />
            <div className="h-full flex flex-col">
                <div className="w-full flex justify-between items-center">
                    <h3 onClick={openIncomeModal} className="cursor-pointer">You have made</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openIncomeModal} className="cursor-pointer">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                </div>
                {incomeData.length ? (
                    <p className="text-6xl self-center">${totalIncome}</p>
                ) : (
                    <p>$0</p>
                )}
            </div>
        </div>
    )
}