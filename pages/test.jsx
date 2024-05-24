import AddCategory from '../components/add-category';
import AddExpense from '../components/add-expense';
import UpdateCategory from '../components/update-category';
// import { authenticate } from '../middleware/auth';

// export async function getServerSideProps(context) {
//     const result = await authenticate(context.req);
//     if (result.redirect) {
//         return result;
//     }

//     console.log(result);
    
//     return {
//         props: { result }
//     }
// }

export default function Test() {

    return (
        <div>
            <div>-- Add Category --</div>
            <AddCategory />
            <br />
            <div>-- Add Expense --</div>
            <AddExpense />
            <br />
            <div>-- Update Category --</div>
            <UpdateCategory />
            <br />
        </div>
    )
}