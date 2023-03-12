import server from "./server";
import  { keccak256 } from "ethereum-cryptography/keccak";
import * as secp  from "ethereum-cryptography/secp256k1";
import { utf8ToBytes,toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, phrase,setPhrase}) {
  async function onChange(evt) {
    const phrase =evt.target.value;
     setPhrase(phrase)
    const address= toHex(secp.getPublicKey(keccak256(utf8ToBytes(phrase))));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);

      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
       secret phrase
        <input placeholder="type your secret phrase" value={phrase} onChange={onChange}></input>
      </label>
        <div>
          address={address.slice(0,10)}....
        </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
