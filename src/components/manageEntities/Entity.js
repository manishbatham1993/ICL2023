import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import PostAddIcon from '@mui/icons-material/PostAdd'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { createDebounceFunction } from '../../utils/searchOptimization'

export default function Entity({
  rows,
  title,
  onClickView,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  onClickImport,
  onClickExport,
  onClickAssignTeamOwner,
  onClickReset,
  additionalColums = [],
}) {
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(rows)
  }, [rows])

  const filterDataHelper = createDebounceFunction((searchInput) => {
    setFilteredData(
      rows.filter((row) => {
        let s = row.name
        for (let col of additionalColums) s += row[col]
        return s.toLowerCase().includes(searchInput.toLowerCase())
      })
    )
  }, 500)

  return (
    <Paper
      sx={{
        m: 1,
        borderRadius: 2,
        height: 300,
        overflow: 'hidden',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '1rem',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: 2,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          {/* title */}
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>

          {/* controls */}
          <div>
            {onClickAdd && (
              <Tooltip title="Add">
                <IconButton onClick={onClickAdd}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}

            {onClickImport && (
              <Tooltip title="Import CSV">
                <IconButton onClick={onClickImport}>
                  <PostAddIcon />
                </IconButton>
              </Tooltip>
            )}

            {onClickExport && (
              <Tooltip title="Export CSV">
                <IconButton onClick={onClickExport}>
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
        <div style={{ margin: 'auto auto', marginRight: '2%' }}>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 200,
            }}
            onSubmit={(e) => {
              e.preventDefault()
              console.log(e.target)
              console.log('pulkit')
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'filter' }}
              onChange={(e) => {
                filterDataHelper(e.target.value)
              }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>

      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableBody>
            {filteredData.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row._id}
                  onClick={() => onClickView(row._id)}
                >
                  <TableCell
                    align="left"
                    component="th"
                    id={labelId}
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row._id}</TableCell>

                  {additionalColums.map((col, i) => (
                    <TableCell key={i} align="left">
                      {row[col]}
                    </TableCell>
                  ))}

                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          onClickEdit(row._id)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          onClickDelete(row._id)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    {onClickAssignTeamOwner && (
                      <Tooltip title="Assign Team Owner">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation()
                            onClickAssignTeamOwner(row._id)
                          }}
                        >
                          <AccountBoxIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onClickReset && (
                      <Tooltip title="Reset Auction">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation()
                            onClickReset(row._id)
                          }}
                        >
                          <RestartAltIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
