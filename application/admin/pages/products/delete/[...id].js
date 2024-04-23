import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import { CONTRACT_PRODUCT_ADDRESS, SDK } from '../../../constants/constant';
import { useContract, useContractWrite, Web3Button } from '@thirdweb-dev/react';

export default function DeleteProductPage() {
    const { contract } = useContract(CONTRACT_PRODUCT_ADDRESS);
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const { id } = router.query;
    function goBack() {
        router.push('/products');
    }

    //Call getProductById function
    async function getProductById() {
        const contract = await SDK.getContract(CONTRACT_PRODUCT_ADDRESS);
        const result = await contract.call('getProductById', id);
        setProductInfo(result);
    }

    //Call deleteProduct function
    const { mutateAsync: deleteProduct } = useContractWrite(contract, 'deleteProduct');

    const handleDeleteProduct = async () => {
        // Thực hiện hành động của func
        await deleteProduct({ args: [parseInt(id)] });

        router.push('/products');
    };

    useEffect(() => {
        getProductById();
    }, [id]);

    return (
        <Layout>
            {productInfo && (
                <>
                    <h1 className="text-center">
                        Bạn có muốn xóa sản phẩm: "{productInfo?.productName}" ?
                    </h1>
                    <div className="flex gap-2 justify-center">
                        <Web3Button
                            className="btn-red"
                            contractAddress={CONTRACT_PRODUCT_ADDRESS}
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
