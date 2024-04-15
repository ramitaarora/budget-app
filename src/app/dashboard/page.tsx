import Budget from "../ui/dashboard/budget";
import Categories from "../ui/dashboard/categories";
import Expenses from "../ui/dashboard/expenses";
import SpendingChart from "../ui/dashboard/spending-chart";

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
}