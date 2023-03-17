// ## TODO
// ## set player csv filename from content disposition header

import React, { useEffect, useState, useCallback, useContext } from 'react'
import axios from 'axios'
import EntityContext from '../../store/entity-context'

import Box from '@mui/material/Box'

import Modal from '../../UI/Modal'
import Entity from './Entity'
import ViewEntity from './ViewEntity'
import TeamOwnerForm from './TeamOwnerForm'
import AccountForm from './AccountForm'
import TeamForm from './TeamForm'
import PlayerForm from './PlayerForm'
import ConfigForm from './ConfigForm'
import ImportPlayersForm from './ImportPlayerForm'
import ExportPlayerForm from './ExportPlayerForm'
import { Button } from 'reactstrap'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

export default function ManageEntities() {
  const entityCtx = useContext(EntityContext)
  const currentLocation = entityCtx?.currentLocation

  // data fetched from backend api
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [configurations, setConfigurations] = useState([])
  const [locations, setLocations] = useState([])

  // declared states
  const [modal, setModal] = useState(null)
  const [data, setData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isView, setIsView] = useState(false)

  const refreshAccounts = useCallback(() => {
    axios
      .get(BASE_URL + '/api/v1/account?location=' + currentLocation)
      .then((res) => {
        if (res.data.status === 'ok') {
          setAccounts(res.data.accounts)
        }
      })
  }, [currentLocation])

  const refreshTeams = useCallback(() => {
    axios
      .get(BASE_URL + '/api/v1/team?location=' + currentLocation)
      .then((res) => {
        if (res.data.status === 'ok') {
          setTeams(
            res.data.teams.map((team) => ({
              ...team,
              teamOwnerName:
                team.teamOwner && team.teamOwner.playerId
                  ? team.teamOwner.playerId.name
                  : '-',
              accountName:
                team.accountId && team.accountId.name
                  ? team.accountId.name
                  : '-',
              playerEmail:
                team.teamOwner && team.teamOwner.playerId
                  ? team.teamOwner.playerId.email
                  : '-',
            }))
          )
        }
      })
  }, [currentLocation])

  const refreshPlayers = useCallback(() => {
    axios
      .get(BASE_URL + '/api/v1/player?location=' + currentLocation)
      .then((res) => {
        if (res.data.status === 'ok') {
          setPlayers(
            res.data.players.map((player) => ({
              ...player,
              accountName: player.accountId ? player.accountId.name : '-',
              teamName: player.teamId ? player.teamId.name : '-',
            }))
          )
        }
      })
  }, [currentLocation])

  const refreshConfigurations = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/config').then((res) => {
      if (res.data.status === 'ok') {
        setConfigurations(res.data.configurations)
      }
    })
  }, [])

  const refreshLocations = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/location').then((res) => {
      if (res.data.status === 'ok') {
        setLocations(res.data.locations)
      }
    })
  }, [])

  const refreshAllData = () => {
    refreshAccounts()
    refreshPlayers()
    refreshTeams()
    refreshConfigurations()
    refreshLocations()
  }

  const viewHandler = (entityName, entityId) => {
    const api = `${BASE_URL}/api/v1/${entityName}/${entityId}`
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setData(res.data[entityName])
        setIsView(true)
      }
    })
  }

  const openModalHandler = (modalType) => {
    setModal(modalType)
  }

  const openEditModalHandler = (entityName, entityId) => {
    const api = `${BASE_URL}/api/v1/${entityName}/${entityId}`
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setData(res.data[entityName])
        setIsEdit(true)
        setModal(entityName)
      }
    })
  }

  const deleteHandler = (entityName, entityId) => {
    const confirm = window.confirm(
      `Are you sure you want to Delete ${entityName} ? \nClick OK to CONFIRM`
    )
    if (confirm) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      const api = `${BASE_URL}/api/v1/admin/${entityName}/${entityId}`
      axios.delete(api, config).then((res) => {
        if (res.data.status === 'ok') {
          refreshAllData()
        }
      })
    }
  }

  const assignTeamOwnerHandler = (teamId) => {
    const api = `${BASE_URL}/api/v1/team/${teamId}`
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setData(res.data.team)
        setModal('teamOwner')
      }
    })
  }

  const resetAuctionDataHandler = (accountId) => {
    const confirm = window.confirm(
      'Are you sure you want to Reset Auction ? \nAll Data related to Auction will be deleted. \nClick OK to CONFIRM'
    )
    if (confirm) {
      const api = `${BASE_URL}/api/v1/admin/auction/reset`
      const payload = {
        accountId: accountId,
      }
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      // POST request to backend and then close the overlay and refresh the accounts
      axios.patch(api, payload, config).then((res) => {
        if (res.data.status === 'ok') {
          refreshAllData()
        }
      })
    }
  }

  const closeModalHandler = () => {
    setModal(null)
    setData(null)
    setIsEdit(false)
    setIsView(false)
  }

  useEffect(() => {
    refreshAccounts()
    refreshTeams()
    refreshPlayers()
    refreshConfigurations()
    refreshLocations()
  }, [
    refreshAccounts,
    refreshTeams,
    refreshPlayers,
    refreshConfigurations,
    refreshLocations,
  ])

  return (
    <React.Fragment>
      {/* show modals */}
      {isView && data && (
        <Modal onCloseOverlay={closeModalHandler}>
          <ViewEntity data={data} />
        </Modal>
      )}
      {modal === 'account' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <AccountForm
            isEdit={isEdit}
            data={data}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshAllData}
          />
        </Modal>
      )}
      {modal === 'team' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <TeamForm
            isEdit={isEdit}
            data={data}
            accounts={accounts}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshAllData}
          />
        </Modal>
      )}
      {modal === 'player' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <PlayerForm
            isEdit={isEdit}
            data={data}
            accounts={accounts}
            teams={teams}
            skills={['Batsman', 'Bowler', 'All Rounder']}
            levels={[
              'Basic',
              'Inter School',
              'Inter College',
              'District Level',
              'State Level',
            ]}
            gender={['Male', 'Female']}
            auctionStatusList={['OWNER', 'SOLD', 'UNSOLD']}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshAllData}
          />
        </Modal>
      )}

      {/* import players */}
      {modal === 'importPlayers' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <ImportPlayersForm
            locations={locations}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshAllData}
          />
        </Modal>
      )}

      {/* export players */}
      {modal === 'exportPlayers' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <ExportPlayerForm
            locations={locations}
            onCloseOverlay={closeModalHandler}
          />
        </Modal>
      )}

      {/* set team owner form */}
      {modal === 'teamOwner' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <TeamOwnerForm
            team={data}
            players={players}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshAllData}
          />
        </Modal>
      )}

      {/* set configurations */}
      {modal === 'config' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <ConfigForm
            configurations={configurations}
            onCloseOverlay={closeModalHandler}
            onRefresh={() => {
              window.location.reload(false)
            }}
          />
        </Modal>
      )}

      <div>
        <Button
          size="lg"
          style={{ fontSize: 'small', padding: '1rem', display:'flex' }}
          onClick={openModalHandler.bind(null, 'config')}
        >
          Set Configurations
        </Button>
      </div>
      {/* entities */}
      <div style={{ display: 'flex' }}>
        <Box width="40%">
          <Entity
            rows={accounts}
            title={'Accounts'}
            onClickAdd={openModalHandler.bind(null, 'account')}
            onClickEdit={openEditModalHandler.bind(null, 'account')}
            onClickView={viewHandler.bind(null, 'account')}
            onClickDelete={deleteHandler.bind(null, 'account')}
            onClickReset={resetAuctionDataHandler}
          />
        </Box>

        <Box flexGrow="1">
          <Entity
            rows={players}
            title={'Players'}
            onClickAdd={openModalHandler.bind(null, 'player')}
            onClickEdit={openEditModalHandler.bind(null, 'player')}
            onClickView={viewHandler.bind(null, 'player')}
            onClickDelete={deleteHandler.bind(null, 'player')}
            onClickImport={openModalHandler.bind(null, 'importPlayers')}
            onClickExport={openModalHandler.bind(null, 'exportPlayers')}
            additionalColums={['accountName', 'teamName']}
          />
        </Box>
      </div>
      <div>
        <Box width="100%">
          <Entity
            rows={teams}
            title={'Teams'}
            onClickAdd={openModalHandler.bind(null, 'team')}
            onClickEdit={openEditModalHandler.bind(null, 'team')}
            onClickView={viewHandler.bind(null, 'team')}
            onClickDelete={deleteHandler.bind(null, 'team')}
            onClickAssignTeamOwner={assignTeamOwnerHandler}
            additionalColums={['accountName', 'teamOwnerName', 'playerEmail']}
          />
        </Box>
      </div>
    </React.Fragment>
  )
}
