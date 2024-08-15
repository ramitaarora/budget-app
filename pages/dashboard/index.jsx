import Budget from '../../components/budget';
import Categories from '../../components/categories';
import Expenses from '../../components/expenses';
import SpendingChart from '../../components/spending-chart';
import { authenticate } from '../../middleware/auth';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
    return authenticate(context.req)
}

export default function Dashboard() {
    const [fullDate, setFullDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();

    useEffect(() => {
        const today = new Date();
        const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const formattedYear = today.getFullYear().toString();
        // const monthName = today.toLocaleString('en-US', { month: 'long' });

        const timeZoneDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeZone: 'America/Los_Angeles',
        }).format(today);

        setFullDate(timeZoneDate);
        setSelectedMonth(formattedMonth);
        setSelectedYear(formattedYear);
    }, []);

    const setMonthYear = (event) => {
        const selectedDate = event.target.value;
        const newMonth = selectedDate.slice(5, 7);
        const newYear = selectedDate.slice(0, 4);
        setSelectedMonth(newMonth);
        setSelectedYear(newYear);
    };

    return (
        <div>
            <nav>
                <button>Logout</button>
            </nav>
            {selectedMonth && selectedYear && (
                <>
                    <header className="text-center">
                        <h1 className="text-xl">Your Budget</h1>
                        <input type="month" name="date" value={`${selectedYear}-${selectedMonth}`} onChange={(event) => setMonthYear(event)} />
                        <p>AI Suggestion here</p>
                    </header>
                    <main className="flex w-screen flex-wrap justify-center align-center">
                        <Categories fullDate={fullDate} />
                        <div className="flex flex-col align-center justify-evenly">
                            <Budget month={selectedMonth} year={selectedYear} />
                            <Expenses month={selectedMonth} year={selectedYear} />
                        </div>
                        <SpendingChart fullDate={fullDate} />
                    </main>
                </>
            )}
        </div>
    )
}