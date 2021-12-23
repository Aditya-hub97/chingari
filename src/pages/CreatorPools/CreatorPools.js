import React, { useState, useEffect } from "react";
import "./CreatorPools.css";
import { getCreators,stake,withdraw } from "../../functions/functions";

const CreatorPools = () => {
  const [creatorData, setCreatorData] = useState(null);
  const [inputData, setInputData] = useState(null);
  useEffect(async () => {
    await getCreators().then((res) => setCreatorData(res));
  }, []);

  const onInput = (e) => {
    setInputData(e.target.value);
  };

  return (
    <div className="creator-pool-whole">
      <h1 className="main-head-createp">Creator Pools</h1>

      {creatorData == null || creatorData == 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="creatorp-card-grid">
            {creatorData.map((da, index) => (
              <div className="creator-pool-card">
                <div className="rewards-holder">
                  <h4>Rewards</h4>
                  <h6>{creatorData[index].Reward}</h6>
                </div>
                <div className="address-holder">
                  <h4>Creator</h4>
                  <h6>{creatorData[index].address}</h6>
                </div>
                <div className="amount-holder">
                  <h4>Amount Staked By you</h4>
                  <h6>{creatorData[index].amount/(10**15)}</h6>
                </div>
                <input
                  className="text-input"
                  type="text"
                  placeholder="Enter Amount to Stake"
                  onChange={onInput}
                />
                <div className="buttons-holder">
                  <button className="btn" onClick={()=>{stake(creatorData[index].address,inputData)}}>Stake</button>
                  <button className="btn">Button 2</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CreatorPools;
