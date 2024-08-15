import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const loginPage = () => {
        router.push('/login');
    }

    const signupPage = () => {
        router.push('/signup')
    }

    return (
        <div>
            <Head>
                <title>Budget Planner App</title>
            </Head>
            <header className="text-center m-auto">
                <h1>Budget Planner App</h1>
                <button onClick={loginPage} className="p-2 border rounded">Login</button>
                <button onClick={signupPage} className="p-2 border rounded">Sign Up</button>
            </header>
        </div>
    )
}