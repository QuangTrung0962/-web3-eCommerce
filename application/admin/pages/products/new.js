import Layout from '../../components/Layout';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACT_PRODUCT_ADDRESS } from '../../constants/constant.js';
import ProductForm from '../../components/ProductForm.js';

export default function NewProduct() {
    const { contract } = useContract(CONTRACT_PRODUCT_ADDRESS);

    const { mutateAsync: addProductFunc } = useContractWrite(contract, 'addProduct');

    return (
        <Layout>
            <h1>Thên sản phẩm</h1>
            <ProductForm func={addProductFunc} />
        </Layout>
    );
}
