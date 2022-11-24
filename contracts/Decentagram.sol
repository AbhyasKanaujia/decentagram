// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Decentagram {
    string public name = "Decentagram";

    // Store images
    uint public imageCount = 0;
    mapping(uint => Image) public images;

    struct Image {
        uint id;
        string hash;
        string description;
        uint tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );

    event ImageTipped(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author,
        address tippedBy
    );

    // create images
    function uploadImage(string memory _hash, string memory _description)
        public
    {
        // Make sure hash, description and author exists
        require(bytes(_hash).length > 0, "Hash not provided");
        require(bytes(_description).length > 0, "Description not provided");
        require(msg.sender != address(0x0), "Author does not exist");

        // Increment image id
        imageCount++;

        // Add image to contract
        images[imageCount] = Image(
            imageCount,
            _hash,
            _description,
            0,
            payable(msg.sender)
        );
        // newer version of solidity requires payable(0x0) instead of
        // address(0x0)
        // https://ethereum.stackexchange.com/a/111618/112475

        // Trigger an event
        emit ImageCreated(
            imageCount,
            _hash,
            _description,
            0,
            payable(msg.sender)
        );
    }

    // tip images
    function tipImageOwner(uint _id) public payable {
        require(_id > 0 && _id <= imageCount, "Invalid image id");

        // Fetch the image from storage
        Image memory _image = images[_id];
        // Fetch the author
        address payable _author = _image.author;

        // Pay the autor by sending them ether
        _author.transfer(msg.value);
        // Increment the tip amount
        _image.tipAmount += msg.value;

        // Update the image
        images[_id] = _image;

        // Trigger an event
        emit ImageTipped(
            _id,
            _image.hash,
            _image.description,
            msg.value,
            _author,
            msg.sender
        );
    }
}
