// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

//[[1,"Product A", 1],     [2,"Product B", 2],     [3,"Product C", 3] ]
contract Orders {
    
    struct Order {
        uint id;
        address user;
        string timestamp;
        uint256 total;
        uint itemCount;
        Item[] items;
    }

    struct Item {
        uint productId;
        string name;
        uint256 quantity;
    }

    uint256 revenue = 0;
    uint256 numberProduct = 0;
    uint256 numberOrder = 0;

    Order[] public orders;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //For CheckOut
    function checkout(
        string memory _timestamp,
        uint256 _total,
        uint256 _itemCount,
        Item[] memory _items
    ) external payable  {
        uint id = orders.length;

        revenue += _total;
        numberProduct += _itemCount;
        numberOrder++;

        Order storage newOrder = orders.push();
        newOrder.id = id;
        newOrder.user = msg.sender;
        newOrder.timestamp = _timestamp;
        newOrder.itemCount = _itemCount;
        newOrder.total = _total;

        for (uint256 i = 0; i < _itemCount; i++) {
            newOrder.items.push(_items[i]);
        }
        require(msg.value > 0, "You need to paid for products");
        (bool success,) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether to owner");
    }

    function delelteOrder(uint _id, uint256 _total, uint256 _itemCount) external {
        delete orders[_id];
        revenue -= _total;
        numberProduct -= _itemCount;
        numberOrder--;
    }


    function refund(
        address _user, uint _id, uint256 _total, uint256 _itemCount
    ) external payable {
        require(msg.value > 0, "You need to have ether for refund");
        (bool success,) = _user.call{value: msg.value}("");
        require(success, "Failed to send Ether");
        delete orders[_id];

        revenue -= _total;
        numberProduct -= _itemCount;
        numberOrder--;
    }

    function getAllOrders() external view returns (Order[] memory) {
        return orders;
    }

    function delelteAll() external onlyOwner {
        delete orders;
    }

    function getDeposit() external view returns (uint256) {
        return address(this).balance;
    }

    function getOrdersCount() external view returns (uint256) {
        return numberOrder;
    }

    function getRevenue() external view returns (uint256) {
        return revenue;
    }

    function getNumberProduct() external view returns (uint256) {
        return numberProduct;
    }
}