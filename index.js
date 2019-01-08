const HelloSign = require('hellosign-sdk')

const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser');

const port = 3000
const MY_EMAIL = ''
const SOME_OTHER_EMAIL = ''
const HELLO_SIGN_API_KEY = ''

app = express()

const hellosign = HelloSign({ key: HELLO_SIGN_API_KEY });
let fileName
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        fileName = `${file.fieldname}-${Date.now()}.pdf`
        cb(null, fileName)
    }
})

const upload = multer({ storage })
const cpUpload = upload.fields([{ name: 'templates', maxCount: 1 }])

app.post('/sign', cpUpload, (req, res, next) => {
    const { templates: [{ buffer }] } = req.files
    const opts = {
        test_mode: 1,
        title: 'NDA with Acme Co.',
        subject: 'The NDA we talked about',
        message: 'Please sign this NDA and then we can discuss more. Let me know if you have any questions.',
        signers: [
            {
                email_address: MY_EMAIL,
                name: 'John Doe'
            },
            {
                email_address: SOME_OTHER_EMAIL,
                name: 'Sally Doe'
            }
        ],
        files: [`${__dirname}/uploads/${fileName}`],
        use_text_tags: 1,
        hide_text_tags: 1
    };
    return hellosign.signatureRequest.send(opts)
        .then(result => {
            console.log({ result })
            return res.send('sent!')
        })
        .catch((err) => {
            console.log(err)
            res.status(400);
            res.send('errrr');
        })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))