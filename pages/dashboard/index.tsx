import Budget from '../../components/budget';
import Categories from '../../components/budget';
import Expenses from '../../components/budget';
import SpendingChart from '../../components/budget';

export default function Dashboard() {
    return (
        <div>
            <header className="text-center">
                <h1>Dashboard</h1>
                <p>Month - Year</p>
                <p>AI Suggestion here</p>
            </header>
            <main className="flex w-screen flex-wrap">
                <Categories />
                <div className="flex flex-col m-auto">
                    <Budget />
                    <Expenses />
                </div>
                <SpendingChart />
            </main>
        </div>
    )
};