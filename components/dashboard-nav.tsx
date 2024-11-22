import { useRouter } from 'next/router';

interface DashboardNavProps {
    setUserModal: (value: string) => void;
}

export default function DashboardNav( { setUserModal }:DashboardNavProps) {
    const router = useRouter();
    
    const navigate = async (event:any) => {
        if (event.target.id === "dashboard") {
            router.push('/dashboard');
        }

        if (event.target.id === "user-page") {
            router.push('/user');
        }

        if (event.target.id === "income-page") {
            router.push('/income');
        }

        if (event.target.id === "expenses-page") {
            router.push('/expenses');
        }

        if (event.target.id === "logout") {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                router.push('/');
            }
            else {
                alert('Logout failed.');
            }
        }
    };

    return (
        <nav>
            <ul>
                {typeof window !== "undefined" && window.location.pathname === '/dashboard' ? null : <li id="dashboard" onClick={(event) => navigate(event)}>Dashboard</li> }
                <li id="income-page" onClick={(event) => navigate(event)}>Income</li>
                <li id="expenses-page" onClick={(event) => navigate(event)}>Expenses</li>
                <li id="user-page" onClick={(event) => navigate(event)}>Account</li>
                <li id="logout" onClick={(event) => navigate(event)}>Logout</li>
            </ul>
        </nav>
    )
};