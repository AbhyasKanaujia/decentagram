import { useEffect, useState } from 'react'
import Web3 from 'web3'

import { loadWeb3, loadBlockChainData } from './web3Functions'

import { Navbar, Loader } from './components'

import Container from 'react-bootstrap/Container'

import './App.css'

function App() {
  const [loading, setLoading] = useState(false)

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
