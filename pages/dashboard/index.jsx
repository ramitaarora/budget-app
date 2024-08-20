import Budget from '../../components/budget';
import Categories from '../../components/categories';
import Expenses from '../../components/expenses';
import SpendingChart from '../../components/spending-chart';
import Chat from '../../components/chat';
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
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();

    useEffect(() => {
        const today = new Date();
        const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const formattedYear = today.getFullYear().toString()

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
            {selectedMonth && selectedYear && (
                <div>
                    <header className="text-center">
                        <h1 className="text-xl">Your Budget</h1>
                        <h1>{fullDate}</h1>
                        <div>
                            <p>Change Month: </p>
                            {/* <input type="month" name="date" value={`${selectedYear}-${selectedMonth}`} onChange={(event) => setMonthYear(event)} /> */}
                            <input type="month" name="date" onChange={(event) => setMonthYear(event)} />
                        </div>
                    </header>
                    <main className="flex w-screen flex-wrap justify-center align-center">
                        <Categories fullDate={fullDate} />
                        <div className="flex flex-col align-center justify-evenly">
                            <Budget month={selectedMonth} year={selectedYear} />
                            <Expenses month={selectedMonth} year={selectedYear} />
                        </div>
                        <SpendingChart fullDate={fullDate} />
                        <Chat month={selectedMonth} year={selectedYear} />
                    </main>
                </div>
            )}
        </div>
    )
}