import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import classNames from '../public/style.css'

const App = () => {
  return (
    <div>
      {/* <h1 className={classNames.titleH1}>MUGSHOP☕</h1> */}
      <h1 className={classNames.titleH1}>
        <img src="../public/imgs/mugshop.jpg" />
      </h1>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
