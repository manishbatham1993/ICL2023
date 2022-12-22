import logo from './logo.svg'
import './App.css'
import ResponsiveAppBar from './components/navigationbar.js'
import SignIn from './components/signin.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EnhancedTable from './components/playerslist'
import AccountList from './components/accountslist'
import Footer from './components/footer'
import Teamowners from './components/teams'
import Auction from './components/auction'
import ManageEntities from './components/manageEntities/ManageEntities'
import Dashboard from './components/auction3'
function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/playerslist" element={<EnhancedTable />} />
          <Route path="/accountlist" element={<AccountList />} />
          <Route path="/teamlist" element={<Teamowners />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/manage" element={<ManageEntities />} />
          <Route path="/auction3" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
