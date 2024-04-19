const router = require("express").Router();
const {EmployeeOut, validate} = require("../models/EmployeeOut");
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return  res.status(400).send({message: error.details[0].message});

        const employee = await EmployeeOut.findOne({ email: req.body.email });
        if(employee)
            return   res.status(409).send({ message : "User with given email already exists!"});

        const id = await EmployeeOut.findOne({ customid: req.body.id });
        if(id)
            return   res.status(409).send({ message : "User with given id already exists!"});

        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        

        await new EmployeeOut({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

module.exports = router;