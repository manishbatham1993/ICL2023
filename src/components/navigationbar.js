import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../store/auth-context'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AdbIcon from '@mui/icons-material/Adb'
import Link from '@mui/material/Link'
import logo from './logo.svg'

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const handleOpenUserMenu = (event) => {}

  const logoutHandler = () => {
    authCtx.logout()
    navigate('/signin', { replace: true })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Link href="/">
            <Box component="img" sx={{ height: 54 }} alt="Incedo" src={logo} />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ICL2023
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {authCtx.isLoggedIn && (
              <React.Fragment>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href="/accountlist"
                >
                  Accounts
                </Button>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href="/playerslist"
                >
                  playerslist
                </Button>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href="/teamlist"
                >
                  Teamslist
                </Button>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href="/auction"
                >
                  Auction
                </Button>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href="/overview"
                >
                  Overview
                </Button>
                {authCtx.role === 'admin' && (
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    href="/manage"
                  >
                    Manage
                  </Button>
                )}
              </React.Fragment>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {authCtx.isLoggedIn ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="../assets/img/Srikant.jpg" />
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </IconButton>
            ) : (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={logoutHandler}
                >
                  Login
                </Button>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
