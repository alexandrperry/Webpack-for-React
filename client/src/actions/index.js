import axios from 'axios';


export const gav = (payload) => ({
    type:"TEST",
    payload
})

export const meow = (name) => ({
    type:"Success",
    payload:name
})

