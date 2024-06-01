// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Reviews {
    
    struct Review {
        uint256 id;
        address user;
        uint256 productId;
        uint256 rating;
        string comment;
        string time;
    }
    Review[] public reviews;

    function getAllReviews() public view returns (Review[] memory) {
        return reviews;
    }

    function getReviewsByProductId(uint256 _productId) public view returns (Review[] memory) {
        uint count = 0;
        for (uint256 i = 0; i < reviews.length; i++) {
            if (reviews[i].productId == _productId) {
                count++;
            }
        }

        uint index = 0;
        Review[] memory tmp = new Review[](count);
        for (uint256 i = 0; i < reviews.length; i++) {
            if (reviews[i].productId == _productId) {
                tmp[index] = reviews[i]; index++;
            }
        }
        return tmp;
    }

    function getReviewById(uint256 _id) external view returns (Review memory) {
            return getReview(_id);
    }

    //internal function
    function getReview(uint256 _id) internal view returns (Review storage) {
        for (uint256 i = 0; i < reviews.length; i++) {
            if (reviews[i].id == _id) {
                return reviews[i];
            }
        }
       
        revert("Review not found");
    }

    function addReview(
        address _user,
        uint256 _productId,
        uint256 _rating,
        string memory _comment,
        string memory _time
    ) external {
        uint _id = reviews.length;

        reviews.push(Review(_id, _user, _productId, _rating, _comment, _time));
    }

    function editReview(
        uint256 _id,
        uint256 _rating,
        string memory _comment,
        string memory _time
    ) public {
        Review storage oldReview = getReview(_id);
        oldReview.rating = _rating;
        oldReview.comment = _comment;
        oldReview.time = _time;
    }

     function deleteReview(
        uint256 _id
    ) public {
        delete reviews[_id];
    }

    function deleteAllReviews(
    ) external {
        delete reviews;
    }
}