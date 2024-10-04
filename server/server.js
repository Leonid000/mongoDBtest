const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


const UserShema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'specify username']
    },
    age: {
        type: Number,
        required: [true, 'specify age']
    }
})
const USER_MODEL = mongoose.model('User', UserShema)


app.get('/', async (req,res) => {
    let user = await USER_MODEL.find()
    if(Number(user) === 0){
        await USER_MODEL.create({
            username: 'valera',
            age: 200
        })
        user = await USER_MODEL.find()
    }
    res.send(user)

})
 

app.listen(PORT, async () => {
    await mongoose.connect(MONGO_URI,{
        dbName: 'myMongoDB'
    })
    console.log(`Server listening ... PORT: ${PORT}`)
})