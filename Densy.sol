contract Densy {
    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    struct Offer {
        address owner;
        uint essence;
        uint count;
        uint equivalent;
    }
    
    mapping (uint => Offer) private offers;
    
    Offer off = Offer({
        owner: owner,
        essence: 1,
        count: 100,
        equivalent: 2
    });
    
    function addOffer(uint id) public {
        offers[id] = off;
    }

    function getOffer(uint id) public view returns (uint) {
        return offers[id].equivalent;
    }
}