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
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/playerslist" element={<EnhancedTable />} />
                    <Route path="/accountlist" element={<AccountList />} />
                    <Route path="/teamlist" element={<Teamowners />} />
                    <Route path="/auction" element={<Auction />} />
                    <Route path="/manage" element={<ManageEntities />} />
                    <Route path="/auction3" element={<Dashboard />} />
                    <Route path="/sidebar" element={<Sidebar />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/accountdetail" element={<Accountdetail />} />
                    <Route path="/squaddetail" element={<Squaddetail />} />
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
