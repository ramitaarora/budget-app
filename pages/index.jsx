import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const loginPage = () => {
        router.push('/login');
    }

    return (
        <div>
            <Head>
                <title>Budget Planner App</title>
            </Head>
            <nav className="p-2 w-screen flex justify-evenly align-center">
                <button onClick={loginPage}>Login</button>
                <button>Logout</button>
            </nav>
            <header className="text-center">
                <h1>Budget Planner App</h1>
            </header>
        </div>
    )
}