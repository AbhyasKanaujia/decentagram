import { useEffect, useState } from 'react'
import Web3 from 'web3'

import { Navbar, Loader } from './components'

import Container from 'react-bootstrap/Container'

import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState('')
  const [error, setError] = useState('')

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(accounts[0])
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
        }

        // if not pending then something else wrong
        if (error.code !== -32002) {
          setError(error)
          alert(error.message)
        }
      }
    }
  }

  useEffect(() => {
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
