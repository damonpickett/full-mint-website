import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Linkedin from './assets/social-media-icons/linkedin.png'
import Twitter from './assets/social-media-icons/twitter_32x32.png'
import Portfolio from './assets/social-media-icons/portfolio.png'
import Github from './assets/social-media-icons/github2.png'

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify='space-between' align='center' padding='30px'>
            {/* left side - social media icons */}
            <Flex justify='space-around' width='40%' padding='0 75px'>
                <Link href='https://www.linkedin.com/in/damon-pickett/' target='_blank'>
                    <Image src={Linkedin} boxSize='42px' margin='0 15px' alt='facebook' />
                </Link>
                <Link href='https://twitter.com/Damon_Pickett' target='_blank'>
                    <Image src={Twitter} boxSize='42px' margin='0 15px' alt='twitter' />
                </Link>
                <Link href='https://damonpickett.github.io/portfolio/' target='_blank'>
                    <Image src={Portfolio} boxSize='42px' margin='0 15px' alt='portfolio' />
                </Link>
                <Link href='https://github.com/damonpickett/full-mint-website' target='_blank'>
                    <Image src={Github} boxSize='42px' margin='0 15px' alt='github' />
                </Link>
            </Flex>

            {/* right side - sections and connect */}
            <Flex
                justify='space-around'
                align='center'
                width='40%'
                padding='30px'
            >
                <Box margin='0 15px'>About</Box>
                <Spacer />
                <Box margin='0 15px'>Mint</Box>
                <Spacer />
                <Box margin='0 15px'>Team</Box>
                <Spacer />
                {isConnected ? (
                    <Box margin='0 15px'>Connected</Box>
                ) : (
                    <Button
                        backgroundColor='#D6517D'
                        borderRadius='5px'
                        boxShadow='0 2px 2px 1px #0F0F0F' 
                        color='white'
                        cursor='pointer'
                        fontFamily='inherit'
                        padding='15px'
                        margin='0 15px'
                        onClick={connectAccount}
                    >
                        Connect
                    </Button>)}
            </Flex>
        </Flex>
        
    )
}

export default NavBar;