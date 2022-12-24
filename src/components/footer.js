import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function Footer() {
  return (
    // <footer className="footer" style={{ flexShrink:0}}>
    //   <Container>
    //     <div>©Incedo Cricket League@2022 All right reserved</div>
    //   </Container>
    // </footer>

    <Paper sx={{marginTop: 'calc(10% + 60px)',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    flex : '1 0 auto'
    }} component="footer" square>
      <Container maxWidth="lg">
                
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 2,
          }}
        >
          <Typography variant="caption" color="white">
          ©Incedo Cricket League @2022 All right reserved
          </Typography>
        </Box>
      </Container>
    </Paper>
  )
}

export default Footer
