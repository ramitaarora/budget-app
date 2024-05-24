import { useState, useEffect } from 'react';
import { Category, categoryData } from '../frontend-test-data/categories';
import { budgetData } from '../frontend-test-data/budget';
import { expensesData } from '../frontend-test-data/expenses';

export default function Categories() {
    const [parentCategory, setParentCategory] = useState<Category[]>([]);
    const [childCategory, setChildCategory] = useState<Category[]>([]);

    useEffect(() => {
        const parentCategories = categoryData.filter((category) => category.parent_id === null);
        const childCategories = categoryData.filter((category) => category.parent_id !== null);

        setParentCategory(parentCategories);
        setChildCategory(childCategories);
        console.log(expensesData);
    }, [categoryData])

    const getChildExpenses = (inputID: number) => {
        let total: number = 0;

        for (let i = 0; i < expensesData.length; i++) {
            if (expensesData[i].category_id === inputID) {
                total += expensesData[i].amount;
            }
        }
        return total;
    }

    const getParentExpenses = (inputID: number) => {
        let total: number = 0;
        const allCategories = categoryData.filter((category) => category.id === inputID || category.parent_id === inputID);
        

        for (let i = 0; i < expensesData.length; i++) {       
            for (let j = 0; j < allCategories.length; j++) {
                if (expensesData[i].category_id === allCategories[j].id) {
                    total += expensesData[i].amount;
                }
            }
        }

        return total;
    }

    return (
        <section id="categories">
            <h2 className="text-center">Categories</h2>
            {parentCategory.length ? parentCategory.map((parentItem, parentIndex) => (
                <div key={parentIndex}>
                    <div className="flex w-100 justify-between items-center">
                        <p className="font-bold mr-5">{parentItem.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-900 h-2.5 rounded-full" style={{ "width": `${(getParentExpenses(parentItem.id) / parentItem.budget_amount) * 100}%` }}></div>
                        </div>
                    </div>
                    {childCategory
                        .filter((childItem) => childItem.parent_id === parentItem.id)
                        .map((filteredChildCategory, childIndex) => (
                            <div key={childIndex} className="ml-3 flex w-100 justify-between items-center">
                                <p className="mr-5">{filteredChildCategory.name}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ "width": `${(getChildExpenses(filteredChildCategory.id) / filteredChildCategory.budget_amount) * 100}%` }}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )) : null}
        </section>
    );
}