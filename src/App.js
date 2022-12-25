import React, { useContext } from 'react'
import AuthContext from './store/auth-context'

import './App.css'
import ResponsiveAppBar from './components/navigationbar.js'
import SignIn from './components/signin.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EnhancedTable from './components/playerslist'
import AccountList from './components/accountslist'
import Footer from './components/footer'
import Teamowners from './components/teams'
import Auction from './components/auction'
import Overview from './components/overview'
import ManageEntities from './components/manageEntities/ManageEntities'
import Countdown from './components/countdown'
import Accountdetail from './components/accountdetails'
import Squaddetail from './components/squaddetails'

function App() {
  const authCtx = useContext(AuthContext)

  let auctionElement = <SignIn />
  if (authCtx.isLoggedIn) {
    if (authCtx.role === 'owner' || authCtx.role === 'admin') {
      auctionElement = <Auction />
    } else {
      auctionElement = <Countdown />
    }
  } else {
    auctionElement = <SignIn />
  }

  let manageElement = <SignIn />
  if (authCtx.isLoggedIn) {
    if (authCtx.role === 'admin') {
      manageElement = <ManageEntities />
    } else {
      manageElement = <Countdown />
    }
  } else {
    manageElement = <SignIn />
  }

  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Countdown />} />
          <Route path="/signin" element={<SignIn />} />

          
          <Route
            path="/playerslist"
            element={authCtx.isLoggedIn ? <EnhancedTable /> : <SignIn />}
          />
          <Route
            path="/accountlist"
            element={authCtx.isLoggedIn ? <AccountList /> : <SignIn />}
          />
          <Route
            path="/teamlist"
            element={authCtx.isLoggedIn ? <Teamowners /> : <SignIn />}
          />
          <Route
            path="/overview"
            element={authCtx.isLoggedIn ? <Overview /> : <SignIn />}
          />
          <Route
            path="/accountdetail/:id"
            element={authCtx.isLoggedIn ? <Accountdetail /> : <SignIn />}
          />
          <Route
            path="/squaddetail/:id"
            element={authCtx.isLoggedIn ? <Squaddetail /> : <SignIn />}
          />
          <Route path="/auction" element={auctionElement} />
          <Route path="/manage" element={manageElement} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
