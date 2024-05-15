import { useState, useEffect } from 'react';
import { Category, categoryData } from '../frontend-test-data/categories';
import { Budget, budgetData } from '../frontend-test-data/budget';

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