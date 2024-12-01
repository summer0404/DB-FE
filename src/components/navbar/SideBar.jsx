import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MovieIcon from '@mui/icons-material/Movie';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useNavigate } from 'react-router-dom';

export default function SideBar({ open, onClose }) {
  const navigate = useNavigate();

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        '& .MuiListItemIcon-root': { color: '#66FCF1' },
        '& .MuiListItemButton-root:hover': { backgroundColor: 'rgba(102, 252, 241, 0.1)' },
      }}
      role="presentation"
      onClick={onClose}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/add_movies')}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý phim" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/add_food')}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý thức ăn" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer 
      open={open} 
      anchor='left' 
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1F2833',
          color: '#66FCF1',
        }
      }}
    >
      {DrawerList}
    </Drawer>
  );
}