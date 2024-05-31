import { useState, useEffect } from 'react';

export default function Categories() {
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [parentCategory, setParentCategory] = useState<any[]>([]);
    const [childCategory, setChildCategory] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/category', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setCategoryData(data);
                try {
                    const response = await fetch('/api/expenses', {
                        method: 'GET'
                    });
                    if (response.ok) {
                        const data = await response.json();
                        // console.log(data);
                        setExpensesData(data);
                        setLoading(false);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            console.error(err);
        }


    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const parentCategories = categoryData.filter((category) => category.parent_id === null);
        const childCategories = categoryData.filter((category) => category.parent_id !== null);

        setParentCategory(parentCategories);
        setChildCategory(childCategories);

    }, [categoryData])

    const getChildExpenses = (inputID: number) => {
        let total: number = 0;

        for (let i = 0; i < expensesData.length; i++) {
            if (expensesData[i].category_id === inputID) {
                total += Number(expensesData[i].amount);
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
                    total += Number(expensesData[i].amount);
                }
            }
        }
        return total;
    }

    return (
        <section id="categories">
                {categoryData.length && expensesData.length ? (
                <div>
                    <h2 className="text-center">Categories</h2>
                    {parentCategory.length ? parentCategory.map((parentItem, parentIndex) => (
                        <div key={parentIndex}>
                            <div className="flex w-100 justify-between items-center">
                                <p className="font-bold mr-5">{parentItem.name}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-blue-900 h-2.5 rounded-full" style={{ "width": `${(getParentExpenses(parentItem.id) / parentItem.budget) * 100}%` }}></div>
                                </div>
                            </div>
                            {childCategory
                                .filter((childItem) => childItem.parent_id === parentItem.id)
                                .map((filteredChildCategory, childIndex) => (
                                    <div key={childIndex} className="ml-3 flex w-100 justify-between items-center">
                                        <p className="mr-5">{filteredChildCategory.name}</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ "width": `${(getChildExpenses(filteredChildCategory.id) / filteredChildCategory.budget) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )) : null}
                </div>
                ) : null}
        </section>
    );
}