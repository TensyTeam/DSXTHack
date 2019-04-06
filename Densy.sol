contract Densy {
    address private owner;
    address private notary;

    constructor() public {
        owner = msg.sender;
    }

    struct Offer {
        address owner;
        uint essence;
        uint count;
        uint price;
    }
    
    uint private countCoin = 0;
    
    mapping (uint => Offer) private offers;
    
    mapping (address => uint) private balances;
    
    // Добавление монет
    
    function mint(address user, uint count) public {
        if (msg.sender == owner) {
            balances[user] += count;
            countCoin += count;
        }
    }
    
    // Добавить предложение
    
    function addOffer(uint id, address user, uint essence, uint count, uint price) public {
        offers[id] = Offer({
            owner: user,
            essence: essence,
            count: count,
            price: price
        });
    }
    
    // Получение информации о предложении

    function getOffer(uint id) public view returns (uint) {
        return offers[id].price;
    }

    // Схлопывание сделки

    function swapOffer(uint id) public {
        uint price = offers[id].price;
        if (balances[msg.sender] > price) {
            balances[offers[id].owner] += price;
            offers[id].owner = msg.sender;
            balances[msg.sender] -= price;
        }
    }
}