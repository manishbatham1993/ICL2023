import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Confetti from 'react-confetti'
import Avatar from '@mui/material/Avatar'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Typography from '@mui/material/Typography'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertCongratulationSlide(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    // setTimeout(() => {setOpen(false); }, 10000)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Avatar
            className="center"
            sx={{ m: 1, bgcolor: 'green', width: 70, height: 70 }}
          >
            <CheckCircleIcon sx={{ width: 60, height: 60 }} />
          </Avatar>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            textAlign="center"
            sx={{ alignItems: 'center' }}
          >
            <Confetti width={450} height={220} />
            <Typography variant="h3" sx={{ color: 'black' }}>
              Congratulations,
            </Typography>
            <Typography variant="h5" sx={{ color: 'black' }}>
              <b>Srikant sold to Team Navic for 3000</b>
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
