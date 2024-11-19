import Head from 'next/head';
import HomepageHeader from '../components/homepage-header';
import Footer from '../components/footer';
import { Exo_2 } from 'next/font/google';
const exo_2 = Exo_2({
    weight: '800',
    style: 'normal',
    subsets: ['latin'],
})

export default function Home() {
    return (
        <div>
            <Head>
                <title>The Budget Dashboard</title>
            </Head>
            <HomepageHeader />

            <main>

                <div className="w-full flex justify-evenly items-center m-3 p-6 m-auto relative top-16 max-sm:flex-col">
                    <div className="w-1/2 text-2xl text-right p-6 max-sm:w-full max-sm:m-auto max-sm:text-center">
                        <p className="text-xl">Try out</p>
                        <h2 className={exo_2.className}>The Budget Dashboard</h2>
                    </div>
                    <div className='w-1/2 max-sm:w-full'>
                        <img id="dashboard-image" src="./images/homepage/budget-dashboard-mobile.png" alt="budget-dashboard" className="p-2 bg-white border rounded-lg shadow-md fade-in max-sm:m-auto max-sm:h-auto"/>
                    </div>
                </div>

                <div className="w-full">
                    <img src="./images/homepage/wave.png" alt="border" className="h-36 w-full"/>
                </div>

                <div className="text-center p-10">
                    <h3 className="text-xl">Track Your Spending</h3>
                    <div className="flex justify-evenly items-center flex-wrap p-5 max-sm:p-1">
                        <img src="./images/homepage/budget.png" alt="budget" className="h-52 border rounded-lg shadow-md p-4 m-2 fade-in max-sm:h-full"/>
                        <img src="./images/homepage/income.png" alt="income" className="h-52 border rounded-lg shadow-md p-4 m-2 fade-in max-sm:h-full" />
                        <img src="./images/homepage/expenses.png" alt="expenses" className="h-52 border rounded-lg shadow-md p-4 m-2 fade-in max-sm:h-full"/>
                    </div>
                </div>

                <div className="w-full text-center p-10 bg-slate-100">
                    <h3 className="text-xl">Organize Your Expenses</h3>
                    <div className="flex justify-evenly items-center flex-wrap p-5">
                        <img src="./images/homepage/categories.png" alt="categories" className="h-96 border rounded-lg shadow-lg p-4 bg-white mx-auto my-5 fade-in max-sm:h-full" />
                        <img src="./images/homepage/spending-chart.png" alt="spending-chart" className="h-96 border rounded-lg shadow-lg p-4 bg-white mx-auto my-5 fade-in max-sm:h-full" />
                    </div>

                </div>

                <div className="w-full">
                    <img src="./images/homepage/wave-2.png" alt="border" className="h-36 w-full"/>
                </div>

                <div className="text-center p-10 flex justify-center items-center max-sm:flex-col ">
                    <img src="./images/homepage/chat.png" alt="budget-dashboard" className="h-96 border rounded-lg shadow-md fade-in max-sm:h-full" />
                    <h2 className="text-xl ml-5 max-sm:hidden">Get Spending Advice</h2>
                </div>

            </main>
        <Footer />
        </div>
    )
}