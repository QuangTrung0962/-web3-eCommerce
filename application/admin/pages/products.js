import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '../constants/constant.js';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';

export default function Products() {
    const [products, setProducts] = useState();
    //Async func for get All Products
    async function getAllProducts() {
        const sdk = new ThirdwebSDK('mumbai');
        const contract = await sdk.getContract(CONTRACT_ADDRESS);
        const result = await contract.call('getAllProducts');
        setProducts(result);
    }

    //UseEffect for call async function
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={'/products/new'}>
                Thêm sản phẩm
            </Link>
            {products && (
                <table className="basic mt-2">
                    <thead>
                        <tr>
                            <td>Tên sản phẩm</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((product) => (
                                <tr>
                                    <td>{product.productName?.toString()}</td>
                                    <td>
                                        <Link href={'/products/edit/' + product.id}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                            </svg>
                                            Sửa
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}
