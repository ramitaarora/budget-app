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

    useEffect(() => {
        const date = new Date();

        const timeZoneDate = new Intl.DateTimeFormat('en-US', {
          dateStyle: 'full',
          timeZone: 'America/Los_Angeles',
        }).format(date);

        setFullDate(timeZoneDate)
    }, [])

    return (
        <div>
            <nav>
                <button>Logout</button>
            </nav>
            <header className="text-center">
                <h1 className="text-xl">Your Budget</h1>
                
                <p>AI Suggestion here</p>
            </header>
            <main className="flex w-screen flex-wrap justify-center items-center">
                <Categories fullDate={fullDate} />
                <div className="flex flex-col align-center justify-evenly">
                    <Budget />
                    <Expenses />
                </div>
                <SpendingChart fullDate={fullDate}/>
            </main>
        </div>
    )
}