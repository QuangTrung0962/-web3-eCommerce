import { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { CONTRACT_AUTH_ADDRESS } from '../constants/constant';
import { Web3Button, useContract, useContractRead } from '@thirdweb-dev/react';

export default function Admins() {
    const [admin, setAdmin] = useState('');
    const { contract } = useContract(CONTRACT_AUTH_ADDRESS);
    const { data: admins } = useContractRead(contract, 'getAllAdmins');

    async function adAdmin(contract) {
        try {
            await contract.call('addAdmin', [admin]);
            toast.success('Thêm admin thành công', {
                autoClose: 500,
                theme: 'colored',
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <h1>Tài khoản</h1>
            <h1>Thêm mới admin</h1>

            <div className="flex gap-1 justify-stretch">
                <input
                    type="text"
                    placeholder="Số tài khoản"
                    onChange={(ev) => setAdmin(ev.target.value)}
                    value={admin}
                    style={{ width: '80%', marginRight: '20px' }}
                />

                <Web3Button
                    className="btn-primary"
                    contractAddress={CONTRACT_AUTH_ADDRESS}
                    action={(contract) => adAdmin(contract)}
                    style={{ height: '40px', width: '130px' }}
                >
                    Thêm admin
                </Web3Button>
            </div>

            <h1>Các tài khoản admin</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Tài khoản Admin</th>
                        <th style={{ textAlign: 'left' }}>Ngày tạo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {admins &&
                        admins.map((item) => (
                            <tr>
                                <td>{item.admin}</td>
                                <td>25/5/2024</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Layout>
    );
}
