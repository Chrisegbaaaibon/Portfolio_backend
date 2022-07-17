const { urlencoded } = require('body-parser');
const express = require('express');
const app = express()
const nodemailer = require('nodemailer')
require('dotenv').config()

const sendMail = async (options) => {
  
    const  transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'Johnnyopeyemi@gmail.com',
          pass: process.env.PASS
        }
      });
    
      let message = {
        from: 'John <Johnnyopeyemi@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.text,
        html: options.html
      }
  
      return await transporter.sendMail(message)
  }
  
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
app.post('/sendmail', async (req, res)=>{
        try {
          const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;
        await sendMail({
            email: 'christopheregbaaibon@gmail.com',
            subject: 'A new connection',
            html:  `<p>You have a new message</p>
              <p>Name: ${name}</p>
              <p> Email: ${email}</p>
              <p>Message: ${message} </p>`
        })

        return res.json({
            message: 'success'
        })
        } catch (error) {
          return error
        }
})


app.listen(process.env.PORT)