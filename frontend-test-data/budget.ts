export interface Budget {
    id: number,
    account_id: number,
    amount: number,
    date: string,
    savings_goal: number,
}

export const budgetData: Budget[] = [
    {
        id: 1,
        account_id: 1,
        amount: 6000,
        date: "05-2024",
        savings_goal: 200,
    }
]