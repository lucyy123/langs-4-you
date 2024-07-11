import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

const style:CSSProperties = {
  margin:"0.5rem", 
  textDecoration:"none",
  color:"seashell",
  fontWeight:"normal"


}

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h5' marginRight={"auto"} fontWeight={"semiBold"} textTransform={"uppercase"}> LangS4U.</Typography>
        <Link style={style} to={"/"}> Home</Link>
        <Link style={style} to={"/login"}> Login</Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
