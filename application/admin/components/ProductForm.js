import { useEffect, useState } from 'react';
import { Web3Button, useStorageUpload } from '@thirdweb-dev/react';
import { CONTRACT_PRODUCT_ADDRESS, SDK, CONTRACT_CATEGORY_ADDRESS } from '../constants/constant';
import { useRouter } from 'next/router.js';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';
import { toast } from 'react-toastify';

export default function ProductForm({
    func,
    title: existingTitle,
    description: existingDesc,
    price: existingPrice,
    _id,
    images: existingImages,
    categoryId: assignedCategoryId,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDesc || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCatergories] = useState([]);
    const [categoryId, setCategoryId] = useState(assignedCategoryId || '1');
    const [category, setCategory] = useState();
    const { mutateAsync: uploadImageFunc } = useStorageUpload();
    const router = useRouter();

    let parameter = [];
    if (_id) {
        parameter = [parseInt(_id), title, description, price, images, parseInt(categoryId)];
    } else {
        parameter = [title, description, price, images, parseInt(categoryId)];
    }

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
        setImages((oldImage) => {
            return [...oldImage, ...uploadUrl];
        });
        setIsUploading(false);
    }

    function updateImageOrder(images) {
        setImages(images);
    }

    //Get Catergories
    async function getAllCategories() {
        const contract = await SDK.getContract(CONTRACT_CATEGORY_ADDRESS);
        const result = await contract.call('getAllCategories');
        setCatergories(result);
    }

    //Get Catergory by Id
    async function getCategoryById(id) {
        const contract = await SDK.getContract(CONTRACT_CATEGORY_ADDRESS);
        //Truyen vo string khi call read function
        const result = await contract.call('getCategoryById', id);
        setCategory(result);
    }

    const handleSaveProduct = async () => {
        if (!title || !description || !price || !images) {
            toast.error('Hãy điền tất cả các trường', {
                autoClose: 500,
                theme: 'colored',
            });
        } else {
            await func({ args: parameter });
            toast.success('Thêm sản phẩm thành công', {
                autoClose: 500,
                theme: 'colored',
            });
            router.push('/products');
        }
    };

    useEffect(() => {
        getCategoryById(categoryId.toString());
        getAllCategories();
    }, []);

    return (
        <>
            <label>Tên sản phẩm</label>
            <input
                type="text"
                placeholder="Tên sản phẩm"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <label>Danh mục</label>
            <select
                value={categoryId}
                onChange={(ev) => {
                    setCategoryId(ev.target.value);
                    getCategoryById(ev.target.value);
                }}
            >
                {categories.length > 0 &&
                    categories.map((c) => <option value={c.id}>{c.categoryName}</option>)}
            </select>

            <label>Hình ảnh sản phẩm</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable
                    list={images}
                    setList={updateImageOrder}
                    className="flex flex-wrap gap-1"
                >
                    {!!images?.length &&
                        images.map((link) => (
                            <div
                                key={link}
                                className="h-24 shadow-sm rounded-sm border border-gray-200"
                            >
                                <img src={link} alt="image" className="rounded-lg" />
                            </div>
                        ))}
                </ReactSortable>
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
            <label>Mô tả sản phẩm</label>
            <textarea
                placeholder="Mô tả chi tiết sản phẩm"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
            ></textarea>
            <label>Giá sản phẩm (VND)</label>
            <input
                type="number"
                placeholder="Giá sản phẩm"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
            />
            <div className="flex gap-2">
                <Web3Button
                    className="btn-primary"
                    contractAddress={CONTRACT_PRODUCT_ADDRESS}
                    action={handleSaveProduct}
                >
                    Lưu sản phẩm
                </Web3Button>
                <Web3Button
                    className="btn-default"
                    contractAddress={CONTRACT_PRODUCT_ADDRESS}
                    action={() => {
                        router.push('/products');
                    }}
                >
                    Thoát
                </Web3Button>
            </div>
        </>
    );
}
