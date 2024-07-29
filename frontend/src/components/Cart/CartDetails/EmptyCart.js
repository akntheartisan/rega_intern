import React from 'react'
import './emptycart.css'
import Paper from '@mui/material/Paper';

const EmptyCart = () => {
    const divertProduct = ()=>{

    }
  return (
    <>

    <div className='emptycart'>
    <Paper elevation={5} sx={{padding:'50px'}}>
        <h5>Your Cart is Empty</h5>
        <p style={{textAlign:'center'}}>Add items to it now.</p>
        <button
                onClick={divertProduct}
                style={{
                  backgroundColor: "#f28123",
                  borderColor: "#f28123",
                  width: "100%",
                  color: "white",
                  padding: "10px",
                  fontSize: "15px",

                  fontWeight: "650",
                }}
              >
                 SHOP NOW
              </button>
              </Paper>
    </div>
    
    </>
  )
}

export default EmptyCart