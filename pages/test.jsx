import AddCategory from '../components/add-category';
import { authenticate } from '../middleware/auth';

export async function getServerSideProps(context) {
    const result = await authenticate(context.req);
    if (result.redirect) {
        return result;
    }

    console.log(result);
    
    return {
        props: { result }
    }
}

export default function Test({ result }) {

    const user = result.props.user;

    return (
        <div>
            <AddCategory accountID={user.account_id} />
        </div>
    )
}