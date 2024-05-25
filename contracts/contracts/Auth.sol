// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Auth {
    struct Admin {
        address admin;
        string time;
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

    Admin[] public admins;
    User[] public users;
    address public owner;

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

    function findAdmin(address _address) external view returns (bool) {
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i].admin == _address) {
                return true;
            }
        }
        return false;
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
        address _admin,
        string memory _time
    ) public {
        admins.push(Admin(_admin, _time));
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
}
