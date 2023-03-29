import React,{useState} from "react";
import { token } from "../../../declarations/token";
import {Principal} from "@dfinity/principal"

function Balance() {
  const [principalId, setPrincipleID] = useState("");
  const [balance, setBalance] = useState("");

  const [symbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  

  function handlePrincipleID(event) {
    const value = event.target.value;
    setPrincipleID(value);
  }

  async function handleClick() {
    
    // Translate string to principle
    const principal = Principal.fromText(principalId)
    
    // give to tokenbalance
    const amount = await token.balanceOf(principal);
    console.log(amount.toLocaleString());
    setBalance(amount.toLocaleString());

    setSymbol(await token.getSymbol());
    setHidden(false)
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principalId}
          onChange={handlePrincipleID}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balance} {symbol}.</p>
    </div>
  );
}

export default Balance;
