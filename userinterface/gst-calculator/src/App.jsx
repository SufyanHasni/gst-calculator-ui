
import { useState } from "react";
import "./App.css";

function App() {
  const [amounts, setAmounts] = useState([]);
  const [inputAmount, setInputAmount] = useState("");

  // Add new amount
  const addAmount = () => {
    const amount = Number(inputAmount);

    if (inputAmount === "" || amount <= 0) {
      return;
    }

    setAmounts([...amounts, amount]);
    setInputAmount("");
  };

  // Delete amount
  const deleteAmount = (indexToDelete) => {
    setAmounts(
      amounts.filter((_, index) => index !== indexToDelete)
    );
  };

  // Calculate subtotal
  const subtotal = amounts.reduce(
    (total, amount) => total + amount,
    0
  );

  // Calculate GST rate
  let gstRate = 0;

  if (subtotal < 1000) {
    gstRate = 0;
  } else if (subtotal <= 2000) {
    gstRate = 5;
  } else {
    gstRate = 3;
  }

  // Calculate GST amount
  const gstAmount = (subtotal * gstRate) / 100;

  // Calculate final total
  const grandTotal = subtotal + gstAmount;

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <h1>GST Calculator</h1>
          <p>Calculate your total amount with GST</p>
        </div>

        <div className="gst-badge">
          GST
        </div>
      </header>


      {/* Main Calculator */}
      <main className="calculator">

        {/* Add Amount Section */}
        <section className="add-section">

          <div className="section-title">
            <h2>Add Amount</h2>
            <span>Step 1</span>
          </div>

          <div className="input-row">

            <div className="input-wrapper">
              <span>Rs.</span>

              <input
                type="number"
                value={inputAmount}
                onChange={(e) =>
                  setInputAmount(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addAmount();
                  }
                }}
                placeholder="Enter amount"
              />
            </div>

            <button
              className="add-btn"
              onClick={addAmount}
            >
              + Add Amount
            </button>

          </div>

        </section>


        {/* Amount List */}
        <section className="amount-section">

          <div className="section-title">
            <div>
              <h2>Amounts</h2>
              <p>
                {amounts.length}{" "}
                {amounts.length === 1 ? "item" : "items"} added
              </p>
            </div>

            <span>Step 2</span>
          </div>


          <div className="amount-list">

            {amounts.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  +
                </div>

                <h3>No amounts yet</h3>

                <p>
                  Add an amount above to start calculating
                </p>

              </div>

            ) : (

              amounts.map((amount, index) => (

                <div
                  className="amount-item"
                  key={index}
                >

                  <div className="amount-number">
                    <span>
                      {index + 1}
                    </span>

                    <strong>
                      Rs. {amount.toLocaleString()}
                    </strong>
                  </div>


                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteAmount(index)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))

            )}

          </div>

        </section>


        {/* Calculation */}
        <section className="calculation-section">

          <div className="section-title">
            <div>
              <h2>Calculation</h2>
              <p>Your final GST breakdown</p>
            </div>

            <span>Step 3</span>
          </div>


          <div className="summary">

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>
                Rs. {subtotal.toLocaleString()}
              </strong>
            </div>


            <div className="summary-row">
              <span>GST Rate</span>

              <strong className="gst-rate">
                {gstRate}%
              </strong>
            </div>


            <div className="summary-row">
              <span>GST Amount</span>

              <strong>
                Rs. {gstAmount.toLocaleString()}
              </strong>
            </div>


            <div className="divider"></div>


            <div className="total-row">
              <div>
                <span>Grand Total</span>
                <small>Including GST</small>
              </div>

              <strong>
                Rs. {grandTotal.toLocaleString()}
              </strong>
            </div>

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer>
        <p>Simple • Fast • Accurate</p>
      </footer>

    </div>
  );
}

export default App;
