import React, {useEffect}from "react";
import "./Create.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../components/Wallet/connector";
import {create} from '../../functions/functions'


const Create = () => {

  const { account, activate, chainId, active, connector } = useWeb3React();
  async function connect() {
    try {
      await activate(injected);
      if (window.ethereum) {
          if(active){
          console.log("Connected");
          console.log(active,"inside")
        }else{
          console.log(active,"out")
        }    
    
      } else {
        console.log("No Web3 Wallet Found, Use web3 based Browser");
      }
    } catch (error) {
      console.log(error);
    }
  }

  var demo=()=>{
    console.log(active,"btn")
  }
  

  return (
    <>
      <div className="first-comp">
        <div className="connect-wallet-container">
          <h2 className="connect-wallet-head">Connect your wallet.</h2>
          <h3 className="connect-wallet-text-tag">
            Connect with one of our available
            <a
              className="info-link"
              href="https://support.opensea.io/hc/en-us/articles/1500007978402-Wallets-supported-by-OpenSea"
              target="_blank"
            >
              {" "}
              wallet ⓘ
            </a>{" "}
            providers or create a new one.
          </h3>
          <div className="wallets-holder">
            <button className="wallet-button first-wallet-btn" onClick={()=>connect()}>MetaMask</button>
            <button className="wallet-button"onClick={()=>demo()}>Coinbase Wallet</button>
            <button className="wallet-button">WalletConnect</button>
            <button className="wallet-button last-wallet-btn">Fortmatic</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
