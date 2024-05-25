import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ConnectWallet, useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import { CONTRACT_AUTH_ADDRESS } from '../constants/constant';
import { toast } from 'react-toastify';

export default function Home() {
    const address = useAddress();
    const router = useRouter();

    const { contract } = useContract(CONTRACT_AUTH_ADDRESS);
    const {
        data: account,
        isLoading,
        isError,
    } = useContractRead(contract, 'getAdminByAddress', [address]);

    console.log(isError);
    useEffect(() => {
        if (isError == false) {
        } else {
            console.log('velog');
            router.push('/');
        }
    }, [isError]);

    // useEffect(() => {
    //     if (address === undefined) {
    //         router.push('/');
    //     }
    // }, [address]);

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
        </Layout>
    );
}
