import Budget from '../../components/budget';
import Categories from '../../components/categories';
import Expenses from '../../components/expenses';
import SpendingChart from '../../components/spending-chart';
import AddUser from '../../components/add-user';
import { authenticate } from '../../middleware/auth';
import { useEffect, useState } from 'react';

// export async function getServerSideProps(context) {
//     return authenticate(context.req)
// }

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
            <header className="text-center">
                <h1>Dashboard</h1>
                <p>Month - Year</p>
                <p>AI Suggestion here</p>
            </header>
            <main className="flex w-screen flex-wrap justify-center align-center">
                <Categories />
                <div className="flex flex-col">
                    <Budget />
                    <Expenses />
                </div>
                <SpendingChart fullDate={fullDate}/>
                {/* <AddUser /> */}
            </main>
        </div>
    )
}