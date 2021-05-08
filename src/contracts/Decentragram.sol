pragma solidity >0.5.2;

contract Decentragram {
    // Code goes here...
    string public name = 'Decentragram';

    // Store posts
    uint256 public imageCount = 0;
    mapping(uint256 => Image) public images;

    struct Image {
        uint256 id;
        string hash; // IPFS Hash
        string description;
        uint256 tipAmount;
        address payable author;
    }

    event ImageChanged(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event DescriptionChanged(uint256 id, string description);

    // Create posts
    function uploadImage(string memory _imgHash, string memory _description) public {
        require(bytes(_description).length > 0);
        require(bytes(_imgHash).length > 0);
        require(msg.sender != address(0)); // make sure sender exists

        images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);
        imageCount++;

        emit ImageChanged(imageCount, _imgHash, _description, 0, msg.sender);
    }

    // Tip posts
    function tipImageowner(uint256 _id) public payable {
        require(_id >= 0 && _id <= imageCount);

        Image memory _image = images[_id];
        address payable _author = _image.author;
        _author.transfer(msg.value); // pay author
        _image.tipAmount = _image.tipAmount + msg.value;
        images[_id] = _image; // put back in mapping. IS THIS NEEDED?

        emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
    }

    function changeDescription(uint256 _id, string memory _description) public {
        require(_id >= 0 && _id <= imageCount);
        Image memory _image = images[_id];
        _image.description = _description;
        images[_id] = _image;

        emit ImageChanged(_id, _image.hash, _description, 0, msg.sender);
    }
}
