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
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Countdown />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/playerslist" element={<EnhancedTable />} />
          <Route path="/accountlist" element={<AccountList />} />
          <Route path="/teamlist" element={<Teamowners />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/manage" element={<ManageEntities />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/accountdetail" element={<Accountdetail />} />
          <Route path="/squaddetail" element={<Squaddetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
