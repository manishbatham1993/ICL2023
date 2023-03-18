import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Grid, Container } from '@mui/material'

// sections
import AppWidgetSummary from './AppWidgetSummary'
import AppUserDistribution from './AppUserDistribution'
import AppWebsiteTraffic from './AppWebsiteTraffic'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const DATASET_OPTIONS = [
  { name: 'Past 30 days (overall)', value: '30d' },
  { name: 'Current Day (new)', value: 'cd' },
  { name: 'Past Hour (new)', value: '1h' },
]
const TIME_FORMATTER = (x) => {
  return new Date(x).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
}
const DAY_FORMATTER = (x) => {
  return new Date(x).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export default function DashboardAppPage() {
  // fetched states
  const [statistics, setStatistics] = useState({})
  const [clientsCount, setClientsCount] = useState()
  const [monthDataset, setMonthDataset] = useState([])
  const [dayDataset, setDayDataset] = useState([])

  // configured states
  const [selectedOption, setSelectedOption] = useState('30d')
  const selectedDateFormatter =
    selectedOption === '30d' ? DAY_FORMATTER : TIME_FORMATTER
  const [selectedDataset, setSelectedDataset] = useState([])

  // fetch all data
  const fetchAllData = () => {
    const api = BASE_URL + '/api/v1/analytic/get/all'
    axios.get(api).then((res) => {
      setStatistics(res?.data?.statistic)
      setClientsCount(res?.data?.clientsCount)
      setMonthDataset(res?.data?.monthDataset)
      setDayDataset(res?.data?.dayDataset)
    })
  }

  const fetchClientsCount = () => {
    const api = BASE_URL + '/api/v1/analytic/get/clientscount'
    axios.get(api).then((res) => {
      if (res?.data?.count) {
        setClientsCount(res.data.count)
      }
    })
  }

  useEffect(() => {
    fetchAllData()
    // updating data each 5 min
    const interval = setInterval(() => {
      fetchAllData()
    }, 5 * 60 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    switch (selectedOption) {
      case '30d':
        setSelectedDataset(monthDataset)
        break
      case 'cd':
        setSelectedDataset(dayDataset)
        break
      case '1h':
        const oneHourAgo = new Date(Date.now() - 3600000)
        const dataset = dayDataset.filter((data) => {
          const date = new Date(data.date)
          return date >= oneHourAgo
        })
        setSelectedDataset(dataset)
        break
    }
  }, [selectedOption, monthDataset, dayDataset])

  return (
    <>
      <Container maxWidth="xl" sx={{ my: '1rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Mobile Visitors"
              total={statistics?.mobileVisitors}
              color="#ED6C02"
              icon={'ant-design:android-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Desktop Visitors"
              total={statistics?.desktopVisitors}
              color="#0288D1"
              icon={'ant-design:desktop-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Views"
              total={statistics?.views}
              color="#02AABD"
              icon={'ant-design:eye-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Connected Clients"
              total={clientsCount}
              color="#fff"
              icon={'ant-design:usergroup-add-outlined'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppUserDistribution
              title="User Distribution"
              chartData={[
                { label: 'Mobile', value: statistics?.mobileVisitors || 0 },
                { label: 'Desktop', value: statistics?.desktopVisitors || 0 },
              ]}
              chartColors={['#ED6C02', '#0288D1']}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteTraffic
              title="Website Traffic"
              chartLabels={selectedDataset.map((doc) => doc.date)}
              chartData={[
                {
                  name: 'Mobile Visitors',
                  type: 'line',
                  fill: 'solid',
                  color: '#ED6C02',
                  data: selectedDataset.map((doc) => doc.mobileVisitors),
                },
                {
                  name: 'Desktop Visitors',
                  type: 'line',
                  fill: 'solid',
                  color: '#0288D1',
                  data: selectedDataset.map((doc) => doc.desktopVisitors),
                },
                {
                  name: 'Views',
                  type: 'area',
                  fill: 'gradient',
                  color: '#02AABD',
                  data: selectedDataset.map((doc) => doc.views),
                },
              ]}
              datasetOptions={DATASET_OPTIONS}
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
              dateFormatter={selectedDateFormatter}
              onRefresh={fetchAllData}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
