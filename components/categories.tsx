import { useState, useEffect } from 'react';

interface Category {
    id: number,
    name: string,
    parent_id: number | null,
    color: string,
    flexible: boolean,
    budget_amount: number,
    date: string,
    account_id: number,
}

interface Budget {
    id: number,
    account_id: number,
    amount: number,
    date: string,
    savings_goal: number,
}

const categoryData: Category[] = [
    {
        id: 1,
        name: "Food",
        parent_id: null,
        color: "blue",
        flexible: true,
        budget_amount: 1000,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 2,
        name: "Groceries",
        parent_id: 1,
        color: "blue",
        flexible: true,
        budget_amount: 600,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 3,
        name: "Restaurants",
        parent_id: 1,
        color: "blue",
        flexible: true,
        budget_amount: 400,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 4,
        name: "Rent",
        parent_id: null,
        color: "red",
        flexible: false,
        budget_amount: 2500,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 5,
        name: "Bills",
        parent_id: null,
        color: "green",
        flexible: true,
        budget_amount: 500,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 6,
        name: "Phone",
        parent_id: 5,
        color: "green",
        flexible: true,
        budget_amount: 100,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 7,
        name: "Water/Electricity",
        parent_id: 5,
        color: "green",
        flexible: true,
        budget_amount: 200,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 8,
        name: "Gas",
        parent_id: 5,
        color: "green",
        flexible: true,
        budget_amount: 30,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 9,
        name: "Transportation",
        parent_id: null,
        color: "yellow",
        flexible: true,
        budget_amount: 700,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 10,
        name: "Gas",
        parent_id: 9,
        color: "yellow",
        flexible: true,
        budget_amount: 300,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 11,
        name: "Car Payment",
        parent_id: 9,
        color: "yellow",
        flexible: true,
        budget_amount: 400,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 12,
        name: "Necessities",
        parent_id: null,
        color: "pink",
        flexible: true,
        budget_amount: 500,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 13,
        name: "Entertainment",
        parent_id: null,
        color: "black",
        flexible: true,
        budget_amount: 100,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 14,
        name: "Holidays/Gifts",
        parent_id: null,
        color: "orange",
        flexible: true,
        budget_amount: 300,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 15,
        name: "Medical",
        parent_id: null,
        color: "pink",
        flexible: true,
        budget_amount: 100,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 16,
        name: "Misc",
        parent_id: null,
        color: "purple",
        flexible: true,
        budget_amount: 100,
        date: "05-2024",
        account_id: 1
    }
]

const budgetData: Budget[] = [
    {
        id: 1,
        account_id: 1,
        amount: 6000,
        date: "05-2024",
        savings_goal: 200,
    }
]

export default function Categories() {
    const [parentCategory, setParentCategory] = useState<Category[]>([]);
    const [childCategory, setChildCategory] = useState<Category[]>([]);
    const [totalBudget, setTotalBudget] = useState<number>(0);

    useEffect(() => {
        setTotalBudget(0);
        const parentCategories = categoryData.filter((category) => category.parent_id === null);
        const childCategories = categoryData.filter((category) => category.parent_id !== null);
        const budgetAmount = categoryData.forEach((category) => {
            if (category.parent_id === null) {
                setTotalBudget((pre) => pre + category.budget_amount);
            }
        })

        setParentCategory(parentCategories);
        setChildCategory(childCategories);
    }, [categoryData])

    return (
        <section id="categories">
            <h2 className="text-center">Categories</h2>
            {parentCategory.length ? parentCategory.map((parentItem, parentIndex) => (
                <div key={parentIndex}>
                    <div className="flex w-100 justify-between items-center">
                        <p className="font-bold mr-5">{parentItem.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-900 h-2.5 rounded-full" style={{ "width": `${(parentItem.budget_amount/totalBudget) * 100}%` }}></div>
                        </div>
                    </div>
                    {childCategory
                        .filter((childItem) => childItem.parent_id === parentItem.id)
                        .map((filteredChildItem, childIndex) => (
                            <div key={childIndex} className="ml-3 flex w-100 justify-between items-center">
                                <p className="mr-5">{filteredChildItem.name}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ "width": `${(filteredChildItem.budget_amount / parentItem.budget_amount) * 100}%` }}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )) : null}
        </section>
    );
}