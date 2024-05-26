import { useState } from 'react';
import Layout from '../components/Layout';
import { CONTRACT_AUTH_ADDRESS } from '../constants/constant';
import { Web3Button, useContract, useContractRead } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

export default function Admins() {
    const [admin, setAdmin] = useState('');
    const { contract } = useContract(CONTRACT_AUTH_ADDRESS);
    const { data: admins } = useContractRead(contract, 'getAllAdmins');

    async function addAdmin(contract) {
        try {
            const currentTime = new Date();
            const formattedTime = format(currentTime, 'dd/MM/yyyy HH:mm:ss');
            await contract.call('addAdmin', [admin, formattedTime]);
            toast.success('Thêm admin thành công', {
                autoClose: 500,
                theme: 'colored',
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteAdmin(contract, address) {
        try {
            await contract.call('deleteAdmin', [address]);

            toast.success('Xóa admin thành công', {
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
                    action={(contract) => addAdmin(contract)}
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
                        admins.map(
                            (item, index) =>
                                item.time !== '' && (
                                    <tr key={index}>
                                        <td>{item.admin}</td>
                                        <td>{item.time}</td>
                                        <td>
                                            <Web3Button
                                                className="btn-red "
                                                contractAddress={CONTRACT_AUTH_ADDRESS}
                                                action={(contract) =>
                                                    deleteAdmin(contract, item.admin)
                                                }
                                                style={{
                                                    height: '40px',
                                                    width: '80px',
                                                    gap: '5px',
                                                    justifyContent: 'center',
                                                }}
                                            >
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
                                                Xóa
                                            </Web3Button>
                                        </td>
                                    </tr>
                                )
                        )}
                </tbody>
            </table>
        </Layout>
    );
}
