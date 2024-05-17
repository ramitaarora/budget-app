import AddCategory from '../components/add-category';
import AddExpense from '../components/add-expense';
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
            <AddCategory />
            <br />
            <AddExpense />
            <br />
        </div>
    )
}