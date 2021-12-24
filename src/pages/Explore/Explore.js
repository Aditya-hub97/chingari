import React, { useState, useEffect } from "react";
import "./Explore.css";
import Card from "../../components/Cards/Card";
import { useWeb3React } from "@web3-react/core";
import { getItems, buy, getCreators } from "../../functions/functions";
import axios from "axios";

const Explore = () => {
  const { account } = useWeb3React();

  // const [items, setItems] = useState([]);
  const [local, setLocal] = useState([]);

  useEffect(async () => {
    await getItems().then((res) => {
      // for (let i = 0; i < res.length; i++) {
      //   cards.push(res[i]);
      // }
      setLocal(res);
    });
  }, []);

  return (
    <div className="explore-whole">
      <h1 className="main-head-explore" >Explore Collections</h1>
      {local == undefined || local == 0 ? (
        <h1 className="loading" style={{color:"white"}}>Loading...</h1>
      ) : (
        <div className="wrapper">
          {local.map((i, index) => {
            return <Card im={i} owner={i.owner} index={index+1} price={i.price/(10**10)} />;
          })}
                  

        </div>
      )}
    </div>
  );
};

export default Explore;
