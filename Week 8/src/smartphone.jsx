import { useContext, useState } from "react";
import "./App.css";
import { UpdateShopValues } from "./shopContext";

function Smartphone(props) {
  // eslint-disable-next-line react/prop-types
  const { id, name, price, imgAddress } = props;
  const updateSmartphone = useContext(UpdateShopValues);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="smartphone-wrapper">
        <div className="smartphone-desc">
          <img src={imgAddress} className="smartphone-img"  draggable={false}></img>
          <div className="actual-desc">
            <h5>{name}</h5>
            <p>${price}</p>
            <button
              className="remove-item"
              onClick={() =>
                updateSmartphone((prev) => [
                  ...prev.filter((each) => each.id !== id),
                ])
              }
            >
              remove
            </button>
          </div>
        </div>

        <div className="buttons">
          <button
            onClick={() => {
              setQuantity((current) => current + 1);
              updateSmartphone((prev) => [
                ...prev.map((each) => {
                  if (each.id === id) {
                    return {
                      ...each,
                      "phone-quantity": each["phone-quantity"] + 1,
                    };
                  } else {
                    return each;
                  }
                }),
              ]);
            }}
          >
            <img src={"/up-arrow-icon.svg"} draggable={false}></img>
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => {
              setQuantity((current) => current - 1);
              if (quantity <= 1) {
                updateSmartphone((prev) => [
                  ...prev.filter((each) => each.id !== id),
                ]);
              }

              updateSmartphone((prev) => [
                ...prev.map((each) => {
                  if (each.id === id) {
                    return {
                      ...each,
                      "phone-quantity": each["phone-quantity"] - 1,
                    };
                  } else {
                    return each;
                  }
                }),
              ]);
            }}
          >
            <img src={"/down-arrow-icon.svg"} draggable={false}></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default Smartphone;
