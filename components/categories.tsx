import { useState, useEffect } from 'react';
import AddCategory from './add-category';
import EditCategory from './edit-category';
import { resolveObjectURL } from 'buffer';

interface CategoriesProps {
    month: number,
    year: number,
}

export default function Categories({ month, year }: CategoriesProps) {
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [expensesData, setExpensesData] = useState<any[]>([]);
    const [budgetData, setBudgetData] = useState<any[]>([]);
    const [parentCategory, setParentCategory] = useState<any[]>([]);
    const [childCategory, setChildCategory] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [addModalVisibility, setAddModalVisibility] = useState<string>('hidden');
    const [editModalVisibility, setEditModalVisibility] = useState<string>('hidden');
    const [editID, setEditID] = useState<any>();

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/category?month=${month}&year=${year}`, {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);

                if (data.length) {
                    setCategoryData(data);
                    try {
                        const response = await fetch(`/api/expenses?month=${month}&year=${year}`, {
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
                } else {
                    const response = await fetch(`api/category?recurring=true`, {
                        method: 'GET'
                    });

                    if (response.ok) {
                        const data = await response.json();
                        // console.log(data);
                        
                        if (data.length) {
                            for (let i = 0; i < data.length; i++) {
                                const { name, parent_id, budget } = data[i];
                                try {
                                    const response = await fetch(`api/category`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            name,
                                            parent_id,
                                            budget,
                                            recurring: false,
                                            date: `${year}-${month}-01`
                                        })
                                    })
                                } catch(err) {
                                    console.error(err);
                                }
                            }

                            getData();
                        }
                    }
                }
                
            }
        } catch (err) {
            console.error(err);
        }
    }

    const fetchExpenses = async () => {
        
    }

    useEffect(() => {
        getData();
    }, [month, year])

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

    // const openModal = () => {
    //     setAddModalVisibility('visible');
    // }

    const openModal = async () => {
        try {
            const res = await fetch(`/api/budget?month=${month}&year=${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.ok) {
                const budgetData = await res.json();
                setBudgetData(budgetData);
                setAddModalVisibility('visible');
            } else {
                throw new Error('Failed to fetch budget data');
            }
        } catch (error) {
            console.error('Error fetching budget data:', error);
            alert('Failed to load budget data.');
        }
    };

    const openEditModal = (event: any) => {
        setEditID(event.target.id);
        setEditModalVisibility('visible');
    }

    const deleteCategory = async (event: any) => {
        // console.log(event.target.id);
        try {
            const response = await fetch(`api/category?id=${event.target.id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                getData();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section id="categories">
            <AddCategory addModalVisibility={addModalVisibility} setAddModalVisibility={setAddModalVisibility} getData={getData} budgetData={budgetData} month={month} year={year} />
            <EditCategory editModalVisibility={editModalVisibility} setEditModalVisibility={setEditModalVisibility} editID={editID} categoryData={categoryData} getData={getData} />
            <div className="card-header">
                <h2>Categories</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={openModal}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
            </div>
            {!loading ? (
                categoryData.length ? (
                    <div>
                        {parentCategory.length ? parentCategory.map((parentItem, parentIndex) => (
                            <div key={parentIndex}>
                                <div className="flex w-100 justify-between items-center">
                                    <p className="font-bold mr-5">{parentItem.name}</p>
                                    <div className="w-full flex items-center justify-center">
                                        <p>${getParentExpenses(parentItem.id)}</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                                            <div className="bg-blue-900 h-2.5 rounded-full" style={{ "width": `${ ((getParentExpenses(parentItem.id) / parentItem.budget) * 100) > 100 ? 100 : ((getParentExpenses(parentItem.id) / parentItem.budget) * 100)}%` }}></div>
                                        </div>
                                        <p>${parentItem.budget}</p>
                                        <img src="./edit.svg" alt="edit" onClick={openEditModal} id={parentItem.id} />
                                        <img src="./delete.svg" alt="delete" onClick={deleteCategory} id={parentItem.id} />
                                    </div>
                                </div>
                                {childCategory
                                    .filter((childItem) => childItem.parent_id === parentItem.id)
                                    .map((filteredChildCategory, childIndex) => (
                                        <div key={childIndex} className="ml-3 flex w-100 justify-between items-center">
                                            <p className="mr-5">{filteredChildCategory.name}</p>
                                            <div className="w-full flex items-center justify-center">
                                                <p>${getChildExpenses(filteredChildCategory.id)}</p>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ "width": `${(getChildExpenses(filteredChildCategory.id) / filteredChildCategory.budget) * 100}%` }}></div>
                                                </div>
                                                <p>${filteredChildCategory.budget}</p>
                                                <img src="./edit.svg" alt="edit" onClick={openEditModal} id={filteredChildCategory.id} />
                                                <img src="./delete.svg" alt="delete" onClick={deleteCategory} id={filteredChildCategory.id} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )) : <p>Add categories and expenses to get started!</p>}
                    </div>
                ) : null
            ) : <p>Loading...</p>}
        </section>
    );
}