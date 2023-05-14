import { useContext, useEffect, useState } from "react";
import "./App.css";

import { ShopValues, UpdateShopValues } from "./shopContext";
import Smartphone from "./smartphone";

function App() {
  const myValues = useContext(ShopValues);
  const deleteSmartphones = useContext(UpdateShopValues);
  const quantity = myValues.reduce((a, b) => a + b["phone-quantity"], 0);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const timeOutToRemoveFakeLoading = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => clearTimeout(timeOutToRemoveFakeLoading);
  }, [fakeLoading]);

  if (fakeLoading) {
    return <h1 className="fake-loading">Loading...📱</h1>;
  }

  return (
    <>
      <div className="page-wrapper">
        <nav className="navbar">
          <div>
            <h1>Cart App</h1>
          </div>
          <div className="cart-icon">
            <img src={"/shopping-bag-icon.svg"}></img>
            <p className="counter">{quantity}</p>
          </div>
        </nav>

        <section className="shopping-section">
          <header>YOUR BAG</header>

          {myValues.length !== 0 ? (
            <>
              <div className="items">
                {myValues.map((smartphone) => (
                  <Smartphone
                    key={smartphone.id}
                    id={smartphone.id}
                    name={smartphone["phone-model"]}
                    price={smartphone["phone-price"]}
                    imgAddress={smartphone["phone-img-address"]}
                  />
                ))}
              </div>

              <hr className="hr-tag"></hr>
              <div className="pricing">
                <h4>Total</h4>
                <h4>
                  $
                  {Math.round(
                    (myValues.reduce(
                      (a, b) => a + b["phone-price"] * b["phone-quantity"],
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100}
                </h4>
              </div>

              <button
                className="clear-cart"
                onClick={() => deleteSmartphones([])}
              >
                CLEAR CART
              </button>
            </>
          ) : (
            <p className="empty">is currently empty</p>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
