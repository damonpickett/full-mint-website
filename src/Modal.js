import React from "react";

const Modal = (props) => {
    if (!props.modal) {
      return null;
    }

    return (
        <div className="modal" onClick={() => props.setModal(false)}>
            <div className="modal-canvas">
                <div className="modal-header">
                    <h3>Instructions</h3>
                 </div>
                <div className="modal-body">
                    <p>Connect your Ethereum wallet via the 'Connect' button in the top right corner</p>
                    <p>Connect your wallet to the Goerli Testnet</p>
                    <p>You'll need mock Ethereum tokens to interact with the blockchain. You can collect mock tokens from the <a href='https://goerlifaucet.com/' target='_blank' rel='noreferrer'>Goerli Faucet</a></p>
                    <p>Once your wallet is connected you'll be able to choose the number of tokens you'd like to mint. The maximum is 3</p>
                    <p>Click the 'Mint Now' button. You can verify your transaction via your wallet address' transaction history in the <a href='https://goerli.etherscan.io/' target='_blank' rel='noreferrer'>Goerli Testnet</a></p>
                </div>
                <div className="modal-header">
                    <h3>Further Info</h3>
                </div>
                <div className="modal-body">
                    <p>Click <a href='https://goerli.etherscan.io/address/0x267416f0BDD563a9E7A48D4D6E553D08256C1899' target='_blank' rel='noreferrer'>here</a> to view this application's deployed smart contract and transaction history</p>
                    <p>This application was built by following <a href='https://www.youtube.com/watch?v=ynFNLBP2TPs&list=WL&index=1' target='_blank' rel='noreferrer'>this tutorial</a> by <a href='https://www.youtube.com/c/EdRohDev' target='_blank' rel='noreferrer'>EdRoh</a></p>

                </div>
            </div>
        </div>
    )
}

export default Modal;