import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";
import { buy } from "../../functions/functions";

function Card({ im, owner, index,price }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(im.link).then((res) => {
      setData(res.data);
    });
  }, []);

  if (data == undefined) {
    return null;
  } else {
    return (
      <>
        <div className="card">
          {data.image.includes("mp4") ? (
            <video
              autoPlay
              muted
              className="upper-container"
              src={data.image}
              controls
            ></video>
          ) : (
            <img src={data.image} className="upper-container">
            </img>
          )}

          <div className="lower-container">
            <h2 className="owner-head">{owner}</h2>
            <h4 className="name-head">{data.name}</h4>
            <p className="descr">{price}</p>
            <h6 className="value-head">
              {data.attributes.map((r) => r.value)}
            </h6>
            <div className="buttons">
              <button onClick={()=>buy(index)} className="btn">
                Buy
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Card;
