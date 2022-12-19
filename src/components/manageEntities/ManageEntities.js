import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Modal from '../../UI/Modal'
import Entity from './Entity'
import ViewEntity from './ViewEntity'
import TeamOwnerForm from './TeamOwnerForm'
import AccountForm from './AccountForm'
import TeamForm from './TeamForm'
import PlayerForm from './PlayerForm'
import startAuction from './startAuction'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || ''

export default function ManageEntities() {
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [modal, setModal] = useState(null)
  const [data, setData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isView, setIsView] = useState(false)

  const refreshAccounts = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/account').then((res) => {
      if (res.data.status === 'ok') {
        setAccounts(res.data.accounts)
      }
    })
  }, [])

  const refreshTeams = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/team').then((res) => {
      if (res.data.status === 'ok') {
        setTeams(
          res.data.teams.map((team) => ({
            ...team,
            teamOwnerName: team.teamOwner ? team.teamOwner.playerId.name : '',
          }))
        )
      }
    })
  }, [])

  const refreshPlayers = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/player').then((res) => {
      if (res.data.status === 'ok') {
        setPlayers(res.data.players)
      }
    })
  }, [])

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
    const api = `${BASE_URL}/api/v1/admin/${entityName}/${entityId}`
    axios.delete(api).then((res) => {
      console.log('DELETE - res', res.data)
      if (res.data.status === 'ok') {
        switch (entityName) {
          case 'account':
            refreshAccounts()
            break
          case 'player':
            refreshPlayers()
            break
          case 'team':
            refreshTeams()
            break
          default:
            console.log('unknown entity name')
        }
      }
    })
  }

  const closeModalHandler = () => {
    setModal(null)
    setData(null)
    setIsEdit(false)
    setIsView(false)
  }

  useEffect(() => {
    console.log('-----use-effect----------')
    refreshAccounts()
    refreshTeams()
    refreshPlayers()
  }, [refreshAccounts, refreshTeams, refreshPlayers])

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
            onRefresh={refreshAccounts}
          />
        </Modal>
      )}
      {modal === 'team' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <TeamForm
            isEdit={isEdit}
            data={data}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshTeams}
          />
        </Modal>
      )}
      {modal === 'player' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <PlayerForm
            isEdit={isEdit}
            data={data}
            accounts={accounts}
            skills={['Batsman', 'Bowler', 'All Rounder', 'Spinner']}
            gender={['Male', 'Female', 'Other']}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshPlayers}
          />
        </Modal>
      )}
      {/* set team owner form */}
      {modal === 'teamOwner' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <TeamOwnerForm
            teams={teams}
            players={players}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshTeams}
          />
        </Modal>
      )}

      {/* show entities */}
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Entity
          rows={accounts}
          title={'Accounts'}
          boxWidth={50}
          onClickAdd={openModalHandler.bind(null, 'account')}
          onClickEdit={openEditModalHandler.bind(null, 'account')}
          onClickView={viewHandler.bind(null, 'account')}
          onClickDelete={deleteHandler.bind(null, 'account')}
        />
        <Entity
          rows={players}
          title={'Players'}
          boxWidth={50}
          onClickAdd={openModalHandler.bind(null, 'player')}
          onClickEdit={openEditModalHandler.bind(null, 'player')}
          onClickView={viewHandler.bind(null, 'player')}
          onClickDelete={deleteHandler.bind(null, 'player')}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Entity
          rows={teams}
          title={'Teams'}
          boxWidth={85}
          onClickAdd={openModalHandler.bind(null, 'team')}
          onClickEdit={openEditModalHandler.bind(null, 'team')}
          onClickView={viewHandler.bind(null, 'team')}
          onClickDelete={deleteHandler.bind(null, 'team')}
          additionalColums={['teamOwnerName']}
        />
        <Card
          sx={{
            m: 2,
            borderRadius: 2,
            width: '15%',
            height: 300,
            overflowY: 'auto',
          }}
        >
          <CardContent sx={{ mt: '2rem' }}>
            <Button
              variant="contained"
              onClick={openModalHandler.bind(null, 'teamOwner')}
            >
              Set team owner
            </Button>
            <Button variant="contained" onClick={startAuction}>
              start auction
            </Button>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  )
}
