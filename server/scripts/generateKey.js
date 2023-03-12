const { keccak256 } = require("ethereum-cryptography/keccak");
const secp= require("ethereum-cryptography/secp256k1");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");
const bytes1 = utf8ToBytes("Rocket Rikshaw Parrot");
const bytes2 = utf8ToBytes("Box Ball Plate");
const bytes3 = utf8ToBytes("Salt Butter Keep");

const privateKey1 = keccak256(bytes1);
const privateKey2 = keccak256(bytes2);
const privateKey3 = keccak256(bytes3);
const publicKey1 = secp.getPublicKey(privateKey1);
const publicKey2 = secp.getPublicKey(privateKey2);
const publicKey3 = secp.getPublicKey(privateKey3);
console.log("privateKey1:"+toHex(privateKey1));
console.log("publickey1:"+toHex(publicKey1));
console.log("privateKey2:"+toHex(privateKey2));
console.log("Publickey2:"+toHex(publicKey2));
console.log("privateKey3:"+toHex(privateKey3));
console.log("Publickey3:"+toHex(publicKey3));
