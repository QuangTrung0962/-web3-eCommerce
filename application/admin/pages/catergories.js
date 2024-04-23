import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Web3Button, useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACT_CATERGOTY_ADDRESS, SDK } from '../constants/constant';

export default function Catergories() {
    const [name, setName] = useState('');
    const [catergories, setCatergories] = useState([]);
    const [parentCatergory, setParentCatergory] = useState('1');
    const [editedCatergory, setEditedCatergory] = useState();
    const [properties, setProperties] = useState(false);
    const [colors, setColors] = useState([]);
    const [memoryStore, setMemoryStore] = useState([]);
    const { contract } = useContract(CONTRACT_CATERGOTY_ADDRESS);

    const { mutateAsync: addCatergoryFunc } = useContractWrite(contract, 'addCatergory');
    const { mutateAsync: deleteCatergoryFunc } = useContractWrite(contract, 'deleteCatergory');
    const { mutateAsync: editCatergoryFunc } = useContractWrite(contract, 'editCatergory');

    //Get parent catergory
    function getParentCatergoryName(id) {
        if (id == 1) return 'Sản phẩm mới';
        else if (id == 2) return 'Sản phẩm cũ';
        else return '';
    }

    async function getAllCatergories() {
        const contract = await SDK.getContract(CONTRACT_CATERGOTY_ADDRESS);
        const result = await contract.call('getAllCatergories');
        setCatergories(result);
    }

    function doEditCatergory(catergory) {
        setEditedCatergory(catergory);
        setName(catergory.catergoryName);
        setParentCatergory(catergory.parentId);
        setProperties(true);
        setColors(catergory.colors);
        setMemoryStore(catergory.memoryStore);
    }

    function addProperty() {
        setProperties(true);
    }

    //Listen to event
    const listenCatergoryEvent = async () => {
        const contract = await SDK.getContract(CONTRACT_CATERGOTY_ADDRESS);
        contract.events.addEventListener('created', () => {
            setName('');
            setProperties(false);
            getAllCatergories();
        });

        contract.events.addEventListener('edited', () => {
            setEditedCatergory(null);
            setName('');
            setParentCatergory('');
            setProperties(false);
            getAllCatergories();
        });

        contract.events.addEventListener('deleted', () => {
            getAllCatergories();
        });
    };

    useEffect(() => {
        listenCatergoryEvent();
    }, [catergories]);

    //First mount
    useEffect(() => {
        getAllCatergories();
    }, []);

    return (
        <Layout>
            <h1>Danh mục sản phẩm</h1>

            <label>
                {editedCatergory
                    ? `Cập nhật danh mục: ${editedCatergory.catergoryName} `
                    : 'Tên danh mục mới'}
            </label>
            <div>
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder="Tên danh mục"
                        onChange={(ev) => setName(ev.target.value)}
                        value={name}
                    />
                    <select
                        value={parentCatergory}
                        onChange={(ev) => setParentCatergory(ev.target.value)}
                    >
                        {/* <option value="">Không có danh mục cha</option> */}
                        <option value="1">Sản phẩm mới</option>
                        <option value="2">Sản phẩm cũ</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Thông số kỹ thuật</label>
                    <button
                        type="button"
                        className="btn-default text-sm min-h-9 mb-2"
                        onClick={addProperty}
                    >
                        Thêm thông số kỹ thuật
                    </button>
                    {properties && (
                        <div className="flex gap-5">
                            <div className="flex gap-1">
                                <div className="min-w-max bg-blue-500 rounded-lg px-4 py-2 text-white">
                                    Màu sắc
                                </div>
                                <input
                                    className="mb-0"
                                    type="text"
                                    value={colors.join(',')}
                                    onChange={(ev) => setColors(ev.target.value.split(','))}
                                    placeholder="Giá trị (ngăn cách bởi ,)"
                                />
                            </div>
                            <div className="flex gap-1 ">
                                <div className="min-w-max bg-blue-500 rounded-lg px-4 py-2 text-white">
                                    Dung lượng(GB)
                                </div>
                                <input
                                    type="text"
                                    className="mb-0"
                                    value={memoryStore.join(',')}
                                    onChange={(ev) => setMemoryStore(ev.target.value.split(','))}
                                    placeholder="Giá trị (ngăn cách bởi ,)"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn-default"
                                onClick={() => {
                                    setProperties(false);
                                }}
                            >
                                Thoát
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex gap-1">
                    <Web3Button
                        className="btn-primary py-1 btn-primary-fix "
                        contractAddress={CONTRACT_CATERGOTY_ADDRESS}
                        action={() =>
                            editedCatergory
                                ? editCatergoryFunc({
                                      args: [
                                          parseInt(editedCatergory.id),
                                          name,
                                          parseInt(parentCatergory),
                                          colors,
                                          memoryStore,
                                      ],
                                  })
                                : addCatergoryFunc({
                                      args: [name, parseInt(parentCatergory), colors, memoryStore],
                                  })
                        }
                    >
                        Lưu danh mục
                    </Web3Button>
                    {editedCatergory && (
                        <button
                            type="button"
                            className="btn-default"
                            onClick={() => {
                                setEditedCatergory(null);
                                setName('');
                                setParentCatergory('');
                                setProperties(false);
                            }}
                        >
                            Thoát
                        </button>
                    )}
                </div>
            </div>
            {!editedCatergory && (
                <table className="basic mt-4">
                    <thead>
                        <tr>
                            <td>Tên danh mục</td>
                            <td>Tên danh mục cha</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {catergories.length > 0 &&
                            catergories.map((catergory) => (
                                <tr key={catergory.id}>
                                    <td>{catergory.catergoryName}</td>
                                    <td>{getParentCatergoryName(catergory.parentId)}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Web3Button
                                                className="btn-default mr-1 btn-primary-fix"
                                                contractAddress={CONTRACT_CATERGOTY_ADDRESS}
                                                action={() => {
                                                    doEditCatergory(catergory);
                                                }}
                                            >
                                                Sửa
                                            </Web3Button>

                                            <Web3Button
                                                className="btn-red btn-primary-fix"
                                                contractAddress={CONTRACT_CATERGOTY_ADDRESS}
                                                action={() =>
                                                    deleteCatergoryFunc({ args: [catergory.id] })
                                                }
                                            >
                                                Xóa
                                            </Web3Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}
