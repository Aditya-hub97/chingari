import React, { useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaRegTimesCircle } from "react-icons/fa";
import { RiWallet2Line } from "react-icons/ri";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../Wallet/connector";
import { approvalStatus, approve,getGariBalance } from "../../functions/functions";

const Navbar = () => {
  const [approvestat, setApprovestat] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const { account, activate, active } = useWeb3React();
  const [bal,setBal] = useState(null)

  const closeMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  useEffect(async () => {
    var dem = 0;
    active ? (dem = await approvalStatus()) : window.alert('connect Wallet');
    setApprovestat(dem[0]);
    getGariBalance().then(x=>{setBal(x)})
    // console.log(approvestat,"app")
  });

  function approveRender() {
    // console.log(bal,'render')
    if (active && approvestat == 0) {
      return (
        <>
          <button className="btn" onClick={approve}>
            Approve
          </button>
        </>
      );
    } else {
      return <></>;
    }
  }

  async function connect() {
    try {
      await activate(injected);
      if (window.ethereum) {
        window.alert("Connected");
      } else {
        window.alert("No Web3 Wallet Found, Use web3 based Browser");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="nav-bg-main">
      <div className="nav-container">
        <div className="nav-logo">
          <Link className="main-link"
            to="/"
            exact
            style={{ textDecoration: "inherit", color: "white" }}
          >
            Creator MarketPlace
          </Link>
        </div>
        <h3 className="sub-link1"style={{color:"white"}}>Your GARI balance is {bal && bal/(10**18)}</h3>

        <ul className={isMobile ? "mobile-menu" : "nav-menu"}>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="/"
            exact
          >
            <li className="list-item">Explore</li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="/creatorpools"
          >
            <li className="list-item">Creator Pools</li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="/create"
          >
            <li className="list-item">Create</li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="/profile"
          >
            <li className="list-item">Profile</li>
          </Link>
          {/* {active&&approvestat==0?console.log("t",approvestat):console.log(active,approvestat==0,"f",approvestat)} */}
          {/* {active&&approvestat==0?(<button onClick={approve} className="cnct-wallet-btn">Approve</button>):(<></>)} */}
          {approveRender()}
          {isMobile ? (
            active ? (
              <button className="mobile-wallet-btn-connected">Connected</button>
            ) : (
              <button className="mobile-wallet-btn" onClick={() => connect()}>
                Connect Wallet
              </button>
            )
          ) : (
            <button className="cnct-wallet-btn"  onClick={() => connect()}>
              <RiWallet2Line />
            </button>
          )}
        </ul>
        <button onClick={() => connect()} className="mobile-menu-btn">
          {isMobile ? <FaRegTimesCircle /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
