import Spinner from 'react-bootstrap/Spinner'

import './loader.css'

const Loader = () => {
  return (
    <div
      style={{ height: '90vh' }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Spinner animation="grow" className="m-3" />
      <h1>Loading</h1>
    </div>
  )
}

export default Loader
