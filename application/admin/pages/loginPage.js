import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import {
    useAddress,
    ConnectEmbed,
    useShowConnectEmbed,
    lightTheme,
    useContract,
} from '@thirdweb-dev/react';
import { CONTRACT_AUTH_ADDRESS, SDK } from '../constants/constant';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router.js';

const customTheme = lightTheme({
    colors: {
        accentText: '#00e6a1',
        primaryText: '#261717',
        accentButtonBg: '#00e6a1',
        modalBg: '#fcfcfd',
        dropdownBg: '#fcfcfd',
    },
});

export default function LoginPage() {
    const address = useAddress();
    const router = useRouter();

    //let showConnectEmbed = useShowConnectEmbed();

    useEffect(() => {
        // Kiểm tra trạng thái thông báo sau khi trang được tải lại
        const loginError = sessionStorage.getItem('loginError');
        if (loginError) {
            // Hiển thị thông báo lỗi
            toast.error('Ban không phải là admin', {
                autoClose: 500,
                theme: 'colored',
                onClose: () => {
                    sessionStorage.removeItem('loginError');
                },
            });
        }
    }, []);

    useEffect(() => {
        if (address !== undefined) {
            getAdmin(address.toString());
        }
    }, [address]);

    async function getAdmin(address) {
        const contract = await SDK.getContract(CONTRACT_AUTH_ADDRESS);
        const result = await contract.call('findAdmin', [address]);
        if (result) {
            await router.push('/home');
            toast.success('Đăng nhập thành công', {
                autoClose: 500,
                theme: 'colored',
            });
        } else {
            // Lưu trạng thái thông báo vào localStorage
            sessionStorage.setItem('loginError', 'true');
            // Reload trang
            window.location.reload();
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <img
                src="https://readymadeui.com/signin-image.webp"
                style={{
                    width: '50%',
                    height: '100vh',
                    backgroundColor: 'royalblue',
                }}
            ></img>
            <div
                style={{
                    width: '50%',
                    height: '100vh',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1 className="titel-Login">Login</h1>
                <ConnectEmbed
                    style={{ border: 'none' }}
                    showThirdwebBranding={false}
                    theme={customTheme}
                    auth={{
                        loginOptional: true,
                    }}
                />
            </div>
        </div>
    );
}
