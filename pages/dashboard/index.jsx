import Budget from '../../components/budget';
import Categories from '../../components/categories';
import Expenses from '../../components/expenses';
import SpendingChart from '../../components/spending-chart';
import AddUser from '../../components/add-user';
import { authenticate } from '../../middleware/auth';

// export async function getServerSideProps(context) {
//     return authenticate(context.req)
// }

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
                <AddUser />
            </main>
        </div>
    )
}