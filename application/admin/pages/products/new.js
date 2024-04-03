import { useState } from 'react';
import Layout from '../../components/Layout';
import { useContract, useContractWrite, Web3Button } from '@thirdweb-dev/react';
import { useRouter } from 'next/router.js';
import { CONTRACT_ADDRESS } from '../../constants/constant.js';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';

export default function NewProduct() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const { contract } = useContract(CONTRACT_ADDRESS);
    const router = useRouter();

    const { mutateAsync: addProductFunc } = useContractWrite(contract, 'addProduct');

    const toProductsPages = async () => {
        const sdk = new ThirdwebSDK('mumbai');
        const contract = await sdk.getContract(CONTRACT_ADDRESS);
        contract.events.addEventListener('created', (event) => {
            router.push('/products');
        });
    };
    toProductsPages();

    return (
        <Layout>
            <h1>Sản phẩm mới</h1>
            <label>Tên sản phẩm</label>
            <input
                type="text"
                placeholder="Tên sản phẩm"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <label>Mô tả sản phẩm</label>
            <textarea
                placeholder="Mô tả chi tiết sản phẩm"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
            ></textarea>
            <label>Giá sản phẩm</label>
            <input
                type="number"
                placeholder="Giá sản phẩm"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
            />
            <Web3Button
                className="btn-primary"
                contractAddress={CONTRACT_ADDRESS}
                action={() => addProductFunc({ args: [title, description, price] })}
            >
                Lưu sản phẩm
            </Web3Button>
        </Layout>
    );
}
