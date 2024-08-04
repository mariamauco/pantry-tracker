'use client';

import React from "react";
import "./globals.css";
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
        primary: {
            main: '#b500b8',
            highlight: '#df9de0'
        },
        secondary: {
            main: '#e0b6e0',
        },
        items:{
            one: '#fcebfc',
            two: '#eddded'
        }
    },
	typography: {
        fontFamily:'Segoe UI',
        h1: {
            fontSize: '3rem',
        },
        h2: {
            fontSize: '1.75rem',
        },
        h3: {
            fontSize: '1.5rem',
        },
    },
	
});

export default theme;