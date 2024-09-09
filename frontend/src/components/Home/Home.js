import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel/Carousel';
import Features from './Features/Features';
import SelfAd from './SelfAd/SelfAd';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Product from './Product/Product';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Home = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const val = localStorage.getItem("user");
  
  useEffect(() => {
    if (val) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  }, [val]);

  const handleConfirm = () => {
    setShowConfirmation(false);
    localStorage.removeItem("user");
    navigate('/userdash');
  };

  // const handleClose = () => {
  //   setShowConfirmation(false);
  // };

  return (
    <>
      <Header />
      <Carousel />
      <Features />
      <Product />
      <SelfAd />
      <Footer />
      <Dialog
        open={showConfirmation}
      
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Profile Update Required"}
        </DialogTitle>
        <DialogContent>
          <p>You need to update your profile.</p>
        </DialogContent>
        <DialogActions>
        <Button
  onClick={handleConfirm}
  sx={{
    bgcolor: '#F28123',
    color: '#fff', 
    '&:hover': {
      bgcolor: '#d96b1b', 
    },
  }}
>
  OK
</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
