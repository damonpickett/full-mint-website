# Full Mint Website
Based on [this tutorial](https://www.youtube.com/watch?v=ynFNLBP2TPs&list=WL&index=1) from [EdRoh](https://www.youtube.com/c/EdRohDev)

## Tech Stack
- React.js (front-end)
- Solidity (smart contract)
- Ethers.js (JavaScript library for interacting with the Ethereum Blockchain)
- Hardhat (Provides a development environment for Ethereum blockchain applications)
- Chakra UI (Provides styling elements that can be written in JSX)

## Function
This app allows a user to connect their Ethereum wallet and mint a RoboPunk NFT, an ERC721 token. The cost is 0.02 ETH. A max supply of 1000 has been set and users are limited to 3 RP's (RoboPunkNFT tokens) per wallet. From `RoboPunksNFT.sol`:
```sol
constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdraw wallet address
    }
```

To connect the user's wallet, this app uses [ethers.js](https://docs.ethers.io/v5/) in the following function in the [`NavBar`](src/NavBar.js) component:
```js
async function connectAccount() {
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
```
This function is activated by the 'Connect' button.

Once the user's wallet is connected, the `MainMint` component conditionally renders the buttons and input for incrementing or decrementing the user's number of mints (max 3), and the button to mint. Here is the code for the increment button:
```js
const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };
```

Here is the code for the 'Mint Now' button:
```js
async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }
```
This function represents the most educational aspect of the tutorial for me. From this function we can see how we use ethers.js to bundle the necessary data (contract address, contract abi, and signer) and use that info to call the `mint()` function in our deployed smart contract. However, what I don't understand at this time is why we pass 2 arguments to the mint function above, when in our smart contract the mint function only takes 1 argument for the quantity.

Upon minting a token users can confirm on the [Goerli TestNet](https://goerli.etherscan.io/) the number of RP tokens they have purchased.

The smart contract for this app has been deployed to the [Goerli TestNet](https://goerli.etherscan.io/)

The contract can be confirmed [here](https://goerli.etherscan.io/address/0x267416f0BDD563a9E7A48D4D6E553D08256C1899)

Users can acquire mock ETH to use this app [here](https://goerlifaucet.com/)

## Style
The background is a `background-image: url` that links to a gif. The app is overlayed with a sheet of white with an opacity of 0.85. The effect is to brighten the picture.

We use the pixelated fonts Press Start 2P, and VT323. Both from [Google Fonts](https://fonts.google.com/). The text is given a `box-shadow` effect which helps to keep it readable as the scrolling background presents changing background colors.

---
# Tutorial Breakdown
*Section h2's below based on YouTube video chapters

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
- Created `NavBar` and `MainMint` components and added `App.js`. Have not added css yet.
    - `NavBar.js`: Contains the navigation elements, connect button, and wallet connection functionality. Connect button conditionally renders based on whether the user has connected or not.
    - `MainMint.js`: If user is not connected to site, this component shows "You must be connected to mint.". Once connected the component has a + and - button, an input for how many NFTs to mint, and a button for minting.

### Important Takeaway
Here's how the front-end is communicating with the smart contract:
```js
async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // Above, we've created a provider object and from the provider object...
            // we've created a signer object
            // Below, we create an instance of Contract and passed it...
            // the contract address, the contract abi, and the signer(user)...
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                // We're able to access the mint function from the smart contract...
                // because the contract object has access to the roboPunksNFT.abi
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }
```
In summation: JavaScript accesses smart contract functionality through contract ABI.

## Give Mint Website Some Life With CSS Styling
- The entire page is covered in an `.overlay` class which, through the `opacity` property gives an otherwise darker .gif background a lighter veneer
- Chakra UI allows me to import Chakra components to easily write CSS in my `.js` files. E.G. from `NavBar` component:
```js
<Flex justify='space-between' align='center' padding='30px'>
    {/* left side - social media icons */}
    <Flex justify='space-around' width='40%' padding='0 75px'>
        <Link href='https://www.linkedin.com/in/damon-pickett/'>
            <Image src={Facebook} boxSize='42px' margin='0 15px' alt='facebook' />
        </Link>
        <Link href='https://twitter.com/Damon_Pickett'>
            <Image src={Twitter} boxSize='42px' margin='0 15px' alt='twitter' />
        </Link>
        <Link href='damon.pickett@gmail.com'>
            <Image src={Email} boxSize='42px' margin='0 15px' alt='email' />
        </Link>
    </Flex>
```
- With the exceptions of `.App`, `*`, `body`, `.overlay`, and `.moving-background`, all CSS is written within the JSX

### Important Takeaway
At first, the white text against the moving background was difficult to read as lighter parts of the picture scrolled beneath. This changed after adding `textShadow`. I.E. Text shadow can make text more readable.

## Fully Built a Front-End Mint Website
- Navigated to [contract](https://goerli.etherscan.io/address/0x267416f0BDD563a9E7A48D4D6E553D08256C1899#writeContract) and set `isPublicMintEnabled` to true. 
- Whenever you make a function call that requires an Ether amount you need to pass that in as a value. This had been overlooked inititally in the tutorial but we added it at the end:
```js
async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    // Gotta add this value
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }
```
