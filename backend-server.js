const express = require('express');
const formidable = require('formidable');
const nodemailer = require('nodemailer');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'onsnc.global@gmail.com',      // Your Gmail
    pass:'ONSNC@2050!*#'          // Gmail App Password
  }
});

app.post('/send-email', (req,res)=>{
  const form = new formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
    if(err) return res.status(500).send(err);

    const mailOptions = {
      from:'YOUR_EMAIL@gmail.com',
      to:'onsnc.global@gmail.com',
      subject:`New Volunteer Submission: ${fields.name}`,
      html:`<p>Name: ${fields.name}</p>
            <p>Email: ${fields.email}</p>
            <p>Location: ${fields.location}</p>
            <p>Interest: ${fields.interest}</p>`,
      attachments:[
        {
          filename: files.resume.name,
          path: files.resume.path
        }
      ]
    };

    transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
        console.error(error);
        return res.status(500).send(error);
      }
      res.status(200).json({message:'Success! Email sent with attachment'});
    });
  });
});

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));

