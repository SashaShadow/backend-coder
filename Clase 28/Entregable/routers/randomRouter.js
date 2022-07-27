
import express from "express";
import { fork } from 'child_process';
const { Router } = express;
const randomRouter = Router()


export default randomRouter;


randomRouter.get('/', (req, res) => {
    const numeros = req.query.cant || 100000000;
    const forked = fork('../Entregable/randomNumbers.js', ['--c', numeros]);

    forked.on('message', nums => {
        //forked.send(numeros)
        return res.json(nums)
    })

})