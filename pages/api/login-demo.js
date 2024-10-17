import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { Category, Expenses, Account, User, Budget, Income } from '../../models';
import parentCategoryData from '../../seeds/parentCategoryData.json';
import childCategoryData from '../../seeds/childCategoryData.json';
import expensesData from '../../seeds/expensesData.json';

export default async function loginDemo(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const email = 'test@example.com';
    const password = 'password12345!';

    try {
        // Reset user data
        const deleteBudget = await Budget.destroy({ where: { account_id: 1 } });
        const deleteIncome = await Income.destroy({ where: { account_id: 1 } });
        const deleteCategories = await Category.destroy({ where: { account_id: 1 } });
        const deleteExpenses = await Expenses.destroy({ where: { account_id: 1 } });

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const todaysDate = `${year}-${month}-${day}`;

        const budget = await Budget.create({
            account_id: 1,
            amount: 6000,
            savings_goal: 1000,
            date: `${year}-${month}-01`
        }, {
            individualHooks: true,
            returning: true,
        })

        const income = await Income.create({
            account_id: 1,
            user_id: 1,
            amount: 12000,
            description: "Job",
            date: todaysDate
        }, {
            individualHooks: true,
            returning: true,
        })

        for (let i = 0; i < parentCategoryData.length; i++) {
            const parentCategories = await Category.create({
                ...parentCategoryData[i],
                date: todaysDate
            }, {
                individualHooks: true,
                returning: true,
            })
        }
        
        for (let i = 0; i < childCategoryData.length; i++) {
            const childCategories = await Category.create({
                ...childCategoryData[i],
                date: todaysDate
            }, {
                individualHooks: true,
                returning: true,
            })
        }

        for (let i = 0; i < expensesData.length; i++) {
            const expenses = await Expenses.create({
                ...expensesData[i],
                date: `${year}-${month}-${Math.floor(Math.random() * 30) + 1}`
            }, {
                individualHooks: true,
                returning: true,
            })
        }

    } catch(err) {
        console.error(err);
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email was not found, please try again.' });
        };

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error checking password." });
            }

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password, please try again.' });
            }

            const token = jwt.sign(
                { user_id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, location: user.location, account_id: user.account_id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600,
                path: '/',
                sameSite: 'strict'
            }));

            res.status(200).json({ message: 'Login successful', userId: user.id });
        });

    } catch (err) {
        res.status(500).json(err);
    }
}