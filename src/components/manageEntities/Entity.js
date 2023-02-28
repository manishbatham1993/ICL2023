import React from 'react'
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
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>

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

      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableBody>
            {rows.map((row, index) => {
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
