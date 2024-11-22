import { useState, useEffect } from 'react';
import DashboardNav from '../components/dashboard-nav';

export default function User() {
    const [userData, setUserData] = useState(null);
    const [accountData, setAccountData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        location: ''
    });
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const [newUserFormState, setNewUserFormState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        location: '',
        password: ''
    });

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
            }

            const fetchedUserData = await res.json();
            setUserData(fetchedUserData[0]);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (userData) {
            setFormState({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                location: userData.location || ''
            });
        }
    }, [userData]);

    const fetchAccountUsers = async () => {
        try {
            const res = await fetch(`/api/account`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!res.ok) {
                throw new Error('Failed to fetch account data');
            }

            const fetchedAccountData = await res.json();
            setAccountData(fetchedAccountData);
        } catch (err) {
            console.error('Error fetching acount data:', err);
        }
    };

    useEffect(() => {
        fetchAccountUsers();
    }, []);

    useEffect(() => {
        console.log(accountData);
    }, [accountData]);

    const toggleNewUserForm = () => {
        setShowNewUserForm((prev) => {
            if (!prev) {
                setNewUserFormState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    location: '',
                    password: ''
                });
            }
            return !prev;
        });
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleNewUserFormChange = (event) => {
        const { name, value } = event.target;
        setNewUserFormState({
            ...newUserFormState,
            [name]: value
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(`/api/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formState),
            });

            if (!res.ok) {
                throw new Error('Failed to update user data');
            }

            const updatedUser = await res.json();
            console.log('User updated successfully:', updatedUser);
            window.location.reload();
        } catch (err) {
            console.error('Error updating user data:', err);
        }
    };

    const submitNewUserForm = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(`/api/adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newUserFormState),
            });

            if (!res.ok) {
                throw new Error('Failed to add new user');
            }

            const addedUser = await res.json();
            console.log('New user added successfully:', addedUser);
            setShowNewUserForm(false);
            setNewUserFormState({ first_name: '', last_name: '', email: '', location: '', password: '' });
            window.location.reload();
        } catch (err) {
            console.error('Error adding new user:', err);
        }
    };

    return (
        <div>
            <DashboardNav />
            <div className="flex flex-col justify-center items-center w-full h-screen bg-white fade-in">
                {
                    !showForm &&
                    !showNewUserForm &&
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-4">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Account Info</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">Name: </label>
                                <label className="mb-1 text-gray-700">{formState.first_name} {formState.last_name}</label>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">Email: </label>
                                <label className="mb-1 text-gray-700">{formState.email}</label>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700">Location: </label>
                                <label className="mb-1 text-gray-700">{formState.location}</label>
                            </div>
                            {accountData && accountData.accountInfo && (
                                <div className="mt-6">
                                    <h3 className="text-l font-semibold mb-2">Additional Users</h3>
                                    <ul className="space-y-2">
                                        {accountData.accountInfo.map((user, index) => (
                                            <li key={index} className="flex flex-col">
                                                <span>{user.first_name} {user.last_name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button onClick={() => setShowForm(true)} className="w-full mt-4 text-black py-2 rounded hover:bg-blue-400 hover:text-white">
                                Edit
                            </button>
                        </div>
                    </div>
                }
                {
                    showForm &&
                    !showNewUserForm &&
                    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mb-4">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Account Info</h2>
                        <form onSubmit={submitForm}>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">First Name: </label>
                                    <input
                                        name="first_name"
                                        type="text"
                                        value={formState.first_name}
                                        onChange={handleFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">Last Name: </label>
                                    <input
                                        name="last_name"
                                        type="text"
                                        value={formState.last_name}
                                        onChange={handleFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">Email: </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">Location: </label>
                                    <input
                                        name="location"
                                        type="text"
                                        value={formState.location}
                                        onChange={handleFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <button type="submit" className="w-full mt-4 text-black py-2 rounded hover:bg-blue-400 hover:text-white">
                                    Save
                                </button>
                                {accountData && accountData.accountInfo && (
                                    <div className="mt-6">
                                        <h3 className="text-l font-semibold mb-2">Additional Users</h3>
                                        <ul className="space-y-2">
                                            {accountData.accountInfo.map((user, index) => (
                                                <li key={index} className="flex flex-col">
                                                    <span>{user.first_name} {user.last_name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                }
                <button
                    onClick={toggleNewUserForm}
                    className="text-black py-2 px-4 rounded hover:bg-green-400 hover:text-white"
                >
                    {showNewUserForm ? null : "Add User to Account"}
                </button>
                {showNewUserForm && (
                    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-4 fade-in">
                        <h2 className="text-xl font-semibold mb-4 text-center">Add Additional User</h2>
                        <form onSubmit={submitNewUserForm}>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">First Name: </label>
                                    <input
                                        name="first_name"
                                        type="text"
                                        value={newUserFormState.first_name}
                                        onChange={handleNewUserFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">Last Name: </label>
                                    <input
                                        name="last_name"
                                        type="text"
                                        value={newUserFormState.last_name}
                                        onChange={handleNewUserFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">Email: </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={newUserFormState.email}
                                        onChange={handleNewUserFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">Location: </label>
                                    <input
                                        name="location"
                                        type="text"
                                        value={newUserFormState.location}
                                        onChange={handleNewUserFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700">Password: </label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={newUserFormState.password}
                                        onChange={handleNewUserFormChange}
                                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <button type="submit" className="w-full mt-4 text-black py-2 rounded hover:bg-blue-400 hover:text-white">
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                <button
                    onClick={toggleNewUserForm}
                    className="text-black py-2 px-4 mt-4 rounded hover:bg-green-400 hover:text-white"
                >
                    {showNewUserForm ? "Cancel" : null}
                </button>
            </div>
        </div>
    );
}
