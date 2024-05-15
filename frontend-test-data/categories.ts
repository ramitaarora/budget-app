export interface Category {
    id: number,
    name: string,
    parent_id: number | null,
    color: string,
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