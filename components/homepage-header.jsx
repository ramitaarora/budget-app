import { useRouter } from 'next/router';
import { Exo_2 } from 'next/font/google';
const exo_2 = Exo_2({
    weight: '800',
    style: 'normal',
    subsets: ['latin'],
})

export default function HomepageHeader() {
    const router = useRouter();

    const loginPage = () => {
        router.push('/login');
    }

    const signupPage = () => {
        router.push('/signup');
    }

    const home = () => {
        router.push('/');
    }

    const demoLogin = async () => {
        try {
            const response = await fetch('/api/login-demo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                router.push('/dashboard');
            } else if (!response.ok) {
                setFormState({
                    ...formState,
                    password: ''
                });
                alert('Failed to login to demo. Please try again later.');
            };
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <header className="bg-sky-700 text-white w-full flex justify-between items-center p-6">
            <div className="w-1/3">
                <div className={exo_2.className} onClick={home}>
                    <h1 className="text-2xl cursor-pointer">The Budget Dashboard</h1>
                </div>
            </div>

                <div className="w-1/3">
                    <a href="https://github.com/ramitaarora/budget-app" target="_blank"><img src="./github.svg" alt="github" className="m-auto cursor-pointer" /></a>
                </div>
                <ul className="w-1/3 flex flex-wrap justify-evenly items-center max-md:flex-col">
                    <li><button onClick={loginPage} className="border rounded px-3 hover:bg-sky-800 my-1">Login</button></li>
                    <li><button onClick={signupPage} className="border rounded px-3 hover:bg-sky-800 my-1">Sign Up</button></li>
                    <li><button onClick={demoLogin} className="border rounded px-3 hover:bg-sky-800 my-1">Login to Demo</button></li>
                </ul>
        </header>
    )
}