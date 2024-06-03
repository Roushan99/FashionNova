const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./db");
const multer = require("multer");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const razorpay = require("razorpay");
const Razorpay = require("razorpay");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Authentication middleware
const authentication = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.send("Please login first.");
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.send("Login expired, please login again.");
            }
            console.log("Decoded token:", decoded);  // Add this line to debug
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        res.send("Internal Server Error");
    }
};


//razorpay
app.post("/payment", async (req, res) => {
    try {
        const razorpay  = new Razorpay({
            key_id: "rzp_test_LRJNw7PDawVVXF",
            key_secret: "pF7qabPkgveB7ycsr2uddyh8",
    })

    const options = req.body;
    const order = await razorpay.orders.create(options);
    if(!order){
        return res.send("error")
    }
    
    res.send(order);
    } catch (error) {
        console.log(error);   
    }
})




// Registration endpoint
app.post("/signup", async (req, res) => {
    const { full_name, contact, email, address, dob, password } = req.body;
    console.log(full_name, contact, email, address, dob, password);
    try {
        const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.send("Email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            `INSERT INTO users (full_name, contact, email, address, dob, password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [full_name, contact, email, address, dob, hashedPassword]
        );
        const token = jwt.sign({ user_id: newUser.rows[0].user_id, email: email }, process.env.SECRET_KEY, { expiresIn: '10h' });
        res.send(newUser.rows[0]);
    } catch (error) {
        console.error(error);
        res.send("Internal Server Error");
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT user_id, full_name, email, password FROM users WHERE email = $1", [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).send("Invalid Credentials.");
        }

        const hashedPassword = result.rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            const token = jwt.sign({ user_id: result.rows[0].user_id, email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            // console.log(result.rows[0].full_name);
            res.send({ msg: "Login successful", token: token, name: result.rows[0].full_name, email: result.rows[0].email  });
        } else {
            res.status(401).send("Invalid Credentials.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



app.get("/user/:email", async (req, res) => {
   try {
    const {email} = req.params;
    const result = await pool.query("SELECT full_name, contact, email, address, dob FROM users WHERE email = $1", [email]);
    res.json(result.rows[0]);
   } catch (error) {
    console.log(error)
   } 
});


app.put("/userdetails", async (req, res) => {
    try {
    //  const {email} = req.params;
    const {full_name, contact, email, address,  dob} = req.body;
    const result = await pool.query(
        "UPDATE users SET full_name = $1, contact = $2, address = $3, dob = $4 WHERE email = $5 RETURNING *",
        [full_name, contact, address, dob, email]
    );
     console.log(result.rows[0])
     res.json(result.rows[0]);
    } catch (error) {
     console.log(error)
    } 
 });


 app.delete("/userdetails/:email", async (req, res) =>{
    try {
        const {email} = req.params;
        const result = await pool.query(
            "DELETE FROM users WHERE email = $1", [email]
        );
        res.json("data deleted");
    } catch (error) {
        console.log(error);
    }
 })




//cart product
//cart product
app.post('/cartproduct',  async (req, res) =>{
    try {
        const {image, title, quantity, price, email} = req.body;
        const result = await pool.query(
            "INSERT INTO cart(image, title, quantity, price, email) VALUES ($1, $2, $3, $4, $5)", [image, title, quantity, price, email]
        );
        res.send(result.rows[0]);
    } catch (error) {
        console.error("Error adding product to cart:", error); // Add error logging
        res.status(500).send("Internal Server Error");
    }
});

app.get('/cartproduct',  async (req, res) => {
    try {
        const {email} = req.query;  // Assuming the email is stored in the JWT token payload
        // console.log("Email from token:", email);  
        
        if (!email) {
            return res.status(400).send("Email is required.");
        }

        const result = await pool.query(
            "SELECT product_id, image, title, quantity, price FROM cart WHERE email = $1", [email]
        );
        
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching cart product:", error); // Add error logging
        res.status(500).send("Internal Server Error");
    }
});





// Add product endpoint
app.post('/addproduct', authentication, async (req, res) => {
  const { name, price, description, rating } = req.body;
  const image = req.file ? req.file.buffer : null;

  console.log('Received data:', {
      name,
      price,
      description,
      rating,
      image: image ? 'Image buffer exists' : 'No image buffer'
  });

  if (!image) {
      return res.status(400).send('Image is required.');
  }

  try {
      const query = `
          INSERT INTO products (image, name, price, description, rating)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING product_id
      `;
      const values = [image, name, price, description, rating];

      const result = await pool.query(query, values);
      console.log(image);
      res.send(`Product added with ID: ${result.rows[0].product_id}`);
  } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).send('Error adding product');
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
  const image = req.file ? req.file.buffer : null;

  if (!image) {
    return res.status(400).send('Image is required.');
  }

  try {
    const query = 'INSERT INTO upload (image) VALUES ($1)';
    await pool.query(query, [image]);
    res.send('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});







app.post('/clearcart', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }
    try {
      await pool.query('DELETE FROM cart WHERE email = $1', [email]);
      res.status(200).send({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).send({ message: 'Error clearing cart', error });
    }
  });




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
