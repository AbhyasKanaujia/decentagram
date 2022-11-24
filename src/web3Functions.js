const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.alert('Non-Ethereum browser. Please install MetaMask.')
  }
}

const loadBlockChainData = async () => {}

export { loadWeb3, loadBlockChainData }
