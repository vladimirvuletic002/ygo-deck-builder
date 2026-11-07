import express from 'express';
import cors from 'cors';
import cardRoutes from './routes/cardRoutes.js';

//const express = require("express"); // ekvivalent za: import express from 'express'
// Razlika se pravi u package.json, za kljuc 'type': 'commonjs' ostaje stari nacin sa 'require("express")
// Za 'type': 'module' uvodi se 'import express from 'express'
// Razlika je u tome sto je module dozvoljava asinhrono ucitavanje a commonjs je sinhron (blokira izvrsavanje dok se modul ne ucita)
const app = express();
const port = 3000;
app.use(cors());

app.use('/api/cards', cardRoutes);

/* app.use((req,res,next) => {
    console.log("Middleware 1: This always runs");
    next();
}); */

/* app.use((req,res,next) => {
    console.log("Middleware 2: Authorization Middleware.");
    if(!req.headers.authorization){
        console.log("Ovaj zahtev nema autorizaciju u header-u");
    }
    else{
        console.log("Autorizovan!");
        next();
    }
        
}); */

app.get('/', (req,res) => {
    const data = "Hello World";
    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Express app listeting at http://localhost:${port}`);
});






