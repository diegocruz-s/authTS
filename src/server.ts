import express from "express";
import routerUser from "./routes";

const app = express()

app.use(express.json())
app.use('/users', routerUser)

app.listen(3333, ()=>{
    console.log('Server is running on port 3333')
})
 