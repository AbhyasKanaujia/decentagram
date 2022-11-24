# Decentagram

This project is being done according to [a tutorial by dapp university](https://www.youtube.com/watch?v=8rhueOcTu8k)

## Instagram

- Instagram has a single web sever that hosts all the files.
- The people who control instagram have full control over the plaform.
- They can censor content and make specific conetet surface to more users.

## Decentagram

- Decentagram works on the blockchain
- The files are stored in IPFS
- There is a clear and transparent algorithm used to show content to the user.

## Requirement for this Project

1. **Node.js.** Used to install packages and run the client side application.
2. **Truffle Framework.** A framework for creating etherium smart contract. Write, test and deploy.
3. **Ganache.** Personal blockchain for testing.
4. **Metamask.** Since browser do not directly connect to the blockchain, we use this to extend the browser.

## Initial Setup

1. `npx create-react-app .`
2. `truffle init`
3. Configure _truffle-config.js_
4. Install required packages:
   1. `npm i bootstrap react-bootstrap identicon.js`
   2. `npm i chai chai-as-promised chai-bignumber`
   3. `npm i ipfs-http-client`
   4. `npm i truffle web3`
   5. `npm i -D gh-pages`
5. Add _Migration.sol_ and _1_initial_migration.js_
6. Cleanup unnecessary files from react project
7. Add Navbar component
8. `npm start` Should show a working frontend

## Testing if truffle is setup

1. Create a new contract _Decentagram.sol_ in _contracts_ directory. 
2. Create a _2\_deploy\_contracts.js_ in _migrations_
3. Launch Ganache
5. $ `truffle console`
4. \> `migrate --reset`
5. \> `decentagram = await Decentagram.deployed()`. This should show the contract details in a JSON. 
7. \> `await decentagram.address` returns the address of the contract

## Creating a test

1. Add _test.js_ in _test_
2. $ `truffle console`
3. \> `test`



