import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ConnectWallet, useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import { CONTRACT_AUTH_ADDRESS } from '../constants/constant';
import { toast } from 'react-toastify';
import BasicTabs from '../components/AdminTabs';

export default function Home() {
    const address = useAddress();
    const router = useRouter();
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (address === undefined) {
            router.push('/');
        }
    }, [address]);

    const getAllUser = async () => {};

    return (
        <Layout>
            <div className="text-blue-900 flex flex-wrap justify-between">
                <h2>
                    Admin <b>{address}</b>{' '}
                </h2>
                <ConnectWallet
                    theme={'light'}
                    modalSize={'wide'}
                    modalTitleIconUrl={''}
                    showThirdwebBranding={false}
                />
            </div>
            <BasicTabs user={user} getUser={getAllUser} />
        </Layout>
    );
}
