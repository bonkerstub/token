import React, {useState} from "react";
import {token,canisterId, createActor} from "../../../declarations/token"
import {AuthClient} from '@dfinity/auth-client/';

function Faucet(props) {
  const [buttonText, setButtonText] = useState("Gimme Gimme");
  const [isDisabled, setDisabled] = useState(false);

  async function handleClick(event) {
    setDisabled(true);

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // // Makes the principal ID in msg.caller in motoko the authenticated user
    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    // const result = await authenticatedCanister.payOut();
    
    // Uses the anonymouse user ID
    const result = await token.payOut();
    
    setButtonText(result);
    setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      {/* <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to {props.userPrincipal}.</label> */}
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to 2vxsx-fae.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
