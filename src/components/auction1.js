import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// import { Clock as ClockIcon } from '../../icons/clock';
// import { Download as DownloadIcon } from '../../icons/download';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  const users = {
    avatar: '/static/images/avatars/avatar_6.png',
    name: 'Manish Batham',
    title: 'CURRENT BID FOR',
    baseprice: '5000',
    soldfor:'1000',
    soldtoteam:'NAVIC'
  };
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    name: 'Manish Batham',
    title: 'CURRENT BID FOR',
    baseprice: '5000',
    soldfor:'1000',
    soldtoteam:'NAVIC'
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'playername', headerName: 'Player name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
        <Card >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {user.title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {`${user.name} `}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          BASE PRICE -{user.baseprice}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
   
  </Card>
        </Grid>
        <Grid xs={6}>
          <Item>2</Item>
        </Grid>
        <Grid xs={6}>
        <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
   
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="user"
          src={user.avatar}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {user.name}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        SOLD TO TEAM -{user.soldtoteam}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        SOLD FOR -{user.soldfor}
      </Typography>
    </CardContent>
    
    
  </Card>
        </Grid>
        <Grid xs={6}>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
        </Grid>
      </Grid>
    </Box>
  );
}