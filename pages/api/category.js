import Category from '../../models/Category';

export default async function category(req, res) {
    switch (req.method) {
        case 'GET':
            return getCategories(req, res);
        case 'POST':
            return createCategory(req, res);
        case 'PUT':
            return updateCategory(req, res);
        case 'DELETE':
            return deleteCategory(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export async function getCategories(req, res) {
    const { id } = req.query;
    if (id) {
        try {
            const category = await Category.findByPk(id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: 'Category not found.' });
            }
        } catch (error) {
            console.error('Failed to fetch category:', error);
            res.status(500).json({ message: 'Failed to retrieve category.' });
        }
    } else {
        try {
            const categories = await Category.findAll();
            if (categories) {
                res.status(200).json(categories);
            } else {
                res.status(404).json({ message: 'Categories not found.' })
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            res.status(500).json({ message: 'Failed to retrieve categories.' });
        }
    }
}

export async function createCategory(req, res) {
    try {
        const newCategory = await Category.create({
            name: req.body.name,
            parent_category: req.body.parent_category,
            color: req.body.color,
            flexible: req.body.flexible,
            budget: req.body.budget,
            account_id: req.body.account_id
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Failed to create category:', error);
        res.status(500).json({ message: 'Failed to create category.' });
    }
}

export async function updateCategory(req, res) {
    try {
        const { id } = req.query;
        const updateData = req.body;
        const result = await Category.update(updateData, {
            where: { id: id }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to update category:', error);
        res.status(500).json({ message: 'Failed to update category.' });
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.query;
        const result = await Category.destroy({
            where: { id: id }
        });
        if (result > 0) {
            res.status(204).json({ message: 'Successfully deleted.' });
        } else {
            res.status(404).json({ message: 'Category not found.' });
        }
    } catch (error) {
        console.error('Failed to delete category:', error);
        res.status(500).json({ message: 'Failed to delete category.' });
    }
}