import Web3 from "web3";
import abi from "./abis/abi.json";
import marketAbi from './abis/market.json'
import IERC20 from "./abis/IERC20.json";

const web3 = new Web3(
  "https://speedy-nodes-nyc.moralis.io/c63aa27dafeaf0a01db49ea9/polygon/mumbai"
);

const contract = new web3.eth.Contract(
  abi,
  "0x924e439Ea8FDB8fCb6De5C24AD700a80Ce189815"
);

const market = new web3.eth.Contract(marketAbi,'0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca')

const token = new web3.eth.Contract(
  IERC20,
  "0x04C8CAE730CB0509aF63F0792c024ACE2da20891"
);

const ethereum = window.ethereum;

export async function getGariBalance(){
  if (typeof ethereum !== "undefined" && ethereum !== "") {
    const balance = await token.methods.balanceOf(
        ethereum.selectedAddress
      ).call();
    return balance
  }
}

export async function getItems() {
  const supply = await contract.methods.totalSupply().call();
  let items = [];
  for (let i = 1; i <= supply; i++) {
    const x = await contract.methods.tokenURI(i).call();
    items.push({
      link:x,
      owner: await contract.methods.ownerOf(i).call(),
      price: await market.methods.prices(i).call()
    })
  }
  return items;
}

export async function approvalStatus() {
  if (typeof ethereum !== "undefined" && ethereum !== "") {
    const allowance = await token.methods.allowance(
        ethereum.selectedAddress,
        "0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca"
      ).call();
      const nftAllowance = await contract.methods.isApprovedForAll(ethereum.selectedAddress,'0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca').call()
    return [allowance,nftAllowance];
  }
}

export async function approve() {
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      const tx = token.methods
        .approve(
          "0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca",
          "100000000000000000000000000000"
        )
        .encodeABI();
      const transactionParameters = {
        to: "0x04C8CAE730CB0509aF63F0792c024ACE2da20891",
        from: ethereum.selectedAddress,
        data: tx,
      };
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export async function buy(id) {
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      const tx = market.methods.buy(id).encodeABI();
      const transactionParameters = {
        to: "0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca",
        from: ethereum.selectedAddress,
        data: tx,
      };
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export async function create(uri, price) {
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      const tx = market.methods
        .create(uri, web3.utils.toWei(price))
        .encodeABI();
      const transactionParameters = {
        to: "0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca",
        from: ethereum.selectedAddress,
        data: tx,
      };
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export async function getCreators() {
  const count = await market.methods.creatorCount().call();
  let items = [];
  for (let i = 1; i <= count; i++) {
    const x = await market.methods.allCreators(i).call();
    items.push({
      address: x,
      amount: await market.methods.creatorPoolAmts(x).call(),
      Reward: await market.methods.rewards(x).call(),
    });
  }
  return items;
}

export async function stake(creator, amt) {
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      const tx = market.methods
        .stake(creator, web3.utils.toWei(amt))
        .encodeABI();
      const transactionParameters = {
        to: "0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca",
        from: ethereum.selectedAddress,
        data: tx,
      };
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export async function withdraw(creator) {
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      const tx = market.methods.withdraw(creator).encodeABI();
      const transactionParameters = {
        to: "0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca",
        from: ethereum.selectedAddress,
        data: tx,
      };
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export async function approveSale(){
  try {
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      const tx = contract.methods.setApprovalForAll('0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca',true).encodeABI();
      const transactionParameters = {
        to: "0xC29D7ac7488C832Ad7Ca7270d53ceafE0DCF78Ca",
        from: ethereum.selectedAddress,
        data: tx,
      };
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } else {
      console.log("Please install MetaMask!");
    }
  } catch (e) {
    console.log(e.message);
  }
}
