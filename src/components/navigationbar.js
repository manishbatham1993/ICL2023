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

const pages = ['Accounts', 'Team Owners', 'Player List']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

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
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/teamlist"
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
              href="/manage"
            >
              Manage
            </Button>
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              href="/auction3"
            >
              Auction
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="../assets/img/Srikant.jpg" />
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                href="/signin"
              >
                Logout
              </Button>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
