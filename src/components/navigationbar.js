import * as React from 'react'
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
import AdbIcon from '@mui/icons-material/Adb'
import AuthContext from '../store/auth-context'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from './ICL_Logo.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const pages = ['Overview', 'Players', 'Teams', 'Auction']
const profile = ['Logout']

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

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
            {authCtx.isLoggedIn && (
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      to={`/${page}`}
                      style={{ color: 'black', textDecoration: 'none' }}
                    >
                      {page}
                    </Link>
                  </MenuItem>
                ))}
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
              </Menu>
            )}
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

            {authCtx.isLoggedIn &&
              pages.map((page) => (
                <Link
                  key={page}
                  to={`/${page}`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            {authCtx.role === 'admin' && (
              <Link
                to="Manage"
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
          </Box>
          {authCtx.isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={authCtx.user === null ? 'No Name' : authCtx.user.email}
                    src={`${BASE_URL}/${authCtx.imageUrl}`}
                  />
                  <Typography sx={{ padding: '15px' }}>
                    {authCtx.user === null ? 'No Name' : authCtx.user.email}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>

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
                {profile.map((menu) => (
                  <Button onClick={handleCloseUserMenu}>
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
