const express = require("express");
const mysql = require("mysql2");
// const mysql = require('mysql2/promise');
// const cors = require("cors");
const app = express();
const util = require("util");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
// const multer = require("multer");
const path = require("path");
const axios = require("axios");
// const promisify = require("express-promisify");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Example for hitting another endpoint from the default endpoint
app.get("/", (req, res) => {
  // Redirect to another endpoint
  res.redirect("/home");

  // Or render another endpoint's view
  // res.render('another-endpoint');
});

// Set EJS as the view engine
// app.set("view engine", "ejs");
// const cors = require('cors');
// const multer = require('multer');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const path = require("path");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// console.log(app.get("views"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("dropdown");
    const dropdownData = response.data;
    res.json(dropdownData);
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
    if (error.response && error.response.status === 404) {
      res.status(404).send("Dropdown data not found");
    } else {
      res.status(500).send("An error occurred while fetching dropdown data");
    }
  }
});
// app.get("/dashboard", async (req, res) => {
//   const data = {
//     msg: "welcome",
//   };

//   res.render("dashboard", { data });
// });

const hostname = "localhost";
const port = 8085;

// Database credentials
const connection = mysql.createConnection({
  // host: "localhost",
  // user: "root2",
  // password: "Ur90tdYWx010I&Lftt",
  // database: "admin",
  host: "localhost",
  user: "root",
  password: "",
  database: "pba",
});

// Establish a database connection
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});
// Start the server
app.listen(8000, "0.0.0.0", () => {
  console.log("Server running at http://0.0.0.0:8000/");
});
const query = util.promisify(connection.query).bind(connection);

const multer = require("multer");
// const upload = multer({ dest: "images/" });

// render login file
app.get("/visitor", (req, res) => {
  return res.render("visitor");
});
app.get("/login", (req, res) => {
  return res.render("login");
});

app.get("/materimony", (req, res) => {
  return res.render("materimony");
});
app.get("/socialactivity", (req, res) => {
  return res.render("socialactivty");
});
// post visitor data
app.post("/visitordata", async (req, res) => {
  console.log("post visitordata api hit");
  var d1 = new Date();
  try {
    // Extract data from the request body
    const { name, city, contact } = req.body;

    console.log("feedback req.body", req.body);

    const Name = name || "";
    const City = city || "";
    const Contact = contact || "";

    const query = `INSERT INTO visitor (name, city, contact) VALUES (?, ?, ?)`;
    const values = [Name, City, Contact];

    console.log("values", values);
    const result = await connection.promise().query(query, values);

    // Send a success response to the client
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error adding visitor to database: " + error.message,
    });
  }
});

app.post("/verifyvisitor", async (req, res) => {
  console.log("visitorverfy api hit");

  const { name, contact } = req.body;
  console.log("req.body##", req.body);

  // Check if email and password are provided
  if (!name || !contact) {
    console.log("name and contact are required");
    return res.status(400).json({ message: "name and contact are required" });
  }

  try {
    // Check if user with given email exists in the database
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM visitor WHERE name = ? AND contact = ?", [
        name,
        contact,
      ]);

    if (rows.length === 0) {
      console.log("Invalid name or contact");
      return res.status(401).json({ message: "Invalid name or contact" });
    }

    // Generate a token (replace "welcome" with an actual token value)
    // const token = "welcome";
    // console.log("token##", token);

    // Check if the login_id and login_password match the admin credentials
    // if (
    //   user_login_id === "admin@gmail.com" &&
    //   user_login_password === "admin@123"
    // ) {
    //   // Render the admin dashboard
    //   return res.status(200).json({
    //     message: "Logged in as admin",
    //     redirect: true,
    //     page: "admindashboard",
    //   });
    // } else {
    // Render the user dashboard
    return res.status(200).json({
      message: "Logged in successfully!",
      redirect: true,
      page: "dropdown",
    });
    // }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});
// app.post("/login", async (req, res) => {
//   console.log("login api hit");

//   const { user_login_id, user_login_password } = req.body;
//   console.log("req.body##", req.body);

//   // Check if email and password are provided
//   if (!user_login_id || !user_login_password) {
//     console.log("Email and password are required");
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     // Check if user with given email exists in the database
//     const [rows] = await connection
//       .promise()
//       .query(
//         "SELECT * FROM member_mast WHERE member_email = ? AND login_password = ?",
//         [user_login_id, user_login_password]
//       );

//     if (rows.length === 0) {
//       console.log("Invalid email or password");
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate a token (replace "welcome" with an actual token value)
//     const token = "welcome";
//     console.log("token##", token);

//     // Check if the login_id and login_password match the admin credentials
//     if (
//       user_login_id === "admin@gmail.com" &&
//       user_login_password === "admin@123"
//     ) {
//       // Render the admin dashboard
//       return res.status(200).json({
//         message: "Logged in as admin",
//         redirect: true,
//         page: "admindashboard",
//       });
//     } else {
//       // Render the user dashboard
//       return res.status(200).json({
//         message: "Logged in successfully!",
//         redirect: true,
//         page: "dashboard",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// });
//check login api according role
app.post("/login", async (req, res) => {
  console.log("login api hit");

  const { user_login_id, user_login_password } = req.body;
  console.log("req.body##", req.body);

  // Check if email and password are provided
  if (!user_login_id || !user_login_password) {
    console.log("Email and password are required");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user with given email exists in the database
    const [rows] = await connection
      .promise()
      .query(
        "SELECT * FROM member_mast WHERE member_email = ? AND login_password = ?",
        [user_login_id, user_login_password]
      );

    if (rows.length === 0) {
      console.log("Invalid email or password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Assuming that the user role is stored in the 'role' column of the database
    const userRole = rows[0].role;

    // Generate a token (replace "welcome" with an actual token value)

    // Check the user role and render the appropriate dashboard
    if (userRole == 1) {
      // Render the admin dashboard
      res.render("admindashboard");
    } else if (userRole == 2) {
      // Render the user dashboard
      res.render("dashboard");
    } else {
      // Handle other roles or unknown roles
      console.log("Unknown user role:", userRole);
      return res.status(403).json({ message: "Unknown user role" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/admindashboard", (req, res) => {
  res.render("admindashboard");
});
app.get("/catregister", (req, res) => {
  res.render("postcat");
});
app.get("/postbanner", (req, res) => {
  res.render("postbanner");
});
app.get("/postfaq", (req, res) => {
  res.render("faq");
});
app.get("/shopping", (req, res) => {
  const query = "SELECT * FROM category_mast";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from cat_mast: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the "productpost" page with the fetched data
    res.render("shopping", { catData: results });
  });
});
app.get("/feedbacksubmit", (req, res) => {
  res.render("feedback");
});
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "memberimage"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload5 = multer({ storage: storage2 });

app.post("/postmemberdata", upload5.single("bannerImage"), async (req, res) => {
  console.log("POST member API hit");

  if (!req.file) {
    console.log("No file uploaded");
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  console.log("File details:", req.file);

  const createdAt = new Date();

  try {
    // Extract data and file from the request body
    const { Name, email, contact, status, address, city, state, password } =
      req.body;
    // console.log("req.body%%%%%%%====", req.body);
    const bannerImage = req.file.filename;

    const query =
      "INSERT INTO member_mast (member_name, member_email,member_contact,address,city,state,login_password,member_social_status, created_datetime, receipt_imag) VALUES (?, ?, ?, ?,?,?,?,?,?,?)";
    const values = [
      Name,
      email,
      contact,
      address,
      city,
      state,
      password,
      status,
      createdAt,
      bannerImage,
    ];

    console.log("Values:", values);

    // Assuming you have a MySQL connection named 'connection'
    const result = await connection.execute(query, values);

    // Organization added successfully
    res.status(201).json({ message: "member added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding member to database" });
  }
});
const storage4 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "productimage"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload7 = multer({ storage: storage4 });

app.post(
  "/postproductdata",
  upload7.single("bannerImage"),
  async (req, res) => {
    console.log("POST product API hit");

    if (!req.file) {
      console.log("No file uploaded");
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    console.log("File details:", req.file);

    const createdAt = new Date();

    try {
      // Extract data and file from the request body
      const { Name, organame, descpro, catogery, discount, contact } = req.body;
      // console.log("req.body%%%%%%%====", req.body);
      const bannerImage = req.file.filename;

      const query =
        "INSERT INTO product_mast (product_name, oranization_name, product_description, catogery, discount, contact, receipt_imag) VALUES (?,?,?,?,?,?,?)";
      const values = [
        Name,
        organame,
        descpro,
        catogery,
        discount,
        contact,
        bannerImage,
      ];

      console.log("Values:", values);

      // Assuming you have a MySQL connection named 'connection'
      const result = await connection.execute(query, values);

      // Organization added successfully
      res.status(201).json({ message: "product added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error adding product to database" });
    }
  }
);
// mail sending api
// mail sending api
app.post("/mail2", (req, res) => {
  console.log("mail2 API hit");

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shefalisethiya349@gmail.com", // enter your email
      pass: "lkpwsgsdnmhhmwiw", // enter associated password of that id
    },
  });
  const bodyText = JSON.stringify(req.body, null, 2);
  let mailDetails = {
    from: "shefalisethiya349@gmail.com",
    to: req.body.email, // corrected to use req.body.email directly
    subject: "Testing",
    text: bodyText,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.error("Error Occurs", err);
      res.status(500).json({ error: "Error sending email" });
    } else {
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

// Your function to retrieve member data from the database
function retrieveMemberDataFromDatabase(memberId) {
  // Replace this with your actual database query
  // Return the member data based on memberId
  // Example: return { member_email: 'user@example.com', ... };
}

// Your function to create HTML content for the email
function createHtmlContent(memberData, status, reason, role) {
  // Replace this with your HTML template based on member data and verification details
  // Example: return `<html>...</html>`;
}

const upload3 = multer({ storage: storage2 });

app.post("/postbannerdata", upload3.single("bannerImage"), async (req, res) => {
  console.log("POST banner API hit");

  if (!req.file) {
    console.log("No file uploaded");
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  console.log("File details:", req.file);

  const createdAt = new Date();

  try {
    // Extract data and file from the request body
    const { orgaName, leadName } = req.body;
    const bannerImage = req.file.filename;

    const query =
      "INSERT INTO banner_data (orga_name, lead_name, created_datetime, banner_img) VALUES (?, ?, ?, ?)";
    const values = [orgaName, leadName, createdAt, bannerImage];

    console.log("Values:", values);

    // Assuming you have a MySQL connection named 'connection'
    const result = await connection.execute(query, values);

    // Organization added successfully
    res.status(201).json({ message: "Banner added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding banner to database" });
  }
});
const storage6 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "businessregisimg"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload9 = multer({ storage: storage6 });

app.post(
  "/postbusinessdata",
  upload9.single("bannerImage"),
  async (req, res) => {
    console.log("POST business API hit");

    if (!req.file) {
      console.log("No file uploaded");
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    console.log("File details:", req.file);

    const createdAt = new Date();

    try {
      // Extract data and file from the request body
      const {
        Name,
        organame,
        address,
        city,
        catogery,
        weburl,
        state,
        descservice,
      } = req.body;
      const bannerImage = req.file.filename;

      const query =
        "INSERT INTO business_mast (owner_name, organization_name,address,city,busi_category,website,description, created_datetime, receipt_imag) VALUES (?,?,?,?,?,?,?,?,?)";
      const values = [
        Name,
        organame,
        address,
        city,
        catogery,
        weburl,
        descservice,
        createdAt,
        bannerImage,
      ];

      console.log("Values:", values);

      // Assuming you have a MySQL connection named 'connection'
      const result = connection.execute(query, values);

      // Organization added successfully
      res.status(201).json({ message: "Business added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error adding business to database" });
    }
  }
);
app.get("/index", (req, res) => {
  res.render("index");
});
// app.post("/login", async (req, res) => {
//   console.log("post visitor api hit");

//   var d1 = new Date();
//   try {
//     // Extract data from the request body
//     const { name, city, contact } = req.body;

//     console.log("visitor req.body", req.body);

//     const Name = name || "";
//     const City = city || "";
//     const Contact = contact || "";

//     const query = `INSERT INTO visitor (name, city, contact, created_at) VALUES (?, ?, ?, ?)`;

//     const values = [Name, City, Contact, d1];

//     // Log the SQL Query and Values for debugging
//     console.log("SQL Query:", query);
//     console.log("Query Values:", values);

//     // Start a transaction
//     await connection.promise().beginTransaction();

//     // Execute the insertion query
//     const result = await connection.promise().query(query, values);

//     // Commit the transaction
//     await connection.promise().commit();

//     // Log the Query Result for debugging
//     console.log("Query Result:", result);

//     // Check if the insertion was successful
//     if (result[0].affectedRows > 0) {
//       console.log("Visitor added successfully");
//       // Redirect to the desired page (replace with your actual route)
//       return res.redirect("/dashboard");
//     } else {
//       console.error("Failed to insert visitor data. No rows affected.");
//       return res
//         .status(500)
//         .json({ message: "Failed to insert visitor data." });
//     }
//   } catch (error) {
//     // Rollback the transaction in case of an error
//     await connection.promise().rollback();

//     console.error("Error adding visitor to database:", error);
//     return res
//       .status(500)
//       .send("Error adding visitor to database: " + error.message);
//   }
// });
// feedback
app.post("/postfeedbackdata", async (req, res) => {
  console.log("post feedback api hit");
  var d1 = new Date();
  try {
    // Extract data from the request body
    const { name, regard, suggestion, contact_no, social_status } = req.body;

    console.log("feedback req.body", req.body);

    const Name = name || "";
    const Regard = regard || "";
    const Suggestion = suggestion || "";
    const contactNo = contact_no || "";

    const Social_Status = social_status || "";

    const query = `INSERT INTO feedback (name, regard, suggestion, contact_no, social_status)
    VALUES (?, ?, ?, ?, ?)`;

    const values = [Name, Regard, Suggestion, contactNo, Social_Status, d1];

    console.log("values", values);
    const result = await connection.promise().query(query, values);
    // alert("member added successfully");
    // res.render("/login.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding member to database: " + error.message);
  }
});
// sendquery
app.post("/sendquery", async (req, res) => {
  console.log("post feedback api hit");
  var d1 = new Date();
  try {
    // Extract data from the request body
    const { name, email, subject, message } = req.body;

    console.log("query req.body", req.body);

    const Name = name || "";
    const Email = email || "";
    const Subject = subject || "";
    const Message = message || "";

    // const Social_Status = social_status || "";

    const query = `INSERT INTO  contact_detail_query (name, email, subject, message, created_at)
    VALUES (?, ?, ?, ?, ?)`;

    const values = [Name, Email, Subject, Message, d1];

    console.log("values", values);
    const result = await connection.promise().query(query, values);
    // alert("member added successfully");
    // res.render("/login.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding data to database: " + error.message);
  }
});

// ...

// app.get('/memberdata', async (req, res) => {
//   try {
//     // Retrieve members from the database
//     const query = 'SELECT * FROM member';
//     const [members] = await connection.promise().query(query);

//     // Create an array to store the HTML markup for member data
//     const memberMarkup = [];

//     // Process each member and add its HTML markup to the array
//     members.forEach((member) => {
//       let receiptHTML = '';
//       if (member.recepit) {
//         receiptHTML = `<img src="/images/${member.recepit}" alt="Receipt Image">`;
//       }

//       const memberHTML = `
//         <div class="member">
//           ${receiptHTML}
//           <h2>${member.name}</h2>
//           <p>${member.email}</p>
//           <p>contact_no: ${member.contact_no}</p>
//           <p>whatsapp_no: ${member.whatsapp_no}</p>
//           <p>occupation: ${member.occupation}</p>
//         </div>
//       `;

//       memberMarkup.push(memberHTML);
//     });

//     // Send the member markup as the response
//     const html = `
//       <html>
//         <head>
//           <style>
//             .member {
//               margin-bottom: 20px;
//             }
//           </style>
//         </head>
//         <body>
//           ${memberMarkup.join('')}
//         </body>
//       </html>
//     `;

//     res.status(200).send(html);
//   } catch (error) {
//     console.error('Error retrieving member from the database:', error);
//     res.status(500).send('Error retrieving member from the database');
//   }
// });

// const path = require('path');

// app.use('/images', express.static(path.join(__dirname, 'images')));

// post category data
app.post("/postcatdata", async (req, res) => {
  console.log("post catogery api hit");
  var d1 = new Date();
  try {
    // Extract data from the request body
    const { cat_name } = req.body;

    console.log("catogery req.body", req.body);

    const catName = cat_name || "";

    const query = `INSERT INTO category_mast (cat_name)
    VALUES (?)`;

    const values = [catName];

    console.log("values", values);
    const result = await connection.promise().query(query, values);
    // alert("member added successfully");
    // res.render("/login.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding member to database: " + error.message);
  }
});
// app.get("/members", (req, res) => {
//   console.log("Retrieving all members with all information");

//   const query = "SELECT * FROM member_mast";

//   // Send the query to the MySQL database and handle any errors or data retrieved
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500); // Send HTTP status code 500 for server error
//       return;
//     }

//     const data = results; // Store the retrieved data in a variable
//     console.log("data", data);
//     // res.send({ data });
//     res.render("member", { data }); // Send the members data back to the client
//   });
// });
//check code 5/12
app.get("/members", (req, res) => {
  console.log("Retrieving all members with all information");

  const query = "SELECT * FROM member_mast";

  // Send the query to the MySQL database and handle any errors or data retrieved
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500); // Send HTTP status code 500 for server error
      return;
    }

    const data = results.map((member) => {
      // Assuming 'receipt_imag' is the property containing the image path
      const imageUrl = generateDownloadableUrl(member.receipt_imag);
      return { ...member, imageUrl };
    });

    console.log("data", data);
    res.render("member", { data }); // Send the members data back to the client
  });
});

// Function to generate downloadable URL based on server and image path
function generateDownloadableUrl(imagePath) {
  // Modify this based on your server configuration
  const serverBaseUrl = "http:// 157.34.125.191:3000";
  return `${serverBaseUrl}/download?url=${encodeURIComponent(imagePath)}`;
}

app.get("/shopping", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM product_mast");
    const data = rows;

    res.render("shopping", { data: data || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from the database");
  }
});
// member data update for payment
app.put("/memberdataupdate", (req, res) => {
  console.log("memberdataupdate api hitted");
  const memberId = parseInt(req.body.memberId);

  const role = parseInt(req.body.role);

  const { status, reason } = req.body;
  console.log("req.body++++++", req.body);
  // connection.getConnection((err, connection) => {
  //   if (err) {
  //     console.error("Error getting MySQL connection:", err);
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }

  const updateQuery =
    "UPDATE member_mast SET verify = ?, reason = ?,role=? WHERE id = ?";
  const updateValues = [status, reason, role, memberId];

  connection.query(updateQuery, updateValues, (updateErr, updateResult) => {
    // connection.release();

    if (updateErr) {
      console.error("Error updating member data:", updateErr);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ message: "Member data updated successfully" });
  });
});
// });
// check code 9:45
// app.get('/productdata', async (req, res) => {
//   try {
//     // Retrieve products from the database
//     const query = 'SELECT * FROM Product_mast';
//     const [products] = await connection.promise().query(query);

//     // Create an array to store the product data
//     const productData = [];

//     // Process each product and add it to the array
//     products.forEach((product) => {
//       const productObj = {
//         // Product_id: product.Product_id,
//         // Product_image: product.Product_image
//         //   ? `${req.protocol}://${req.get('host')}/product_images/${product.Product_image}`
//         //   : null,
//           Product_id: product.Product_id,
//           Product_name: product.Product_name,
//           Product_type: product.Product_type,
//           Product_image: product.Product_image
//             ? `${req.protocol}://${req.get('host')}/product_images/${product.Product_image}`
//             : null,
//             Duration: product.Duration,
//             Stock_qty: product.Stock_qty,
//             Unit: product.Unit,
//             Opening_stock: product.Opening_stock,
//             Opening_stock_date: product.Opening_stock_date,
//             Remarks: product.Remarks,
//             Creation_date: product.creation_date,
//             Created_by: product.Created_by,
//             Last_updated_by: product.Last_updated_by,
//             Last_updated_date: product.Last_updated_date
//       };

//       productData.push(productObj);
//     });

//     // Send the product data as JSON response
//     res.status(200).json(productData);
//   } catch (error) {
//     console.error('Error retrieving products from the database:', error);
//     res.status(500).send('Error retrieving products from the database');
//   }
// });
// app.get("/dashboard", (req, res) => {
//   // Perform necessary backend logic
//   // ...
//   // Redirect to the dashboard URL
//   res.render("/dashboard");
// });
const secretKey = "hi";
// app.post("/login", async (req, res) => {
//   console.log("login api hit");

//   const { user_login_id, user_login_password } = req.body;
//   console.log("req.body", req.body);

//   // Check if email and password are provided
//   if (!user_login_id || !user_login_password) {
//     console.log("Email and password are required");
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     // Check if user with given email exists in the database
//     const [rows] = await connection
//       .promise()
//       .query(
//         "SELECT * FROM member_mast WHERE member_email = ? AND login_password = ?",
//         [user_login_id, user_login_password]
//       );

//     if (rows.length === 0) {
//       console.log("Invalid email or password");
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         id: rows[0].id,
//         name: rows[0].name,
//         email: rows[0].email,
//       },
//       secretKey,
//       { expiresIn: "1h" }
//     );

//     console.log("token", token);
//     const data = {
//       token: token,
//     };

//     res.render("dashboard", { token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// });
// Function to check user credentials
async function checkUserCredentials(email, password) {
  try {
    const [rows] = await connection
      .promise()
      .query(
        "SELECT * FROM member_mast WHERE member_email = ? AND login_password = ?",
        [email, password]
      );

    return rows;
  } catch (error) {
    throw error;
  }
}

// Login route
// app.post("/login", async (req, res) => {
//   console.log("login api hit");

//   const { user_login_id, user_login_password } = req.body;
//   console.log("req.body", req.body);

//   if (!user_login_id || !user_login_password) {
//     console.log("Email and password are required");
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     // Check if user with given email exists in the database
//     const rows = await checkUserCredentials(user_login_id, user_login_password);

//     if (rows.length === 0) {
//       console.log("Invalid email or password");
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Check if the user is an admin
//     const isAdmin =
//       user_login_id === "admin@gmail.com" &&
//       user_login_password === "admin@123";

//     // Generate a token (replace "welcome" with an actual token value)
//     const token = "welcome";

//     // Redirect to the appropriate dashboard based on the user type
//     if (isAdmin) {
//       return res.redirect("/admindashboard");
//     }

//     return res.redirect("/dashboard");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// });

app.get("/productdetail", (_req, res) => {
  res.render("productdetail");
});

// app.get("/dashboard", async (req, res) => {
//   const token = req.query.token; // Assuming the token is passed as a query parameter

//   res.render("dashboard", { token });
// });

// post matrimony data
// const upload2 = multer({ dest: "biodata/" });

// app.post("/matrimonypost", upload2.single("biodata"), async (req, res) => {
//   console.log("post candidate api hit");
//   var d1 = new Date();
//   try {
//     // Extract data from the request body
//     const {
//       name,
//       DOB,
//       birthplace,
//       height,
//       qulification,
//       Profession,
//       complexion,
//       gorta,
//       grandfathername,
//       father,
//       mother,
//       siblings,
//       nanaji,
//       mamaji,
//       address,
//       contact,
//     } = req.body;

//     console.log("user req.body", req.body);

//     const Name = name || "";
//     const dob = DOB || "";
//     const Birthplace = birthplace || "";
//     const Height = height || "";
//     const Qulification = qulification || "";
//     const profession = Profession || "";
//     const Complexion = complexion || "";
//     const Gorta = gorta || "";
//     const grand_father = grandfathername || "";
//     const Father = father || "";
//     const Mother = mother || "";
//     const Siblings = siblings ? parseInt(siblings) : 0;
//     const Nanaji = nanaji || "";
//     const Mamaji = mamaji || "";
//     const Address = req.body.address || "";
//     const contact_No = contact || "";
//     const biodata = req.file ? req.file.filename : "";

//     const query = `INSERT INTO matrimony (name, dob_time, birthplace, height, qulification, profession, father_name, mother_name, sibling, maternal, address, contact, grandfathername, nanaji, mamaji, photo,complexion,gorta)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//       Name,
//       dob,
//       Birthplace,
//       Height,
//       Qulification,
//       profession,
//       Father,
//       Mother,

//       Siblings,
//       "", // Placeholder for 'maternal' field
//       Address,
//       contact_No,
//       grand_father,
//       Nanaji,
//       Mamaji,
//       biodata,
//       Complexion,
//       Gorta,
//     ];

//     const result = await connection.promise().query(query, values);

//     console.log("member added successfully");
//     res.status(200).send("member added successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error adding member to database: " + error.message);
//   }
// });

// const upload2 = multer({ dest: "biodata/" });

// app.post("/member", upload2.single("photo"), async (req, res) => {
//   console.log("post user api hit");
//   var d1 = new Date();
//   try {
//     // Extract data from the request body
//     const {
//       name,
//       email,
//       contact_no,
//       whatsapp_no,
//       occupation,
//       designation,
//       address,
//       city,
//       social_status,
//       login_id,
//       login_password,
//       Membershippurpose,
//       created_by,
//       receipt,
//     } = req.body;

//     console.log("user req.body", req.body);

//     const Name = name || "";
//     const Email = email || "";
//     const contact_No = contact_no || "";
//     const whatsapp_No = whatsapp_no || "";
//     const Occupation = occupation || "";
//     const Designation = designation || "";
//     const Address = address || "";
//     const City = city || "";
//     const social_Status = social_status || "";
//     const login_Id = login_id || "";
//     const login_Password = login_password || "";
//     const created_By = created_by ? parseInt(created_by) : 0;
//     const Receipt = receipt || "";
//     const Membership_purpose = Membershippurpose || "";

//     const query = `INSERT INTO member (name, email, contact_no, whatsapp_no, occupation, designation, address, city, social_status, login_id, login_password, membership_purpose, created_by, created_datetime, receipt)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//       Name,
//       Email,
//       contact_No,
//       whatsapp_No,
//       Occupation,
//       Designation,
//       Address,
//       City,
//       social_Status,
//       login_Id,
//       login_Password,
//       Membership_purpose,
//       created_By,
//       d1,
//       Receipt, // Assuming receipt contains the file path
//     ];
//     console.log("values", values);
//     const result = await connection.promise().query(query, values);

//     console.log("member added successfully");
//     res.status(200).send("member added successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error adding member to database: " + error.message);
//   }
// });
// get matrimony data
app.get("/matrimonydata", async (req, res) => {
  try {
    const query = "SELECT * FROM matrimony";
    const result = await connection.promise().query(query);
    const matrimonialData = result[0];
    res.status(200).json(matrimonialData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving matrimonial data: " + error.message);
  }
});
// get city data
app.get("/citydata", async (req, res) => {
  try {
    const query = "SELECT city FROM member_mast";
    const result = await connection.promise().query(query);
    const cityData = result[0];
    res.status(200).json(cityData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving city data: " + error.message);
  }
});
// app.get("/dropdown", async (req, res) => {
//   try {
//     const query = "SELECT city FROM member_mast";
//     const query2 = "SELECT city FROM cat_mast";
//     const result = await connection.promise().query(query);
//     const result2 = await connection.promise().query(query2);
//     const cities = result[0].map((row) => row.city);
//     const cat = result[0].map((row) => row.category);

//     res.set({
//       "Content-Type": "application/json",
//       Authorization: "Bearer <your-token>",
//       // Add any other headers you need
//     });

//     res.render("index", { cities });
//   } catch (error) {
//     console.error("Error fetching city data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// oth city and cat data in singal object
app.get("/dropdown", async (req, res) => {
  try {
    const query = "SELECT city FROM member_mast";
    const query2 = "SELECT cat_name FROM category_mast";
    const result = await connection.promise().query(query);
    const result2 = await connection.promise().query(query2);
    const cities = result[0].map((row) => row.city);
    const cat = result2[0].map((row) => row.cat_name);

    const data = {
      cities: cities,
      cat: cat,
    };
    console.log("data", data);

    res.render("index", { data: data });
  } catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/home", async (req, res) => {
  try {
    const query = "SELECT city FROM member_mast";
    const query2 = "SELECT cat_name FROM category_mast";
    const result = await connection.promise().query(query);
    const result2 = await connection.promise().query(query2);
    const cities = result[0].map((row) => row.city);
    const cat = result2[0].map((row) => row.cat_name);

    const data = {
      cities: cities,
      cat: cat,
    };
    console.log("data", data);

    res.render("home", { data: data });
  } catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).send("Internal Server Error");
  }
});
// 27/6/23 post newsletter data

app.post("/contact", async (req, res) => {
  const d1 = new Date();
  try {
    console.log("req.body##", req.body);
    // Extract the contact information from the request body
    const { contact } = req.body;

    // Check if the contact value is empty
    if (!contact) {
      return res.status(400).json({ error: "Contact is required" });
    }

    // Format the created_at value
    const created_at = d1.toISOString().slice(0, 19).replace("T", " ");

    // Insert the contact into the database
    const query = "INSERT INTO newsletter (contact, created_at) VALUES (?, ?)";
    const values = [contact, created_at];

    await connection.promise().query(query, values);

    console.log("Contact added successfully");
    res.status(200).json({ message: "Contact added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add contact to the database" });
  }
});

// business registration form rendering
app.get("/postbusinessregister", async (req, res) => {
  try {
    const query = "SELECT sub_cat_name FROM sub_cat_mast";
    const query2 = "SELECT * FROM category_mast";
    const result = await connection.promise().query(query);
    const result2 = await connection.promise().query(query2);
    const sub_cat = result[0].map((row) => row.city);
    const cat = result2[0].map((row) => row.cat_name);

    const data = {
      sub_cat: sub_cat,
      cat: cat,
    };

    res.render("businessregister", { data: data });
  } catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).send("Internal Server Error");
  }
});
// get subcat data
app.get("/subcat", async (req, res) => {
  console.log("sub cat hitted");
  try {
    const id = req.body.id;
    console.log("id", id);
    const query = "SELECT sub_cat_name FROM sub_cat_mast WHERE cat_id = 1";
    const [rows] = await connection.promise().query(query);

    const sub_cat = rows.map((row) => row.sub_cat_name);
    console.log("sub_cat", sub_cat);
    const data = {
      sub_cat: sub_cat,
      cat: [], // Initialize the cat array here or fetch it from the database
    };
    console.log("data##", data);
    res.render("businessregister", { data: data });
  } catch (error) {
    console.error("Error fetching subcategory data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// post business registration data with image
// const multer = require("multer");
// const upload = multer({ dest: "busin_images/" });

// const upload = multer({ dest: "busin_images/" });

// app.post(
//   "/busindetail",
//   upload.fields([
//     { name: "shop_pic1", maxCount: 1 },
//     { name: "shop_pic2", maxCount: 1 },
//     { name: "shop_pic3", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     console.log("post business detail API hit");
//     try {
//       // Extract data from the request body
//       const {
//         ownerName,
//         organization_name,
//         address,
//         city,
//         state,
//         catDropdown,
//         subcatDropdown,
//         whats_gp_link,
//         website_url,
//         fb_link,
//         organization_logo,
//         owner_dp,
//         other_pic,
//       } = req.body;

//       // Retrieve the uploaded files

//       // Insert the new business details into the database
//       const query = `INSERT INTO business_details (owner_name, organization_name, address, city, state, catDropdown, subcatDropdown, whats_gp_link, website_url, fb_link, organization_logo, shop_pic1, shop_pic2, shop_pic3, owner_dp, other_pic)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//       const values = [
//         ownerName || "",
//         organization_name || "",
//         address || "",
//         city || "",
//         state || "",
//         catDropdown || "",
//         subcatDropdown || "",
//         whats_gp_link || "",
//         website_url || "",
//         fb_link || "",
//         organization_logo || "",
//         shopPic1 || "",
//         shopPic2 || "",
//         shopPic3 || "",
//         owner_dp || "",
//         other_pic || "",
//       ];

//       const result = await connection.promise().query(query, values);

//       console.log("Business details added successfully");
//       res.status(200).send("Business details added successfully");
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .send(
//           "Error adding business details to the database: " + error.message
//         );
//     }
//   }
// );
// const up
// load = multer({ dest: "busin_images/" });

// app.post("/busindetail", upload.single("image"), async (req, res) => {
//   console.log("post business detail API hit");
//   var d1 = new Date();
//   try {
//     // Extract data from the request body
//     const {
//       ownerName,
//       organizationName,
//       address,
//       city,
//       catDropdown,
//       whats_gp_link,
//       website_url,
//       insta_id,
//       fb_link,
//       organization_logo,
//       noOfProductPosted,
//     } = req.body;
//     console.log("req.body", req.body);
//     // Retrieve the uploaded file
//     const organizationLogo = req.file ? req.file.filename : null;
//     console.log("req.body", req.body);
//     // Insert the new business details into the database
//     const query = `INSERT INTO business_mast
//     (owner_name, organization_name, address, city, busi_sub_category, whats_gp_link, website, insta_id, fb_link, logo,description, created_datetime)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

//     const values = [
//       ownerName || "",
//       organizationName || "",
//       address || "",
//       city || "",
//       catDropdown || "",
//       whats_gp_link || "",
//       website_url || "",
//       insta_id || "",
//       fb_link || "",
//       organization_logo || "",
//       noOfProductPosted || "",

//       d1,
//     ];

//     const result = await connection.promise().query(query, values);

//     console.log("Business details added successfully");
//     res.render("productdetail");
//     res.status(200).send("Business details added successfully");
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send("Error adding business details to the database: " + error.message);
//   }
// });
// product detail posted 29/6/23
// const upload2 = multer({ dest: "busin_images/" });

const upload2 = multer({ dest: "busin_images/" });

app.post("/productdetails", upload2.single("image"), async (req, res) => {
  console.log("post product detail API hit");
  var d1 = new Date();
  try {
    // Extract data from the request body
    const {
      product_name,
      organizationName,
      description,
      productPrice,
      discount,
      contact,
      product_image,
      // whats_gp_link,
      // website_url,
      // insta_id,
      // fb_link,
      // noOfProductPosted,
    } = req.body;
    console.log("req.body##", req.body);

    // Retrieve the uploaded file
    const productImage = req.file ? req.file.filename : null;

    // Insert the new business details into the database
    const query = `INSERT INTO product_mast
    (product_name, oranization_name, product_description, product_price, discount, contact, product_image)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      product_name || "",
      organizationName || "",
      description || "",
      productPrice || "",
      discount || "",
      contact || "",
      product_image || "",
      // d1, // Add the value for the `created_at` column
    ];

    const result = await connection.promise().query(query, values);

    console.log("product details added successfully");
    res.status(200).send("product details added successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error adding product details to the database: " + error.message);
  }
});
//6/7/23 render product post
app.get("/postproduct", (req, res) => {
  // Fetch data from cat_mast table
  const query = "SELECT * FROM category_mast";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from cat_mast: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Render the "productpost" page with the fetched data
    res.render("productpost", { catData: results });
  });
});
app.get("/postfeedback", (req, res) => {
  res.render("feedback");
});
// 7/7/23
app.get("/postcontact", (req, res) => {
  res.render("contact");
});
//6/7/23 render member registration
app.get("/memberregister", (req, res) => {
  res.render("registration");
});
// verify visitor
app.get("/verifyvisitor", (req, res) => {
  res.render("verifyvisitor");
});
// 6/7/23 show product
app.post("/showproduct", async (req, res) => {
  console.log("product detail API hit");

  try {
    const { cat } = req.body;
    console.log("req.body##", req.body);

    // Query the product_mast table to retrieve products based on the category
    const selectProductsQuery = "SELECT * FROM product_mast WHERE category = ?";
    const [rows] = await connection.promise().query(selectProductsQuery, [cat]);

    if (rows.length === 0) {
      console.log("No products found for the given category");
      return res
        .status(404)
        .json({ message: "No products found for the given category" });
    }

    const data = { rows };
    console.log("data##", data);
    // Render the pbaproductdatalist view with the retrieved product data
    return res.render("pbaproductdatalist", { data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// app.get("/productdetail", (req, res) => {
//   return res.render("pbaproductdatalist");
// });
// 7/7/23 show regster businessfarm
app.get("/pbabusinessdata", async (req, res) => {
  console.log("register business detail API hit");

  try {
    // const { cat } = req.body;
    // console.log("req.body##", req.body);

    // Query the product_mast table to retrieve products based on the category
    const selectProductsQuery = "SELECT * FROM business_mast";
    const [rows] = await connection.promise().query(selectProductsQuery);

    if (rows.length === 0) {
      console.log("No products found for the given category");
      return res
        .status(404)
        .json({ message: "No products found for the given category" });
    }

    const data = { rows };
    console.log("data##", data);
    // Render the pbaproductdatalist view with the retrieved product data
    return res.render("pbabusiness", { data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});
app.get("/pbanewsletter", async (req, res) => {
  try {
    const selectNewsletterQuery = "SELECT * FROM newsletter";
    const [rows] = await connection.promise().query(selectNewsletterQuery);

    if (rows.length === 0) {
      console.log("No newsletter data found");
      return res.status(404).json({ message: "No newsletter data found" });
    }

    const data = { rows };
    console.log("data##", data);
    return res.render("pbasubscriber", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving newsletter data");
  }
});

app.get("/pbaproductdata", async (req, res) => {
  try {
    const selectProductsQuery = "SELECT * FROM product_mast";
    const [rows] = await connection.promise().query(selectProductsQuery);

    if (rows.length === 0) {
      console.log("No products found");
      return res.status(404).json({ message: "No products found" });
    }

    const data = { rows };
    console.log("data##", data);
    // Render the pbabusiproduct view with the retrieved product data
    return res.render("pbabusiproduct", { data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving products" });
  }
});
// querydetail render
app.get("/showquerydetail", async (req, res) => {
  try {
    const selectProductsQuery = "SELECT * FROM contact_detail_query";
    const [rows] = await connection.promise().query(selectProductsQuery);

    if (rows.length === 0) {
      console.log("No products found");
      return res.status(404).json({ message: "No products found" });
    }

    const data = { rows };
    console.log("data##", data);
    // Render the pbabusiproduct view with the retrieved product data
    return res.render("querydetail", { data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving products" });
  }
});
// feedbackdetail render
app.get("/getfeedbackdetail", async (req, res) => {
  try {
    const selectProductsQuery = "SELECT * FROM feedback";
    const [rows] = await connection.promise().query(selectProductsQuery);

    if (rows.length === 0) {
      console.log("No products found");
      return res.status(404).json({ message: "No products found" });
    }

    const data = { rows };
    console.log("data##", data);
    // Render the pbabusiproduct view with the retrieved product data
    return res.render("feedbackdetail", { data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving products" });
  }
});
