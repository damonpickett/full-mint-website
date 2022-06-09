# Full Mint Website
Based on [this tutorial](https://www.youtube.com/watch?v=ynFNLBP2TPs&list=WL&index=1) from [EdRoh](https://www.youtube.com/c/EdRohDev)

## Set up
- Create react app
- Install hardhat `npm i -D hardhat`
- Create hardhat project `npx hardhat` (had to delete the react README to make room for the hardhat README) 
- Install OpenZeppelin `npm i @openzeppelin/contracts`
- Install chakra UI `npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6`
- Install dotenv `npm i -D donenv`
- Install hardhat-etherscan `npm i -D @nomiclabs/hardhat-etherscan`

## Writing a NFT Mint Smart Contract
- Wrote contract
    - variables
    - constructor
    - functions
- created `deployRoboPunksNFT.js` file in `/scripts`

### Important Sidenotes
- Storage variables can make the use of your contract more expensive. Minimize variable creating and variable changing as much as possible
- It is slightly cheaper to initialize variables in constructor. So you set your variables at the beginning eg. `uint256 public mintPrice;` but you initialize like this:
```sol
constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
    }
```
By initialize I think Ed means: to give a variable a value.
- Check effects-interaction pattern: In a Solidity function, you want changes in variables to happen before the interaction (eg. before the nft is minted and delivered to receipient). This is key in preventing re-entrancy hacks. Example:
```sol
for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
```
The `totalSupply` is increased before the minting happens.
- See Azuki ERC721A for minting multiple NFT's at a lower cost


## How to Deploy Smart Contract to Test Network
- Gathered testnet RPC URL, etherscan key, private key and entered into `.env`
- Added `const dotenv = require('dotenv')` to `hardhat.config.js` and `dotenv.config();`
- Updated `module.exports` with `networks` and `etherscan` objects
- Ran the following commands in terminal:
    - `npx hardhat clean`
    - `npx hardhat compile`
    - `npx hardhat run scripts/deployRoboPunksNFT.js --network goerli`
Contract has now been deployed to Goerli testnet
- Verify contract `npx hardhat verify --network goerli {contract address}` Contract is now readable/writable on Goerli testnet.

## Creating a Full Mint Website
- Go to `/artifacts/contracts/RoboPunksNFT.json`. Copy content and paste into a new file in `/src/RoboPunksNFT.json` We connect to our contract via the abi, this json file is what allows for that.
- Downloaded assets(images) from provided link
- 