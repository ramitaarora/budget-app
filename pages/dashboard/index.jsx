import Budget from '../../components/budget';
import Categories from '../../components/categories';
import Expenses from '../../components/expenses';
import SpendingChart from '../../components/spending-chart';
import { authenticate } from '../../middleware/auth';
import { useEffect, useState } from 'react';
import AddUser from '../../components/add-user';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    return authenticate(context.req)
}

export default function Dashboard() {
    const [fullDate, setFullDate] = useState('');
    const [userModal, setUserModal] = useState('hidden');
    const router = useRouter();

    useEffect(() => {
        const date = new Date();

        const timeZoneDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeZone: 'America/Los_Angeles',
        }).format(date);

        setFullDate(timeZoneDate)
    }, [])

    const navigate = async (event) => {
        if (event.target.id === "add-user") {
            setUserModal('visible');
        }
        
        if (event.target.id === "logout") {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                router.push('/login');
            }
            else {
                alert('Logout failed.');
            }
        }
    }

    return (
        <div>
            <AddUser userModal={userModal} setUserModal={setUserModal} />
            <nav>
                <ul>
                    <li id="add-user" onClick={(event) => navigate(event)}>Add Additional User</li>
                    <li id="logout" onClick={(event) => navigate(event)}>Logout</li>
                </ul>
            </nav>
            <header className="text-center">
                <h1 className="text-xl">Your Budget</h1>
                <p>{fullDate}</p>
                <p>AI Suggestion here</p>
            </header>
            <main className="flex w-screen flex-wrap justify-center items-center">
                <Categories fullDate={fullDate} />
                <div className="flex flex-col align-center justify-evenly">
                    <Budget />
                    <Expenses />
                </div>
                <SpendingChart fullDate={fullDate} />
            </main>
        </div>
    )
}