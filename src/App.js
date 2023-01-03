import React, { useContext } from 'react'
import AuthContext from './store/auth-context'

import './App.css'
import ResponsiveAppBar from './components/navigationbar.js'
import SignIn from './components/signin.js'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import AlertCongratulationSlide from './components/modal'
import Allplayer from './components/Allplayer'
import TeamDetail from './components/teamdetail'
import { Route, Routes } from 'react-router'

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
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Countdown />} />
        <Route
          path="Players"
          element={authCtx.isLoggedIn ? <Allplayer /> : <SignIn />}
        />
        <Route path="Signin" element={<SignIn />} />

        <Route
          path="/playerslist"
          element={authCtx.isLoggedIn ? <EnhancedTable /> : <SignIn />}
        />
        <Route
          path="/accountlist"
          element={authCtx.isLoggedIn ? <AccountList /> : <SignIn />}
        />
        <Route
          path="/Teams"
          element={authCtx.isLoggedIn ? <TeamDetail /> : <SignIn />}
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
        <Route path="/Auction" element={auctionElement} />
        <Route path="/Manage" element={manageElement} />
        <Route path="/modal" element={<AlertCongratulationSlide />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
