import PropTypes from 'prop-types'
import ReactApexChart from 'react-apexcharts'

// @mui
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh'

// components
import useChart from './useChart'

AppWebsiteTraffic.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default function AppWebsiteTraffic({
  title,
  chartLabels,
  chartData,
  dateFormatter,
  datasetOptions,
  selectedOption,
  onSelectOption,
  onRefresh,
  ...other
}) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: dateFormatter,
        style: { colors: 'rgba(255, 255, 255, 0.7)' },
      },
    },
    yaxis: {
      labels: { style: { colors: 'rgba(255, 255, 255, 0.7)' } },
    },
    legend: {
      labels: { colors: '#fff' },
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: dateFormatter,
      },
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`
          }
          return y
        },
      },
    },
  })

  return (
    <Card sx={{ bgcolor: '#27293d' }} {...other}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          sx={{ color: 'white', flexGrow: 1 }}
          title={title}
          // subheaderTypographyProps={{ color: 'rgba(255, 255, 255, 0.72)' }}
          // subheader={subheader}
        />
        <Select
          size="small"
          sx={{
            margin: 'auto 0',
            minWidth: '25%',
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: 'white !important',
            },
          }}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedOption}
          onChange={(e) => {
            onSelectOption(e.target.value)
          }}
          displayEmpty
          label="Dataset"
        >
          {datasetOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <em>{option.name}</em>
            </MenuItem>
          ))}
        </Select>
        {onRefresh && (
          <Button
            sx={{ margin: 'auto 1rem' }}
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
          >
            Refresh
          </Button>
        )}
      </Box>

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  )
}
