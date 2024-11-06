import { useState, useEffect } from 'react';

export default function User() {
    const [userData, setUserData] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await fetch(`/api/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            };

            const fetchedUserData = await res.json();
            setUserData(fetchedUserData);
        } catch (err) {
            console.error('Error making GET request:', err);
        };
    };

    useEffect(() => {
        fetchUser();
    },[]);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div>
            User Page
        </div>
    )
};