contract Densy {
    address private owner;
    address private notary;

    constructor() public {
        owner = msg.sender;
        notary = msg.sender;
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
    
    // mapping (uint => uint) private assets;
    mapping (address => mapping (uint => uint)) private holdings;
    
    // Добавление монет
    
    function mintToken(address user, uint count) public {
        if (msg.sender == owner) {
            balances[user] += count;
            countCoin += count;
        }
    }
    
    // Изменение активов
    
    function mintAssetInc(address user, uint essence, uint count) public {
        if (msg.sender == notary) {
            holdings[user][essence] += count;
        }
    }
    
    function mintAssetDec(address user, uint essence, uint count) public {
        if (msg.sender == notary) {
            if (holdings[user][essence] >= count) {
                holdings[user][essence] -= count;
            }
        }
    }
    
    // Добавить предложение
    
    function addOffer(uint id, uint essence, uint count, uint price) public {
        if (holdings[msg.sender][essence] >= count && price > 0) {
            offers[id] = Offer({
                owner: msg.sender,
                essence: essence,
                count: count,
                price: price
            });

            holdings[msg.sender][essence] -= count;
        }
    }

    // Схлопывание сделки

    function swapOffer(uint id) public {
        uint price = offers[id].price;
        if (balances[msg.sender] > price) {
            balances[offers[id].owner] += price;
            balances[msg.sender] -= price;
            holdings[msg.sender][offers[id].essence] += offers[id].count;
            delete offers[id];
        }
    }

    // Проверка состояний

    function getTokens(address user) public view returns (uint) {
        if (msg.sender == owner) {
            return balances[user];
        }
    }

    function getAssets(address user, uint essence) public view returns (uint) {
        if (msg.sender == owner) {
            return holdings[user][essence];
        }
    }

    function getOffer(uint id) public view returns (uint) {
        if (msg.sender == owner) {
            return offers[id].price;
        }
    }
}