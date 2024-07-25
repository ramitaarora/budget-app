import { useState, useEffect } from 'react';
import AddCategory from './add-category';

interface CategoriesProps {
    fullDate: string;
}

export default function Categories({ fullDate }: CategoriesProps) {
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [parentCategory, setParentCategory] = useState<any[]>([]);
    const [childCategory, setChildCategory] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisibility, setModalVisibility] = useState<string>('hidden');

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
                    const response = await fetch(`/api/expenses?date=${fullDate}`, {
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

    const openModal = () => {
        setModalVisibility('visible');
    }

    return (
        <section id="categories">
            <AddCategory modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />
            <div className="card-header">
                <h2>Categories</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openModal}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
            </div>
            {categoryData.length && expensesData.length ? (
                <div>
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