import { useEffect, useState } from 'react'
import Web3 from 'web3'

import { Navbar, Loader } from './components'

import Decentagram from './abis/Decentagram.json'

import Container from 'react-bootstrap/Container'

import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')
  const [decentagram, setDecentagram] = useState(null)
  const [images, setImages] = useState([])
  const [imageCount, setImageCount] = useState(0)

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentagram.networks[networkId]
    if (networkData) {
      const decentagram = new web3.eth.Contract(
        Decentagram.abi,
        networkData.address
      )
      setDecentagram(decentagram)
      const imageCount = await decentagram.methods.imageCount().call()
      setImageCount(imageCount)
      setLoading(false)
    } else {
      window.alert('Decentagram contract not deployed to detected network')
    }
  }

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Navbar account={account} />
      <Container className="py-3">
        {loading ? <Loader /> : <main>Edit App.js to start working</main>}
      </Container>
    </div>
  )
}

export default App
