"use client"

import Image from "next/image";
import React from "react";
import { changeEvent, useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField, Container } from "@mui/material";
import { firestore } from "@/firebase";
import Theme from './theme.js';
import Layout from './layout';


import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid primary.main',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {

  // inventory state
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [itemQuantity, setItemQuantity] = useState(1)

  // inventory fetching from data from firestore
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []

    docs.forEach((doc) => {
      inventoryList.push({name: doc.id, ...doc.data()})
    })
    setInventory(inventoryList)
    setFilteredItems(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  // adding and removing functions
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    // if the item is already there, add the quantity by 1. else, 
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      const currentQty = parseInt(quantity, 10)
      const newQty = parseInt(itemQuantity, 10)
      await setDoc(docRef, {quantity : ( currentQty + newQty )})
    } else{
      await(setDoc(docRef, { quantity : itemQuantity}))
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    // if the item is already there, add the quantity by 1. else, 
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  console.log(inventory)

  useEffect(() => {
    if(searchQuery){
      const filtered = inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredItems(filtered);
    } else{
      setFilteredItems(inventory);
    }
  },[searchQuery])


  // Component logic here
  return (
    <Box
      sx={{
        //background:"linear-gradient(0deg, rgba(255,235,248,1) 0%, rgba(255,255,255,1) 100%)",
        height:'100vh',
        background:"linear-gradient(0deg, rgba(255,235,248,1) 0%, rgba(255,255,255,1) 100%)"
      }}>
      <Typography 
      variant="h1" align='center'
      sx={{my:7
      }}>Inventory Management
      </Typography>

      <Container>
        <TextField
              id="outlined-basic"
              label= 'Search Item'
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{mt:3, mb:5}}
        />
      </Container>
      

      <Box 
        sx={{display:'flex', 
        justifyContent:'center',
        mb:2}}>
        <Button variant='outlined' onClick={handleOpen}>
            Add Item
        </Button>
      </Box>
      
      <Modal
        open = {open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component='h2'>Add Your Item</Typography>
          <Stack width = '100%' direction={'row'}>
            <TextField
            id="outlined-basic"
            label= 'Item'
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
            id="outlined-basic"
            label= 'Quantity'
            variant="outlined"
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            />
            <Button
            variant="outlined"
            sx={{ml:2}}
            onClick={() => {
              addItem(itemName)
              setItemName('')
              setItemName(1)
              handleClose()
            }}>Add
            </Button>
          </Stack>
        </Box>
      </Modal>


      <Box>
        <Container
          sx={{
            display:'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:'center',
            border:1,
            borderColor:'primary.main',
            bgcolor:'secondary.main',
            
          }}>
          <Typography sx={{flexGrow:3, ml: 10, color:'primary.main'}}>ITEM NAME</Typography>
          <Typography sx={{flexGrow:1, ml:0, color:'primary.main'}}>QUANTITY</Typography>
          <Typography sx={{flexGrow:0,  mr: 9, color:'primary.main'}}>REMOVE ITEM</Typography>
        </Container>
        <Stack>
          {filteredItems.map(({name, quantity}) => (
            <Container
            sx={{
              display:'flex',
              flexDirection: 'row',
              justifyContent:'space-between',
              alignItems:'center',
              borderTop:1,
              borderBottom:1,
              borderColor:'secondary.main',
              bgcolor:'items.one',
            }}>
              <Box
              sx={{flexGrow:3, justifyContent:'center', alignItems:'center', ml:10}}>
                <Typography>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Box>
              <Box
              sx={{flexGrow:1}}>
                <Typography>
                  Quantity: {quantity}
                </Typography>
              </Box>
              <Box
              sx={{flexGrow:0, mr:10}}>
                <Button variant="contained" onClick={() => removeItem(name)}  size='small'
                  sx={{margin:0.5}}>
                  Remove
                </Button>
              </Box>
            </Container>
            
          ))}
        </Stack>
      </Box>
      
      

    </Box>
  );
}
