// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Products {

    struct Product {
        uint256 id;
        string productName;
        string description;
        uint256 price;
    }

    uint256 public productCount;
    address public  owner;
    Product[] public products;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    //Event
    event created(uint256 id, string productName, string description, uint256 price);
    event edited(uint256 id, string productName, string description, uint256 price);
    event deleted(uint256 id);

    function addProduct(
        string memory _productName, 
        string memory _description, 
        uint256 _price
        ) external {
        productCount++;

        Product memory newProduct = Product(productCount,_productName, _description, _price);

        products.push(newProduct);

        //Thêm 1 event vào để thông báo rằng đã thêm thành công
        emit created(productCount, _productName, _description, _price);
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory tmp = new Product[](productCount); // Khởi tạo mảng với độ dài là productCount

        for (uint256 i = 0; i < productCount; i++) {
            tmp[i] = products[i]; 
        }

        return tmp;
    }


    function getProductById(uint256 _id) public view returns (Product memory) {
        for (uint256 i = 0; i < productCount; i++) {
            if (products[i].id == _id) {
                return products[i];
            }
        }
        // Nếu không tìm thấy sản phẩm, trả về một sản phẩm rỗng
        revert("Product not found");
    }

    function editProduct(
        uint256 _id,
        string memory _productName, 
        string memory _description, 
        uint256 _price
        ) external {
        require(_id <= productCount, "Invalid product ID"); 

        Product storage oldProduct = products[_id - 1];
        oldProduct.productName = _productName;
        oldProduct.description = _description;
        oldProduct.price = _price;
        
        //Thêm 1 event vào để thông báo rằng đã sửa thành công
        emit edited(_id, _productName, _description, _price);
    }

    function deleteProduct(uint256 _id) external {
        require(_id <= productCount, "Invalid product ID");
        require(products[_id - 1].id == _id, "Product does not exist");

        // Xóa sản phẩm bằng cách đẩy các phần tử phía sau lên trước
        for (uint256 i = _id - 1; i < productCount - 1; i++) {
            products[i] = products[i + 1];
            products[i].id--;
        }

        // Giảm số lượng sản phẩm
        productCount--;

        //Thêm 1 event vào để thông báo rằng đã xóa thành công
        emit deleted(_id);
    }
    
}
