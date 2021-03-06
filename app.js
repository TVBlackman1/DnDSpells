console.log("App")

const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const logger = require('morgan');
const bodyParser = require('body-parser')
// const formData = require('express-form-data');
// const fileUpload = require('express-fileupload');
// const multer  =   require('multer');
// const upload = multer({ dest: 'uploads/' })
//



const PORT = config.get('port') || 3000

const app = express()

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(formData.parse());
// app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/spells', require('./routes/spells'))


async function start() {
    try {
        const mongoUrl = config.get('mongoUrl')
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, () => {
            console.log("Connected to db..")
        })

        const server = app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

        process.on('exit', server.close)
    }
    catch (e) {
        console.log("Server error", e.message)
        process.exit(1)
    }
}

start()
