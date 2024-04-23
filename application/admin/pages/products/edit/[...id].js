import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACT_PRODUCT_ADDRESS, SDK } from '../../../constants/constant';
import ProductForm from '../../../components/ProductForm';

export default function EditProductPage() {
    const [product, setProduct] = useState();
    const router = useRouter();
    const { id } = router.query;
    const { contract } = useContract(CONTRACT_PRODUCT_ADDRESS);
    const { mutateAsync: editProductFunc } = useContractWrite(contract, 'editProduct');

    async function getProductById() {
        const contract = await SDK.getContract(CONTRACT_PRODUCT_ADDRESS);
        const result = await contract.call('getProductById', id);
        setProduct(result);
    }

    useEffect(() => {
        getProductById();
    }, [id]);

    return (
        <Layout>
            {product && (
                <>
                    <h1>Cập nhật sản phẩm</h1>
                    <ProductForm
                        _id={id}
                        title={product.productName}
                        description={product.description}
                        price={product.price.toString()}
                        images={product.images}
                        catergoryId={product.catergoryId}
                        color={product.property.color}
                        memoryStore={product.property.memoryStore}
                        func={editProductFunc}
                    />
                </>
            )}
        </Layout>
    );
}
