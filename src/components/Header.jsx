import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import '../App.css'
import { GoTag } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

function Header() {
  // top moving line
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      x.set(x.get() + delta * 0.1);
      if (x.get() > window.innerWidth) {
        x.set(-500);
      }
    }
  });

  return (
    <>
    
      {/*  moving line */}
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          background: "#2b2929"
        }}

      >
        <motion.div
          style={{
            x,
            display: "inline-block"
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="text-light d-flex align-items-center"
            style={{ paddingRight: "80px" }}
          >
            <GoTag className="m-2" />
            <span>
              Only this week <span className='text-success'>-20%</span> For all Sofas and Couches
            </span>
            <FaArrowRightLong className="m-2" />
            <Link
              to="/products"
              className="text-success text-decoration-none me-3 underline-hover"
            >
              Sofas and Couches
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#070607' }}>
          <Toolbar>
            <img width={'40px'} src="/icon.png" alt="icon" />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <h3 style={{ fontFamily: "Lobster", margin: 0 }}>
                Veloura furnishings
              </h3>
            </Typography>

            <Link to='/' className="text-light text-decoration-none me-3 underline-hover">Home</Link>
            <Link to='/about' className="text-light text-decoration-none me-3 underline-hover">About Us</Link>
            <Link to='/products' className="text-light text-decoration-none underline-hover">Products</Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header;