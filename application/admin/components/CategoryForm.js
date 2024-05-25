import { useEffect, useState } from 'react';
import { Web3Button, useStorageUpload } from '@thirdweb-dev/react';
import { CONTRACT_PRODUCT_ADDRESS, SDK, CONTRACT_CATEGORY_ADDRESS } from '../constants/constant';
import { useRouter } from 'next/router.js';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';
import { toast } from 'react-toastify';

export default function CategoryForm({ func, title: existingTitle, _id, logo: existingLogo }) {
    const [title, setTitle] = useState(existingTitle || '');
    const [logo, setLogo] = useState(existingLogo || '');
    const [isUploading, setIsUploading] = useState(false);
    const { mutateAsync: uploadImageFunc } = useStorageUpload();
    const router = useRouter();

    let parameter = [];
    if (_id) {
        parameter = [parseInt(_id), title, logo];
    } else {
        parameter = [title, logo];
    }

    useEffect(() => {}, []);

    //Upload product images to IPFS
    async function uploadImgToIpfs(ev) {
        let imgData = ev.target.files ? ev.target.files[0] : null;
        if (imgData != null) setIsUploading(true);

        const uploadUrl = await uploadImageFunc({
            data: [imgData],
            options: {
                uploadWithGatewayUrl: true,
                uploadWithoutDirectory: true,
            },
        });
        setLogo(uploadUrl[0]);
        setIsUploading(false);
    }

    const handleSaveCategory = async () => {
        if (!title || !logo) {
            toast.error('Hãy điền tất cả các trường', {
                autoClose: 500,
                theme: 'colored',
            });
        } else {
            await func({ args: parameter });
            toast.success('Thành công', {
                autoClose: 500,
                theme: 'colored',
            });
            router.push('/categories');
        }
    };

    return (
        <>
            <label>Tên danh mục</label>
            <input
                type="text"
                placeholder="Tên danh mục"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <label>Logo danh mục</label>
            <div className="mb-2 flex flex-wrap gap-1">
                {logo && (
                    <div className="h-24 shadow-sm rounded-sm border border-gray-200">
                        <img src={logo} alt="image" className="rounded-lg" />
                    </div>
                )}

                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                        />
                    </svg>
                    <div>Tải lên</div>
                    <input type="file" className="hidden" onChange={uploadImgToIpfs} />
                </label>
            </div>

            <div className="flex gap-2">
                <Web3Button
                    className="btn-primary"
                    contractAddress={CONTRACT_CATEGORY_ADDRESS}
                    action={handleSaveCategory}
                >
                    Lưu danh mục
                </Web3Button>
                <Web3Button
                    className="btn-default"
                    contractAddress={CONTRACT_CATEGORY_ADDRESS}
                    action={() => {
                        router.push('/categories');
                    }}
                >
                    Thoát
                </Web3Button>
            </div>
        </>
    );
}
