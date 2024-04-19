const router = require("express").Router();
const {Employee, validate} = require("../models/Employee");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'premium103.web-hosting.com',
    port: 465, // Use the appropriate SMTP port
    auth: {
      user: 'hr@elitesmatch.org',
      pass: 'LoveWorld123.'
    }
  });

router.post("/", async(req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return  res.status(400).send({message: error.details[0].message});

        const employee = await Employee.findOne({ email: req.body.email });
        if(employee)
            return   res.status(409).send({ message : "User with given email already exists!"});

        const id = await Employee.findOne({ customid: req.body.id });
        if(id)
            return   res.status(409).send({ message : "User with given id already exists!"});

        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        

        await new Employee({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully"})

        const mailOptions = {
            from: 'hr@elitesmatch.org',
            to: req.body.email,
            subject: 'Welcome to Elitesmatch',
            html: '<p>Congratulations, your application has been successfully uploaded. <br/> Do expect us to reach you as soon as an employer indicates interest in your profile however, we would like you to know that it will be of advantage to you if you take our core competence training. <br/>This training is available to premium users on <a href="bloomx.live">BloomX</a>. <a href="bloomx.live">BloomX</a> is a personal effectiveness platform where. <br/> This training covers critical aspect such as resume building, interview preparation, you will have a deeper understanding of teamwork, improved collaboration and office ethics. <br/> For enquiries please contact us on hr@Elitesmatch.com.  <br/><br/><br/>Best Regards. <br/> Elitesmatch Team.</p>'
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Email sending failed' });
              } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Registration successful. Confirmation email sent.' });
              }
          });
    } catch (error) {
        console.log('Email sent: ' + info.response);
        res.status(500).send({message: "Internal Server Error. Confirmation email sent."})
    }
})

module.exports = router;