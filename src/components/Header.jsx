import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import '../App.css'

function Header() {
  return (
<Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor: '#070607'} }>
        <Toolbar>
            {/* icon */}
          <img width={'40px'} src="/icon.png" alt="icon" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
<h3 style={{fontFamily: "Lobster"}}>Veloura furnishings</h3>         
 </Typography>

 {/* links */}
<Link to={'/'} className="text-light text-decoration-none me-3 underline-hover">Home</Link>
<Link to={'/'} className="text-light text-decoration-none me-3 underline-hover">About Us</Link>       
<Link to={'/'} className="text-light text-decoration-none underline-hover">Products</Link>       

 </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header