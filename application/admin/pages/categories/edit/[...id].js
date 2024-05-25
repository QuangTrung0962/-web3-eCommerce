import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import Layout from '../../../components/Layout';
import CategoryForm from '../../../components/CategoryForm';
import { CONTRACT_CATEGORY_ADDRESS, SDK } from '../../../constants/constant';

export default function EditCategoryPage() {
    const router = useRouter();
    const { id } = router.query;
    const { contract } = useContract(CONTRACT_CATEGORY_ADDRESS);
    const { mutateAsync: editCategory } = useContractWrite(contract, 'editCategory');
    const [category, setCategory] = useState();

    useEffect(() => {
        getCategoryById();
    }, [id]);

    async function getCategoryById() {
        const contract = await SDK.getContract(CONTRACT_CATEGORY_ADDRESS);
        const result = await contract.call('getCategoryById', id);
        setCategory(result);
    }

    return (
        <Layout>
            {category && (
                <>
                    <h1>Cập nhật sản phẩm</h1>
                    <CategoryForm
                        _id={id}
                        title={category.categoryName}
                        logo={category.logo}
                        func={editCategory}
                    />
                </>
            )}
        </Layout>
    );
}
