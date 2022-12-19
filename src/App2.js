import logo from './logo.svg'
import './App.css'
import ResponsiveAppBar from './components/navigationbar.js'
import SignIn from './components/signin.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import EnhancedTable from './components/teamslist'
import EnhancedTable from './components/playerslist';

import AccountList from './components/accountslist'
import ManageEntities from './components/manageEntities/ManageEntities'
import Auction from './components/auction'

function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/teamlist" element={<EnhancedTable />} />
          <Route path="/accountlist" element={<AccountList />} />
          <Route path="/manage" element={<ManageEntities />} />
          <Route path="/auction" element={<Auction />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
