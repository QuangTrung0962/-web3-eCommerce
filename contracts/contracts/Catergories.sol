// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Catergories {
    struct Catergory {
        uint256 id;
        string catergoryName;
        uint256 parentId; 
        string[] colors;
        string[] memoryStore;
    }

    uint256 public count;
    address public owner;
    Catergory[] public catergories;
    uint256 public lenghArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    //Event
    event created(uint256 id, string catergoryName);
    event edited(uint256 id, string catergoryName);
    event deleted(uint256 id);

    function addCatergory(
        string memory _catergoryName,
        uint256 _parentId,
        string[] memory _colors,
        string[] memory _memoryStore
    ) external {
        uint256 index;
        bool check = false;
        for (uint256 i = 0; i < catergories.length; i++) {
            if (catergories[i].id == 0) {
                index = i;
                check = true;
                break;
            }
        }

        Catergory memory newCatergory = Catergory(
            ++count,
            _catergoryName,
            _parentId,
            _colors,
            _memoryStore
        );

        if (check) {
            catergories[index] = newCatergory;
        } else {
            catergories.push(newCatergory);
        }

        //Thêm 1 event vào để thông báo rằng đã thêm thành công
        emit created(newCatergory.id, newCatergory.catergoryName);
    }

    function getAllCatergories() public view returns (Catergory[] memory) {
        Catergory[] memory tmp = new Catergory[](count);
        for (uint256 i = 0; i < count; i++) {
            tmp[i] = catergories[i];
        }

        return tmp;
    }

    function getCatergoryById(uint256 _id)
        public
        view
        returns (Catergory memory)
    {
        return getCatergory(_id);
    }

    //internal function
    function getCatergory(uint256 _id)
        internal
        view
        returns (Catergory storage)
    {
        for (uint256 i = 0; i < count; i++) {
            if (catergories[i].id == _id) {
                return catergories[i];
            }
        }
        // Nếu không tìm thấy sản phẩm, trả về một sản phẩm rỗng
        revert("Catergory not found");
    }

    function editCatergory(
        uint256 _id,
        string memory _catergoryName,
        uint256 _parentId,
        string[] memory _colors,
        string[] memory _memoryStore
    ) external {
        require(_id <= count, "Invalid Catergory ID");
        Catergory storage oldCatergory = getCatergory(_id);
        require(oldCatergory.id != 0, "Catergory does not exist");

        oldCatergory.catergoryName = _catergoryName;
        oldCatergory.parentId = _parentId;
        oldCatergory.colors = _colors;
        oldCatergory.memoryStore = _memoryStore;

        //Thêm 1 event vào để thông báo rằng đã sửa thành công
        emit edited(oldCatergory.id, oldCatergory.catergoryName);
    }

    function deleteCatergory(uint256 _id) external {
        require(_id <= count, "Invalid Catergory ID");

        Catergory memory tmp = getCatergory(_id);
        require(tmp.id != 0, "Catergory does not exist");

        for (uint256 i = _id - 1; i < count - 1; i++) {
            catergories[i] = catergories[i + 1];
            catergories[i].id--;
        }

        //Xoa danh muc o cuoi cung
        delete catergories[count - 1];
        count--;

        //Thêm 1 event vào để thông báo rằng đã xóa thành công
        emit deleted(_id);
    }
}