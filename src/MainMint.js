import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Link, Text } from '@chakra-ui/react'; 
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = '0x267416f0BDD563a9E7A48D4D6E553D08256C1899'

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

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

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
            <Box width='520px'>
            <div>
                <Text fontSize='48px' textShadow='0 5px #000000'>RoboPunks</Text>
                <Text
                    fontSize='30px'
                    letterSpacing='-5.5%'
                    fontFamily='VT323'
                    textShadow='0 2px 2px #000000'
                >
                    It's 2078. Can the RoboPunks NFT save humans from destructive, rampant NFT speculation? 
                    Mint RoboPunks to find out.
                </Text>
            </div>

            {isConnected ? (
                <div>
                    <Flex align='center' justify='center'>
                        <Button
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0 2px 2px 1px #0F0F0F' 
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='15px'
                            margin='10px'
                            onClick={handleDecrement}
                        >
                            -
                        </Button>
                        <Input
                            readOnly
                            fontFamily='inherit'
                            width='100px'
                            height='40px'
                            textAlign='center'
                            paddingLeft='19px'
                            marginTop='10px'
                            type='number' 
                            value={mintAmount} 
                        />
                        <Button
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0 2px 2px 1px #0F0F0F' 
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='15px'
                            margin='10px'
                            onClick={handleIncrement}
                        >
                            +
                        </Button>
                    </Flex>
                    <Button
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0 2px 2px 1px #0F0F0F' 
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='15px'
                            margin='10px'
                            onClick={handleMint}
                    >
                        Mint Now
                    </Button>
                </div>
            ) : (
                <Text
                    marginTop='70px'
                    fontSize='30px'
                    letterSpacing='-5.5%'
                    fontFamily='VT323'
                    textShadow='0 3px #000000'
                    color='#D6517D'
                >
                    You must be connected to mint.
                </Text>
            )}
            <Text
                marginTop='70px'
                fontSize='30px'
                letterSpacing='-5.5%'
                fontFamily='VT323'
                textShadow='0 3px #000000'
                color='#D6517D'
            >
                <Link 
                href="https://www.flaticon.com/free-icons/folder" 
                title="folder icons"
                textDecoration='none'
                color='rgb(66, 245, 239)'
                >
                    Folder icon created by Freepik - Flaticon
                </Link>
            </Text>
            <Text
                marginTop='30px'
                fontSize='30px'
                letterSpacing='-5.5%'
                fontFamily='VT323'
                textShadow='0 3px #000000'
                color='#D6517D'
            >
            <Link 
                target="_blank" 
                href="https://icons8.com/icon/21276/octocat"
                textDecoration='none'
                color='rgb(66, 245, 239)'
            >Octocat</Link> icon by <Link 
            target="_blank" 
            href="https://icons8.com"
            textDecoration='none'
            color='rgb(66, 245, 239)'
            >
                Icons8
            </Link>
            </Text>
            </Box>
        </Flex>
    )
}

export default MainMint;