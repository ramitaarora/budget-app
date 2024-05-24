export interface Category {
    id: number,
    name: string,
    parent_id: number | null
    flexible: boolean,
    budget_amount: number,
    date: string,
    account_id: number,
}

export const categoryData: Category[] = [
    {
        id: 1,
        name: "Food",
        parent_id: null,
        flexible: true,
        budget_amount: 1000,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 2,
        name: "Groceries",
        parent_id: 1,
        flexible: true,
        budget_amount: 600,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 3,
        name: "Restaurants",
        parent_id: 1,
        flexible: true,
        budget_amount: 400,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 4,
        name: "Rent",
        parent_id: null,
        flexible: false,
        budget_amount: 2500,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 5,
        name: "Bills",
        parent_id: null,
        flexible: true,
        budget_amount: 500,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 6,
        name: "Transportation",
        parent_id: null,
        flexible: true,
        budget_amount: 700,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 7,
        name: "Gas",
        parent_id: 6,
        flexible: true,
        budget_amount: 300,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 8,
        name: "Car Payment",
        parent_id: 7,
        flexible: true,
        budget_amount: 400,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 9,
        name: "Necessities",
        parent_id: null,
        flexible: true,
        budget_amount: 500,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 10,
        name: "Entertainment",
        parent_id: null,
        flexible: true,
        budget_amount: 100,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 11,
        name: "Holidays/Gifts",
        parent_id: null,
        flexible: true,
        budget_amount: 300,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 12,
        name: "Medical",
        parent_id: null,
        flexible: true,
        budget_amount: 100,
        date: "05-2024",
        account_id: 1
    },
    {
        id: 13,
        name: "Misc",
        parent_id: null,
        flexible: true,
        budget_amount: 100,
        date: "05-2024",
        account_id: 1
    }
]