import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACT_CATEGORY_ADDRESS } from '../../constants/constant';
import CategoryForm from '../../components/CategoryForm';
import Layout from '../../components/Layout';

export default function NewProduct() {
    const { contract } = useContract(CONTRACT_CATEGORY_ADDRESS);

    const { mutateAsync: addCategory } = useContractWrite(contract, 'addCategory');

    return (
        <Layout>
            <h1>Thên danh mục</h1>
            <CategoryForm func={addCategory} />
        </Layout>
    );
}
