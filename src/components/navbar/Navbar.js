import './navbar.css'

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import BsNavbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Navbar = ({ account }) => {
  return (
    <BsNavbar bg="light" expand="md">
      <Container>
        <BsNavbar.Brand id="logo">Decentagram</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbar" />
        <BsNavbar.Collapse id="navbar">
          <Nav className="ms-auto text-secondary small d-flex align-items-center">
            <small className="mx-1">{account}</small>
            {account && (
              <Jazzicon diameter={30} seed={jsNumberForAddress(account)} />
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
