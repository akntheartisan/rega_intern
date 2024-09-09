import React from 'react'
import { UserContext } from "../../App";
import { useContext, useState } from "react";
const Invoice = () => {
    const {userData, setUserData } = useContext(UserContext);
    console.log(userData.address);
    console.log(userData.name);
    console.log(userData.username);
    console.log(userData.address);
    console.log(userData.address);
  return (
    <div>
       
  
        
    </div>
  )
}

export default Invoice