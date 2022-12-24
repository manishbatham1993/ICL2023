import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AdbIcon from '@mui/icons-material/Adb'

function ResponsiveAppBar() {

  const handleOpenUserMenu = (event) => {}
  
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography 
           sx={{
            display: { xs: 'none', md: 'flex' }
           }}>
            
            <img src={require("../assets/img/incedo-logo.png")} alt="Incedo" className='' />
           
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: {xs : 'none', md:20,},
              ml: 2,
              mt: 1,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              justifyContent: 'center'
            }}
        
          >
          CRICKET LEAGUE E-AUCTION 2023
          </Typography>

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
            <img src={require("../assets/img/incedo-logo.png")} alt="Incedo" className='' />
           
          </Typography>
          <Typography
          sx={{display: { xs: 'flex', md: 'none' }}}>
          CRICKET LEAGUE E-AUCTION 2023
          </Typography>
          
          <Box sx={{flexGrow:2 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, align: 'right' }}>
              <Avatar alt="Remy Sharp" src="../assets/img/Srikant.jpg" />
            </IconButton>
              <Button
                sx={{ mx: 2, color: 'white', align: 'right' }}
                href="/signin"
              >
                Logout
              </Button>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
