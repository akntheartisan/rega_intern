import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopIcon from '@mui/icons-material/Shop';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


const UserNavigation = () => {
  const { userData, setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const profile = ()=>{
        console.log('profileform');
        navigate('/profileform');
    }

    const cart = ()=>{
      const id = userData._id;
        console.log('cart');
        navigate('/cart',{ state: { id } });
    }
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          
         
           <div style={{marginLeft:'10px'}}>
           <IconButton onClick={profile}>
            <AccountCircleIcon />&nbsp;&nbsp;&nbsp;<p style={{marginBottom:'0px'}}>User Profile</p>
            </IconButton>
           </div>

           <div style={{marginLeft:'10px'}}>
           <IconButton onClick={cart}>
            <AccountCircleIcon />&nbsp;&nbsp;&nbsp;<p style={{marginBottom:'0px'}}>My Cart</p>
            </IconButton>
           </div>

           <div style={{marginLeft:'10px'}}>
           <IconButton onClick={profile}>
            <AccountCircleIcon />&nbsp;&nbsp;&nbsp;<p style={{marginBottom:'0px'}}>Orders</p>
            </IconButton>
           </div>
                       
        
        </List>
       
      </Box>
    );
  
    return (
      <div>
        <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    );
}

export default UserNavigation