// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

//[[Product A", 1],     ["Product B", 2],     ["Product C", 3] ]

contract Store {
    struct Admin {
        address admin;
    }

    struct User {
        address user;
        string firstName;
        string lastName;
        string email;
        string phoneNumber;
        string province;
        string district;
        string ward;
        string detail;
    }

    struct Order {
        address user;
        string timestamp;
        uint256 total;
        Item[] items;
    }

    struct Item {
        uint256 productId;
        string name;
        uint256 quantity;
    }

    Admin[] public admins;
    User[] public users;
    Order[] public orders;
    address public owner;
    // mapping(address => Order[]) public userOrders;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //For user
    function getAllUser() public view returns (User[] memory) {
        return users;
    }

    function getUserByAddress(address _address) public view returns (User memory) {
            return getUser(_address);
    }

    //internal function
    function getUser(address _address) internal view returns (User storage) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].user == _address) {
                return users[i];
            }
        }
       
        revert("User not found");
    }

     // Hàm thêm mới một người dùng
    function addUser(
        address _user,
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phoneNumber,
        string memory _province,
        string memory _district,
        string memory _ward,
        string memory _detail
    ) public {
        users.push(User(_user, _firstName, _lastName, _email, _phoneNumber, _province, _district, _ward, _detail));
    }

    // Hàm sửa thông tin của một người dùng
    function editUser(
        address _address,
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phoneNumber,
        string memory _province,
        string memory _district,
        string memory _ward,
        string memory _detail
    ) public {
        User storage oldUser = getUser(_address);
        oldUser.firstName = _firstName;
        oldUser.lastName = _lastName;
        oldUser.email = _email;
        oldUser.phoneNumber = _phoneNumber;
        oldUser.province = _province;
        oldUser.district = _district;
        oldUser.ward = _ward;
        oldUser.detail = _detail;
    }

    //For admin
    function getAllAdmins() external view returns (Admin[] memory) {
        return admins;
    }

    function getAdminByAddress(address _address) public view returns (Admin memory) {
            return getAdmin(_address);
    }

    //internal function
    function getAdmin(address _address) internal view returns (Admin storage) {
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i].admin == _address) {
                return admins[i];
            }
        }
        
        revert("admin not found");
    }

    function addAdmin(
        address _admin
    ) public {
        admins.push(Admin(_admin));
    }

    function deleteAdmin(
        address _address
    ) public {
        Admin memory deletedAdmin = getAdminByAddress(_address);
        for (uint256 i = 0; i < admins.length; i++) {
            if(deletedAdmin.admin == admins[i].admin) {
                delete admins[i]; break ;
            }
        }
    }

    //For CheckOut
    function checkOut(
        string memory _timestamp,
        uint256 _total,
        uint256 _itemCount,
        Item[] memory _items
    ) external payable {
        Order storage newOrder = orders.push();
        newOrder.user = msg.sender;
        newOrder.timestamp = _timestamp;
        newOrder.total = _total;

        for (uint256 i = 0; i < _itemCount; i++) {
            newOrder.items.push(_items[i]);
        }

        require(msg.value > 0, "You need to paid for products");
        (bool success,) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether to owner");
    }

    function getAllOrders() external view returns (Order[] memory) {
        return orders;
    }

    function getOrdersCount() external view returns (uint256) {
        return orders.length;
    }

    function delelteAll() external onlyOwner {
        delete orders;
    }

    function getDeposit() external view returns (uint256) {
        return address(this).balance;
    }
}
