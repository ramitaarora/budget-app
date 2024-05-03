import { useState } from 'react';
import { authenticate } from '../middleware/auth';

export async function getServerSideProps(context) {
    return authenticate(context.req)
}

// export async function getServerSideProps(context) {
//     const result = await authenticate(context.req);
//     if (result.redirect) {
//         return result;
//     }
//     return {
//         props: {
//             user: result
//         }
//     }
// }

export default function AddCategory({ user }) {

    // Get account_id from logged in user's token
    console.log(user);

    const [formState, setFormState] = useState({ name: '', parent_category: '', color: '', flexible: false, account_id: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const { name, parent_category, color, flexible, account_id } = formState;

        const res = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, parent_category, color, flexible, account_id })
        });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <p>Add Category</p>
                <div>
                    <input
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Parent Category"
                        name="parent_category"
                        type="number"
                        value={formState.parent_category}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Color"
                        name="color"
                        type="text"
                        value={formState.color}
                        onChange={handleChange}
                    />
                    <label>
                        Flexible:
                        <input
                            name="flexible"
                            type="checkbox"
                            value={formState.flexible}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}