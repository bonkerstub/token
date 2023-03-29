import React,{useState} from "react";
import {token, canisterId, createActor} from "../../../declarations/token"
import {Principal} from "@dfinity/principal";
import {AuthClient} from '@dfinity/auth-client/';

function Transfer(props) {
  const [transferId, setTransferID] = useState("");
  const [amount, setAmount] = useState("");
  const [transferResult, setTransferResult] = useState("")
  const [isDisabled, setDisabled] = useState(false);
  const [isHidden, setHidden] = useState(true)
   
  async function handleClick() {
    setHidden(true);
    const transferPID = Principal.fromText(transferId)
    const amountNumber = Number(amount)
    setDisabled(true);
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // // Makes the principal ID in msg.caller in motoko the authenticated user
    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });
    const status = await token.transfer(transferPID, amountNumber);
    //const status = await authenticatedCanister.transfer(transferPID, amountNumber);
    setTransferID("");
    setAmount(""); 
    setHidden(false);
    setTransferResult(status);
    setDisabled(false);
  }
  
  function handleTransferID(event) {
    setTransferID(event.target.value);
  }

  function handleAmount(event) {
    setAmount(event.target.value);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input 
                onChange={handleTransferID}
                type="text"
                id="transfer-to-id"
                value={transferId}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={handleAmount}
                value={amount}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>
          {transferResult}
        </p>
      </div>
    </div>
  );
}

export default Transfer;
