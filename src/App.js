import { useEffect, useState } from 'react'
import Web3 from 'web3'

import { Navbar, Loader } from './components'

import Container from 'react-bootstrap/Container'

import './App.css'

function App() {
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    loadWeb3()
  }, [])

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Navbar />
      <Container className="py-3">
        {loading ? <Loader /> : <main>Edit App.js to start working</main>}
      </Container>
    </div>
  )
}

export default App
