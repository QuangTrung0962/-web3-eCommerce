import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { CONTRACT_ADDRESS } from '../../../constants/constant';

export default function EditProductPage() {
    const [product, setProduct] = useState();
    const router = useRouter();
    const { id } = router.query;

    async function getProductById() {
        const sdk = new ThirdwebSDK('mumbai');
        const contract = await sdk.getContract(CONTRACT_ADDRESS);
        const result = await contract.call('getProductById', id);
        setProduct(result);
    }

    useEffect(() => {
        getProductById();
    }, [id]);

    return <Layout>{product && <p>{product.productName}</p>}</Layout>;
}
