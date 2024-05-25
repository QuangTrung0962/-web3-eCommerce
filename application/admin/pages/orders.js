import Layout from '../components/Layout';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { CONTRACT_AUTH_ADDRESS, CONTRACT_ORDER_ADDRESS } from '../constants/constant';
import { bigNumberToString, numberWithCommas } from '../constants/constant';
import Link from 'next/link';

export default function OrdersPage() {
    const { contract } = useContract(CONTRACT_ORDER_ADDRESS);
    const { contract: contractUser } = useContract(CONTRACT_AUTH_ADDRESS);

    const { data: orders } = useContractRead(contract, 'getAllOrders');
    const { data: users } = useContractRead(contractUser, 'getAllUser');
    //const reversedOrders = orders ? [...orders].reverse() : [];

    const combinedData = orders?.map((order) => {
        const item = users?.find((q) => q.user === order.user);
        return {
            timestamp: order.timestamp,
            user: item,
            products: order.items,
            total: order.total,
        };
    });

    return (
        <Layout>
            <h1>Đơn hàng</h1>
            <table className="basic orderTable">
                <thead>
                    <tr>
                        <th>Ngày mua</th>
                        <th>Thông tin khách hàng</th>
                        <th>Sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {combinedData &&
                        combinedData.map(
                            (p) =>
                                p.timestamp != '' && (
                                    <tr>
                                        <td>{p.timestamp}</td>
                                        <td>
                                            {p.user.firstName} {p.user.email} <br />
                                            {p.user.province}, {p.user.district}, {p.user.ward}
                                            {p.user.details}
                                            <br />
                                            SĐT: {p.user.phoneNumber}
                                        </td>
                                        <td>
                                            {p.products.map((item) => (
                                                <>
                                                    {item.name} x {bigNumberToString(item.quantity)}{' '}
                                                    <br />
                                                </>
                                            ))}
                                        </td>
                                        <td>{numberWithCommas(bigNumberToString(p.total))}₫</td>
                                        <td>
                                            <Link className="btn-red" href={'/'}>
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
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                    />
                                                </svg>
                                                Hủy
                                            </Link>
                                        </td>
                                    </tr>
                                )
                        )}
                </tbody>
            </table>
        </Layout>
    );
}
