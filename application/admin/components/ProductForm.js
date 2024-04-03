import { useState } from 'react';
import { useContract, useContractRead, useContractWrite, Web3Button } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from '../../constants/address.js';
import { useRouter } from 'next/router.js';

export default function ProductForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [goToProduct, setGoToProduct] = useState('');
    const { contract } = useContract(CONTRACT_ADDRESS);
    const router = useRouter();

    const {
        mutateAsync: addProductFunc,
        isLoading: loadAddProduct,
        error: addProductError,
    } = useContractWrite(contract, 'addProduct');

    function createProduct() {}

    // if (goToProduct) {
    //   Router.push("/product");
    // }

    return (
        <>
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
        </>
    );
}
