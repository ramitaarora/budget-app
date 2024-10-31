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

    return (
        <header className="bg-sky-700 text-white w-full flex justify-between items-center p-6">
            <div className={exo_2.className} onClick={home}>
                <h1 className="text-2xl cursor-pointer">The Budget Dashboard</h1>
            </div>

            <div className="w-3/4 flex justify-evenly items-center">
                <div className="w-1/2">
                    <a href="https://github.com/ramitaarora/budget-app" target="_blank"><img src="./github.svg" alt="github" className="m-auto cursor-pointer homepage-hover"/></a>
                </div>
                <ul className="w-1/4 flex justify-evenly items-center">
                    <li><button onClick={loginPage} className="border rounded px-3 hover:bg-sky-800">Login</button></li>
                    <li><button onClick={signupPage} className="border rounded px-3 hover:bg-sky-800">Sign Up</button></li>
                </ul>
            </div>
        </header>
    )
}