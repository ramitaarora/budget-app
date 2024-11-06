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

        if (event.target.id === "add-user") {
            setUserModal('visible');
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
            })

            if (response.ok) {
                router.push('/');
            }
            else {
                alert('Logout failed.');
            }
        }
    }

    return (
        <nav>
            <ul>
                {window.location.pathname === '/dashboard' ? null : <li id="dashboard" onClick={(event) => navigate(event)}>Dashboard</li> }
                {window.location.pathname === '/dashboard' ? <li id="add-user" onClick={(event) => navigate(event)}>Add Additional User</li> : null }
                <li id="income-page" onClick={(event) => navigate(event)}>Income</li>
                <li id="expenses-page" onClick={(event) => navigate(event)}>Expenses</li>
                <li id="logout" onClick={(event) => navigate(event)}>Logout</li>
            </ul>
        </nav>
    )
}