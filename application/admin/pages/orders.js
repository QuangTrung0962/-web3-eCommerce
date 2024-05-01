import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {}, []);

    return (
        <Layout>
            <h1>Đơn hàng</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Ngày mua</th>
                        <th>Địa chỉ</th>
                        <th>Sản phẩm</th>
                        <th>Giá tiền</th>
                        <th>Thanh toán</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </Layout>
    );
}
