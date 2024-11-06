import Budget from '../../components/budget';
import Categories from '../../components/categories';
import Expenses from '../../components/expenses';
import SpendingChart from '../../components/spending-chart';
import Chat from '../../components/chat';
import { authenticate } from '../../middleware/auth';
import { useEffect, useState } from 'react';
import AddUser from '../../components/add-user';
import DashboardNav from '../../components/dashboard-nav';
import Footer from '../../components/footer';
import StatContainer from '../../components/stat-container';

export async function getServerSideProps(context) {
    return authenticate(context.req)
}

export default function Dashboard() {
    const [fullDate, setFullDate] = useState('');
    const [userModal, setUserModal] = useState('hidden');
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [timezone, setTimezone] = useState('America/Los_Angeles')
    const [chatVisibility, setChatVisibility] = useState(false);
    const toggleChat = () => setChatVisibility(!chatVisibility);
    const [changeMonth, setChangeMonth] = useState(false);

    const chooseChangeMonth = () => {
        setChangeMonth(prevChangeMonth => !prevChangeMonth);
    };

    useEffect(() => {
        const today = new Date();
        const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const formattedYear = today.getFullYear().toString()

        const timeZoneDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeZone: timezone,
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
            <AddUser userModal={userModal} setUserModal={setUserModal} />
            <DashboardNav setUserModal={setUserModal} />
            {selectedMonth && selectedYear && (
                <div>
                    <header className="text-center fade-in">
                        <h1 className="text-xl">Your Budget</h1>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                            <button onClick={chooseChangeMonth}>
                                <img src="./left-button.png" alt="Change Arrow Icon" style={{ width: "18px", height: "auto", margin: "5px" }} />
                            </button>
                            <h1>{fullDate}</h1>
                            <button onClick={chooseChangeMonth}>
                                <img src="./right-button.png" alt="Change Arrow Icon" style={{ width: "18px", height: "auto", margin: "5px" }} />
                            </button>
                        </div>
                        {
                            changeMonth &&
                            <input type="month" name="date" onChange={(event) => setMonthYear(event)} />
                        }
                    </header>
                    <main className="h-screen">
                        <div className="flex w-screen h-1/2 flex-wrap justify-center items-center">
                            <div className="w-1/2 flex justify-center items-center fade-in">
                                <Categories month={selectedMonth} year={selectedYear} />
                            </div>
                            <div className="w-1/2 flex justify-center items-center fade-in">
                                <SpendingChart month={selectedMonth} year={selectedYear} />
                            </div>
                        </div>

                        <div className="flex h-1/2 w-screen flex-wrap justify-center items-center">
                            <div className="w-1/2 h-full flex flex-col items-center justify-center fade-in">
                                <Expenses month={selectedMonth} year={selectedYear} timezone={timezone} />
                            </div>
                            
                            <StatContainer month={selectedMonth} year={selectedYear}/>
                        </div>



                    </main>
                    <Footer />
                </div>
            )}
            {chatVisibility && <Chat month={selectedMonth} year={selectedYear} />}
            <a onClick={toggleChat} id="floating-button">
                <img src="./chat.png" alt="Toggle Chatbox" style={{ width: "35px", height: "auto", margin: "5px" }} />
            </a>
        </div>
    )
}