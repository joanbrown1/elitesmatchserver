
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const { Candidate } = require("./models/Candidate");
const { Bigwin } = require("./models/Bigwin");
const { Job } = require("./models/JobPosting");
const employeeRoutes = require("./routes/Employees");
const authEmployeeRoutes = require("./routes/authEmployee");
const { Employee } = require("./models/Employee");
const employerRoutes = require("./routes/Employers");
const authEmployerRoutes = require("./routes/authEmployer");
const { Employer } = require("./models/Employer");
const employeeOutRoutes = require("./routes/EmployeesOut");
const authEmployeeOutRoutes = require("./routes/authEmployeeOut");
const { EmployeeOut } = require("./models/EmployeeOut");
const ImageRoutes = require('./routes/ImageRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/employees", employeeRoutes);
app.use("/api/authEmployee", authEmployeeRoutes);
app.get('/employees', async(req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.use("/api/employers", employerRoutes);
app.use("/api/authEmployer", authEmployerRoutes);
app.get('/employers', async(req, res) => {
    try {
        const employers = await Employer.find({});
        res.status(200).json(employers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.use("/api/employeesout", employeeOutRoutes);
app.use("/api/authEmployeeout", authEmployeeOutRoutes);
app.get('/employeesout', async(req, res) => {
    try {
        const employeesout = await EmployeeOut.find({});
        res.status(200).json(employeesout);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/candidate', async (req, res) => {
    try {
        await Candidate.create(req.body);
        res.status(200).json({message: "Candidate created"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find({});
        res.status(200).json(candidates);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/bigwin', async (req, res) => {
  try {
      await Bigwin.create(req.body);
      res.status(200).json({message: "Zone collected"});
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
  }
});

app.get('/bigwin', async (req, res) => {
  try {
      const bigwins = await Bigwin.find({});
      res.status(200).json(bigwins);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
  }
});

app.post('/job', async (req, res) => {
  try {
      await Job.create(req.body);
      res.status(200).json({message: "Job created"});
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
  }
});

app.get('/jobs', async (req, res) => {
  try {
      const jobs = await Job.find({});
      res.status(200).json(jobs);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
  }
});


// API endpoint to search for employees by sector or similar sector
app.post("/employees/sector/search", async (req, res) => {
    try {
      const searchsector = req.body.sector;
      if (!searchsector) {
        return res.status(400).json({ message: "sector parameter is missing" });
      }
  
      // Use a regular expression to perform a case-insensitive search for similar categories
      const regex = new RegExp(searchsector, "i");
  
      // Search for employees directly in the database
      const employees = await Employee.find({ sector: regex }).exec();

      if (employees.length === 0) {
        return res.status(404).json({ message: "No employees found for the provided sector" });
      }
  
      res.status(200).json(employees);
    } catch (error) {
      console.error("Error searching for employees:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

// API endpoint to search for employees by skills
app.post("/employees/skills/search", async (req, res) => {
  try {
    const searchskills = req.body.skills;
    if (!searchskills) {
      return res.status(400).json({ message: "skills parameter is missing" });
    }

    // Use a regular expression to perform a case-insensitive search for similar categories
    const regex = new RegExp(searchskills, "i");

    // Search for employers directly in the database
    const employees = await Employee.find({ skills: regex }).exec();

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employers found for the provided skills" });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error searching for employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint to search for employers by email
app.post("/employers/email/search", async (req, res) => {
  try {
    const searchemail = req.body.email;
    if (!searchemail) {
      return res.status(400).json({ message: "email parameter is missing" });
    }

    // Use a regular expression to perform a case-insensitive search for similar categories
    const regex = new RegExp(searchemail, "i");

    // Search for employers directly in the database
    const employees = await Employer.find({ email: regex }).exec();

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employers found for the provided email" });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error searching for employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint to search for employees by email
app.post("/employees/email/search", async (req, res) => {
  try {
    const searchemail = req.body.email;
    if (!searchemail) {
      return res.status(400).json({ message: "email parameter is missing" });
    }

    // Use a regular expression to perform a case-insensitive search for similar categories
    const regex = new RegExp(searchemail, "i");

    // Search for employees directly in the database
    const employees = await Employee.find({ email: regex }).exec();

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found for the provided email" });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error searching for employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint to search for outemployees by email
app.post("/outemployees/email/search", async (req, res) => {
  try {
    const searchemail = req.body.email;
    if (!searchemail) {
      return res.status(400).json({ message: "email parameter is missing" });
    }

    // Use a regular expression to perform a case-insensitive search for similar categories
    const regex = new RegExp(searchemail, "i");

    // Search for employees directly in the database
    const outemployees = await EmployeeOut.find({ email: regex }).exec();

    if (outemployees.length === 0) {
      return res.status(404).json({ message: "No employees found for the provided email" });
    }

    res.status(200).json(outemployees);
  } catch (error) {
    console.error("Error searching for employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint to search for employees by customid
app.post("/employees/customid/search", async (req, res) => {
  try {
    const searchcustomid = req.body.customid;
    if (!searchcustomid) {
      return res.status(400).json({ message: "customid parameter is missing" });
    }

    // Use a regular expression to perform a case-insensitive search for similar categories
    const regex = new RegExp(searchcustomid, "i");

    // Search for employees directly in the database
    const employees = await Employee.find({ customid: regex }).exec();

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found for the provided customid" });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error searching for employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//file upload for bloomx

app.use('/api', ImageRoutes);


//app.listen();

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});