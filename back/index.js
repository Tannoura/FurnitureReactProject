const express = require('express')
const cors=require('cors')
const stripe = require('stripe')('');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const nodemailer = require('nodemailer');

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'Gmail'
  auth: {
    user: '', // put your address here
    pass: '' // your secret 
  }
});
app.post('/send-email', (req, res) => {
    console.log(req.body)
    const { to, subject, text } = req.body;
  
    const mailOptions = {
      from: 'charliduvant@gmail.com',
      to,
      subject,
      text
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
  });

  app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
