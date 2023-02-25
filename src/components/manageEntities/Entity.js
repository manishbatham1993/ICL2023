import * as React from 'react'
import Box from '@mui/material/Box'
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

export default function Entity({
  rows,
  boxWidth,
  title,
  onClickView,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  onClickImport,
  onClickExport,
  additionalColums = [],
}) {
  return (
    <Box sx={{ width: `${boxWidth}%` }}>
      <Paper
        sx={{
          m: 2,
          borderRadius: 2,
          height: 300,
          overflowY: 'auto',
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
                      align="center"
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row._id}</TableCell>

                    {additionalColums.map((col, i) => (
                      <TableCell key={i} align="center">
                        {row[col]}
                      </TableCell>
                    ))}

                    <TableCell align="center">
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
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
