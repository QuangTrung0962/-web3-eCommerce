import Layout from '../components/Layout';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { CONTRACT_STORE_ADDRESS } from '../constants/constant';
import { bigNumberToString, numberWithCommas } from '../constants/constant';

export default function OrdersPage() {
    const { contract } = useContract(CONTRACT_STORE_ADDRESS);

    const { data: orders } = useContractRead(contract, 'getAllOrders');
    const reversedOrders = orders ? [...orders].reverse() : [];

    return (
        <Layout>
            <h1>Đơn hàng</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Ngày mua</th>
                        <th>Thông tin khách hàng</th>
                        <th>Sản phẩm</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {reversedOrders &&
                        reversedOrders.map((order) => (
                            <tr>
                                <td>{order.timestamp}</td>
                                <td>
                                    {order.name} {order.email} <br />
                                    {order.details}, {order.ward}, {order.district},{' '}
                                    {order.province} <br />
                                    SĐT: {order.phoneNumber}
                                </td>
                                <td>
                                    {order.items.map((item) => (
                                        <>
                                            {item.name} x {bigNumberToString(item.quantity)} <br />
                                        </>
                                    ))}
                                </td>
                                <td>{numberWithCommas(bigNumberToString(order.total))}₫</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Layout>
    );
}
