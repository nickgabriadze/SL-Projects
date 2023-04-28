import { useState } from "react";
import data from "./data";
import "./App.css";

const App = () => {
  const [tracker, setTracker] = useState(3);

  return (
    <div className="outliner">
      <div className="title">
        <h1>Our Reviews</h1>
        <hr className="weird-border" />
      </div>

      <div className="reviewer-box">
        <section className="picture-section">
          <img className="picture" src={data[tracker].image}></img>
          <div className="default-background"></div>
          <img src={"/quotation-icon.svg"} className="quotation-mark"></img>
        </section>

        <section className="briefly">
          <h2 className="name">{data[tracker].name}</h2>
          <p className="position">{data[tracker].job.toUpperCase()}</p>
        </section>

        <section className="description">
          <p>{data[tracker].text}</p>
        </section>

        <section className="buttons">
          <div className="left-right">
            <button
              onClick={() => {
                if (tracker > 0) {
                  setTracker((current) => current - 1);
                }
              }}
            >
              <img src={"/left-icon.svg"}></img>
            </button>
            <button
              onClick={() => {
                if (tracker < data.length - 1) {
                  setTracker((current) => current + 1);
                }
              }}
            >
              <img src={"/right-icon.svg"}></img>
            </button>
          </div>

          <div className="surprise-btn">
            <button
              onClick={() => {
                setTracker(Math.floor(Math.random() * 4));
              }}
            >
              <p>Surprise Me</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
