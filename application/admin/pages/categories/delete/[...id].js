import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import { CONTRACT_CATEGORY_ADDRESS, SDK } from '../../../constants/constant';
import { useContract, useContractWrite, Web3Button } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';

export default function DeleteProductPage() {
    const { contract } = useContract(CONTRACT_CATEGORY_ADDRESS);
    const router = useRouter();
    const [categoryInfo, setCategoryInfo] = useState();
    const { id } = router.query;

    function goBack() {
        router.push('/categories');
    }

    const { mutateAsync: deleteCategory } = useContractWrite(contract, 'deleteCategory');

    async function getCategoryById() {
        const contract = await SDK.getContract(CONTRACT_CATEGORY_ADDRESS);
        const result = await contract.call('getCategoryById', id);
        setCategoryInfo(result);
    }

    const handleDeleteProduct = async () => {
        // Thực hiện hành động của func
        await deleteCategory({ args: [parseInt(id)] });
        toast.success('Thành công', {
            autoClose: 500,
            theme: 'colored',
        });
        
        router.push('/categories');
    };

    useEffect(() => {
        getCategoryById();
    }, [id]);

    return (
        <Layout>
            {categoryInfo && (
                <>
                    <h1 className="text-center">
                        Bạn có muốn xóa danh mục: "{categoryInfo?.categoryName}" ?
                    </h1>
                    <div className="flex gap-2 justify-center">
                        <Web3Button
                            className="btn-red"
                            contractAddress={CONTRACT_CATEGORY_ADDRESS}
                            action={handleDeleteProduct}
                        >
                            Có
                        </Web3Button>
                        <button className="btn-default" onClick={goBack}>
                            Không
                        </button>
                    </div>
                </>
            )}
        </Layout>
    );
}
