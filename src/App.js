import React, { useContext } from 'react'
import AuthContext from './store/auth-context'

import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
import Dashboard from './components/auction'
import Sidebar from './components/sidebar.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <ResponsiveAppBar />
          <Box
          component="main"
          >
            <Container maxWidth="xl">
              <Grid
                container
              >
                <Grid
                  item
                  lg={2}
                  md={3}
                  xs={3}
                >
                  <Sidebar />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={9}
                  xs={9}
                  sx={{
                    mt:8
                  }}
                >
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
            path="/accountdetail"
            element={authCtx.isLoggedIn ? <Accountdetail /> : <SignIn />}
          />
          <Route
            path="/squaddetail"
            element={authCtx.isLoggedIn ? <Squaddetail /> : <SignIn />}
          />
          <Route path="/auction" element={auctionElement} />
          <Route path="/manage" element={manageElement} />
        </Routes>

                  <Footer />
              </Grid>
            </Grid>
          </Container>
          </Box>
        </Router>
        
      </div>
    </ThemeProvider>
  )
}

export default App
