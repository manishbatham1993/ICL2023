// @mui
import PropTypes from 'prop-types'
import { alpha, styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import Iconify from './Iconify'

const fTotal = (x) => {
  if (x === null) return 'N/A'
  if (x === undefined) return 'N/A'
  return x
}

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}))

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
  sx: PropTypes.object,
}

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        bgcolor: '#27293d',
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: color,
          backgroundImage: (theme) =>
            `linear-gradient(135deg,
               ${alpha(color, 0)} 0%, ${alpha(color, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>
      <Typography variant="h3">{fTotal(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  )
}
