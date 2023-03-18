import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import EntityContext from '../store/entity-context'
import Logo from './ICL_Logo.svg'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const profile = ['Logout']

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const LocationList = () => {
  const entityCtx = useContext(EntityContext)
  const { locations, currentLocation, setCurrentLocation } = entityCtx

  const defaultLocation = entityCtx?.configurations?.DEFAULT_LOCATION

  const handleChange = (event) => {
    setCurrentLocation(event.target.value)
  }

  useEffect(() => {
    setCurrentLocation(defaultLocation)
  }, [defaultLocation])

  return (
    <Select
      value={currentLocation || ''}
      onChange={handleChange}
      sx={{ color: 'white', margin: '1rem' }}
      variant="standard"
    >
      {locations.map((location, i) => (
        <MenuItem key={i} value={location}>
          {location}
        </MenuItem>
      ))}
    </Select>
  )
}

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const logoutHandler = () => {
    authCtx.logout()
    navigate('/Signin', { replace: true })
  }

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* This box is for mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 64,
                  mr: 2,
                }}
                alt="Logo"
                src={Logo}
              />
            </div>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', flexDirection: 'column' },
              }}
            >
              <MenuItem key="Overview" onClick={handleCloseNavMenu}>
                <Link
                  to="/overview"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Overview
                </Link>
              </MenuItem>
              <MenuItem key="Players" onClick={handleCloseNavMenu}>
                <Link
                  to="/players"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Players
                </Link>
              </MenuItem>
              <MenuItem key="Teams" onClick={handleCloseNavMenu}>
                <Link
                  to="/Teams"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Teams
                </Link>
              </MenuItem>
              <MenuItem key="Auction" onClick={handleCloseNavMenu}>
                <Link
                  to="/Auction"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Auction
                </Link>
              </MenuItem>
              <MenuItem key="topbuys" onClick={handleCloseNavMenu}>
                <Link
                  to="/topbuys"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Top Buys
                </Link>
              </MenuItem>
              {/* )} */}
              <MenuItem key="rules" onClick={handleCloseNavMenu}>
                <Link
                  to="/rules"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Rules
                </Link>
              </MenuItem>
              <MenuItem key="fixtures" onClick={handleCloseNavMenu}>
                <Link
                  to="/fixtures"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Fixtures
                </Link>
              </MenuItem>
              {authCtx.role === 'admin' && (
                <MenuItem key="Manage" onClick={handleCloseNavMenu}>
                  <Link
                    to="/Manage"
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    Manage
                  </Link>
                </MenuItem>
              )}
              {authCtx.role === 'admin' && (
                <MenuItem key="AuctionControls" onClick={handleCloseNavMenu}>
                  <Link
                    to="/auctioncontrols"
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    Auction Controls
                  </Link>
                </MenuItem>
              )}
              {authCtx.role === 'admin' && (
                <MenuItem key="analytics" onClick={handleCloseNavMenu}>
                  <Link
                    to="/analytics"
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    Analytics
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* This box is for desktop view */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Link to="/">
              <Box
                component="img"
                sx={{
                  height: 64,
                  mr: 2,
                }}
                alt="Logo"
                src={Logo}
              />
            </Link>
            <Link
              to="overview"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                key="Overview"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Overview
              </Button>
            </Link>
            <Link
              to="players"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                key="Players"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Players
              </Button>
            </Link>
            <Link to="teams" style={{ color: 'white', textDecoration: 'none' }}>
              <Button
                key="Teams"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Teams
              </Button>
            </Link>
            <Link
              to="auction"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                key="Auction"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Auction
              </Button>
            </Link>
            <Link
              to="topbuys"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                key="topbuys"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Top Buys
              </Button>
            </Link>
            {/* )} */}
            <Link to="rules" style={{ color: 'white', textDecoration: 'none' }}>
              <Button
                key="rules"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Rules
              </Button>
            </Link>
            <Link
              to="fixtures"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                key="fixtures"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Fixtures
              </Button>
            </Link>

            {authCtx.role === 'admin' && (
              <Link
                to="manage"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                <Button
                  key="Manage"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Manage
                </Button>
              </Link>
            )}
            {authCtx.role === 'admin' && (
              <Link
                to="/auctioncontrols"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                <Button
                  key="AuctionControls"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Auction Controls
                </Button>
              </Link>
            )}
            {authCtx.role === 'admin' && (
              <Link
                to="/analytics"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                <Button
                  key="Analytics"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Analytics
                </Button>
              </Link>
            )}
          </Box>
          <LocationList />

          {authCtx.isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <div style={{ display: 'flex', alignContent: 'center' }}>
                <Avatar
                  alt={authCtx.user?.email}
                  src={`${BASE_URL}/${authCtx.user?.image}`}
                />
                <Button
                  disableRipple
                  sx={{
                    textTransform: 'none',
                    '&:hover': {
                      background: 'rgb(0, 0, 0, 0.1)',
                    },
                    color: 'white',
                  }}
                  onClick={handleOpenUserMenu}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {authCtx?.user?.email}
                </Button>
              </div>

              <Menu
                sx={{ mt: '55px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {profile.map((menu, i) => (
                  <Button key={i} onClick={handleCloseUserMenu}>
                    <Link
                      style={{ color: 'black', textDecoration: 'none' }}
                      onClick={logoutHandler}
                    >
                      {menu}
                    </Link>
                  </Button>
                ))}
              </Menu>
            </Box>
          ) : (
            <Link
              style={{ color: 'white', textDecoration: 'none' }}
              to="/Signin"
            >
              <Button
                key="Login"
                onClick={handleCloseUserMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
