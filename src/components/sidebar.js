import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@material-ui/core/styles';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import GavelIcon from '@mui/icons-material/Gavel';

const useStyles = makeStyles({
    paper: {
        backgroundColor : 'linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)',
        background : '#3358f4'
    }
  });

const drawerWidth = 210;

const routes = [
    {
        id: 1,
        path: "/accountlist",
        name: "Accounts",
        icon: InboxIcon
    },
    {
        id: 2,
        path: "/playerslist",
        name: "Players",
        icon: PeopleAltIcon
    },
    {
        id: 3,
        path: "/teamlist",
        name: "Team List",
        icon: Diversity3Icon
    },
    {
        id: 4,
        path: "/manage",
        name: "Manage",
        icon: SettingsSuggestIcon
    },
    {
        id: 5,
        path: "/auction3",
        name: "Auction",
        icon: GavelIcon
    }
]

export default function Sidebar() {
  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
        PaperProps={{
            sx: {
              backgroundImage: "linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)",
              borderRadius: "5px",
              marginTop: "75px",
              marginLeft: "15px"
            }
          }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                ICL 2023
            </List>
            <Divider sx={{
                mx:2,
                backgroundColor:'white'
            }}/>
          <List>
            {routes.map( ({id, path, name, icon}) => {
                const Icons12 = icon;
                return (
              
              <ListItem key={id} disablePadding component="a" href={path}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icons12 />
                  </ListItemIcon>
                  <ListItemText primary={name} sx={{ color:"white", fontSize: "14px"}}/>
                </ListItemButton>
              </ListItem>
            ); 
            })}
          </List>
        </Box>
      </Drawer>
  );
}