// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Categories {
    
    struct Category {
        uint256 id;
        string categoryName;
        string logo;
    }

    uint256 public count;
    Category[] public categories;
    uint256 public lengthArray;

    //Event
    event created(uint256 id, string categoryName);
    event edited(uint256 id, string categoryName);
    event deleted(uint256 id);

    function addCategory(
        string memory _categoryName,
        string memory _logo
    ) external {
        uint256 index;
        bool check = false;
        for (uint256 i = 0; i < categories.length; i++) {
            if (categories[i].id == 0) {
                index = i;
                check = true;
                break;
            }
        }

        Category memory newCategory = Category(
            ++count,
            _categoryName,
            _logo
        );

        if (check) {
            categories[index] = newCategory;
        } else {
            categories.push(newCategory);
        }

        //Thêm 1 event vào để thông báo rằng đã thêm thành công
        emit created(newCategory.id, newCategory.categoryName);
    }

    function getAllCategories() public view returns (Category[] memory) {
        Category[] memory tmp = new Category[](count);
        for (uint256 i = 0; i < count; i++) {
            tmp[i] = categories[i];
        }

        return tmp;
    }

    function getCategoryById(uint256 _id)
        public
        view
        returns (Category memory)
    {
        return getCategory(_id);
    }

    //internal function
    function getCategory(uint256 _id)
        internal
        view
        returns (Category storage)
    {
        for (uint256 i = 0; i < count; i++) {
            if (categories[i].id == _id) {
                return categories[i];
            }
        }
        // Nếu không tìm thấy sản phẩm, trả về một sản phẩm rỗng
        revert("Category not found");
    }

    function editCategory(
        uint256 _id,
        string memory _categoryName,
        string memory _logo
    ) external {
        require(_id <= count, "Invalid Category ID");
        Category storage oldCategory = getCategory(_id);
        require(oldCategory.id != 0, "Category does not exist");

        oldCategory.categoryName = _categoryName;
        oldCategory.logo = _logo;

        //Thêm 1 event vào để thông báo rằng đã sửa thành công
        emit edited(oldCategory.id, oldCategory.categoryName);
    }

    function deleteCategory(uint256 _id) external {
        require(_id <= count, "Invalid Category ID");

        Category memory tmp = getCategory(_id);
        require(tmp.id != 0, "Category does not exist");

        for (uint256 i = _id - 1; i < count - 1; i++) {
            categories[i] = categories[i + 1];
            categories[i].id--;
        }

        //Xoa danh muc o cuoi cung
        delete categories[count - 1];
        count--;

        //Thêm 1 event vào để thông báo rằng đã xóa thành công
        emit deleted(_id);
    }
}
