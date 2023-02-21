import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const EntityContext = React.createContext({
  teams: [],
  players: [],
  accounts: [],
})

export const EntityContextProvider = (props) => {
  const [accounts, setAccounts] = useState([])
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [configurations, setConfigurations] = useState({
    DEFAULT_BUDGET: 60000,
    DEFAULT_BID_AMOUNT: 5000,
    BID_INCREASE: 500,
    PLAYERS_PER_TEAM: 10,
    YEAR: '2023',
  })

  const updateAccounts = () => {
    const api = BASE_URL + '/api/v1/account'
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setAccounts(res.data.accounts)
      }
    })
  }
  const updatePlayers = () => {
    const api = BASE_URL + '/api/v1/player'
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setPlayers(res.data.players)
      }
    })
  }
  const updateTeams = () => {
    const api = BASE_URL + '/api/v1/team'
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setTeams(res.data.teams)
      }
    })
  }

  const updateConfigurations = () => {
    const api = BASE_URL + '/api/v1/config'
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        const dbConfigurations = res.data.configurations
        setConfigurations((prev) => ({
          ...prev,
          DEFAULT_BUDGET: dbConfigurations.DEFAULT_BUDGET
            ? parseInt(dbConfigurations.DEFAULT_BUDGET)
            : prev.DEFAULT_BUDGET,
          DEFAULT_BID_AMOUNT: dbConfigurations.DEFAULT_BID_AMOUNT
            ? parseInt(dbConfigurations.DEFAULT_BID_AMOUNT)
            : prev.DEFAULT_BID_AMOUNT,
          BID_INCREASE: dbConfigurations.BID_INCREASE
            ? parseInt(dbConfigurations.BID_INCREASE)
            : prev.BID_INCREASE,
          PLAYERS_PER_TEAM: dbConfigurations.PLAYERS_PER_TEAM
            ? parseInt(dbConfigurations.PLAYERS_PER_TEAM)
            : prev.PLAYERS_PER_TEAM,
          YEAR: dbConfigurations.YEAR ? dbConfigurations.YEAR : prev.YEAR,
          COUNTDOWN: dbConfigurations.COUNTDOWN
            ? dbConfigurations.COUNTDOWN
            : '2023-01-01T00:00',
          FIXTURE_ROUNDS: dbConfigurations.FIXTURE_ROUNDS
            ? parseInt(dbConfigurations.FIXTURE_ROUNDS)
            : 0,
        }))
      }
    })
  }

  useEffect(() => {
    updateAccounts()
    updatePlayers()
    updateTeams()
    updateConfigurations()
  }, [])

  const contextValue = {
    accounts,
    teams,
    players,
    configurations,
  }
  return (
    <EntityContext.Provider value={contextValue}>
      {props.children}
    </EntityContext.Provider>
  )
}

export default EntityContext
