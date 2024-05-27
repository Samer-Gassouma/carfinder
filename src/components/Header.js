import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>
        
        <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu} style={{ width: '350px' }}>
          <div style={{ width: '350px' }}>
            <List>
              {['Home', 'Cars', 'Contact'].map((text, index) => (
                <ListItem button key={text} onClick={toggleMenu}>
                  <ListItemText primary={
                    <Typography variant="body2">
                      <Link to={text === 'Home' ? '/' : `/${text.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                        {text === 'Home' ? 'Your Dealership' : text}
                      </Link>
                    </Typography>
                  } />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <img src="/logo.png" alt="Your Dealership Logo" style={{ height: '80px', marginLeft: 'auto' }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;