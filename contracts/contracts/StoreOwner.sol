// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

//[["Product A", 1],     ["Product B", 2],     ["Product C", 3] ]
//[["Xiaomi Redmi Note 13",1],["Samsung Galaxy A25",1]]
contract StoreOwner {
    struct Order {
        uint256 id;
        string name;
        string email;
        string phoneNumber;
        string province;
        string district;
        string ward;
        string details;
        string timestamp;
        uint256 total;
        bool paid;
        Item[] items;
    }

    struct Item {
        string name;
        uint256 quantity;
    }

    Order[] public orders;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createOrder(
        string memory _name,
        string memory _email,
        string memory _phoneNumber,
        string memory _province,
        string memory _district,
        string memory _ward,
        string memory _details,
        string memory _time,
        uint256 _total,
        uint256 _itemCount,
        Item[] memory _items
    ) public {
        uint id = orders.length;
        Order storage newOrder = orders.push();
        newOrder.id = id;
        newOrder.name = _name;
        newOrder.email = _email;
        newOrder.phoneNumber = _phoneNumber;
        newOrder.province = _province;
        newOrder.district = _district;
        newOrder.ward = _ward;
        newOrder.details = _details;
        newOrder.timestamp = _time;
        newOrder.total = _total;
        newOrder.paid = false;

        for (uint i = 0; i < _itemCount; i++) {
            newOrder.items.push(_items[i]);
        }
    }

    function depositFunds() public payable {
        require(msg.value > 0, "You need to paid for products");
        (bool success,) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether to owner");
    }

    function withdrawDepositSafely() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "There are no funds to withdraw");
        payable(owner).transfer(amount);
    }

    function getAllOrders() external view returns (Order[] memory) {
        return orders;
    }

    function completeOrder(uint256 _ordersId) public onlyOwner {
        require(_ordersId < orders.length, "Order does not exist");
        require(!orders[_ordersId].paid, "Order is already paid");

        orders[_ordersId].paid = true;
      
        delete orders[_ordersId];
    }

    function getOrdersCount() public view returns (uint256) {
        return orders.length;
    }

    function delelteAllOrders() public onlyOwner {
        delete orders;
    }

    function getDeposit() public view returns (uint256) {
        return address(this).balance;
    }

    function getOrder(uint _id) external view returns(Item[] memory) {
        return orders[_id].items;
    }
}
