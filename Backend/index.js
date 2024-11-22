const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const passport = require("passport");

// Middleware should be before routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DA_app',
    password: 'root'
});

// Test database connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
});

// Routes
app.get("/da", (req, res) => {
    // res.send("Welcome.");
    res.render("index.ejs");
});

app.post("/da/form", (req, res) => {
    console.log("Body of Form:", req.body);
    

    // Validate required fields
    if (!req.body.sentFrom || !req.body.sentTo || !req.body.D_A_No) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Helper function to convert undefined or null to null
    const toNullIfUndefined = (value) =>{ 
        if(value === undefined || value === null || value === ''){
            return null;
        }else {   
        // if(typeof(value)=="object"){
        //         let tempStr = "";
        //         value.forEach(element => {
        //             tempStr = tempStr + " , " + element;
        //         });

        //         // console.log("value 0 is:",value[0]+" , "+value[1]," is value 1:");
        //         console.log("tempStr is: ",tempStr);
        //         return tempStr;
        //     }
                return value;
            }
        } 

    const data = [
        [
            toNullIfUndefined(req.body.sentFrom),
            toNullIfUndefined(req.body.sentTo),
            toNullIfUndefined(req.body.D_A_No),
            toNullIfUndefined(req.body.sentDate),
            toNullIfUndefined(req.body.vehicleNo),
            toNullIfUndefined(req.body.driverName),
            toNullIfUndefined(req.body.referenceSubject),
            toNullIfUndefined(req.body.itemSerialNumber),
            toNullIfUndefined(req.body.itemCode),
            toNullIfUndefined(req.body.itemDescription),
            toNullIfUndefined(req.body.PONo),
            toNullIfUndefined(req.body.unit),
            toNullIfUndefined(req.body.quantity),
            toNullIfUndefined(req.body.station),
            toNullIfUndefined(req.body.itemValue),
            toNullIfUndefined(req.body.senderPno),
            toNullIfUndefined(req.body.senderName),
            toNullIfUndefined(req.body.packDate),
            toNullIfUndefined(req.body.receiverName),
            toNullIfUndefined(req.body.receiverPno)
        ]
    ];

    const query = `
        INSERT INTO da_Form (
            sentFrom,
            sentTo,
            D_A_No,
            sentDate,
            vehicleNo,
            driverName,
            referenceSubject,
            itemSerialNumber,
            itemCode,
            itemDescription,
            PONo,
            unit,
            quantity,
            station,
            itemValue,
            senderPno,
            senderName,
            packDate,
            receiverName,
            receiverPno
        ) VALUES ?
    `;

    connection.query(query, [data], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        console.log("Insert successful:", results);
        res.status(200).json({ 
            message: "Data inserted successfully", 
            insertId: results.insertId 
        });
    });
});
// post request end's here 

//getting my DA List

app.get("/da/list",(req,res)=>{
    // let playerData = [
    //     {
    //         user: "Matt A. Donovan",
    //         wagers: 14200,
    //         wl: -1456,
    //         balance: 4200,
    //         cashIn: 2000,
    //         cashOut: 0,
    //         numWagers: 250,
    //         avgW: 42,
    //         sharp: false,
    //         lastActive: "07-JAN-16:24",
    //         memberFor: "100 weeks",
    //         mobileRate: "0/100%"
    //     },
    //     {
    //         user: "Bilal Faza",
    //         wagers: 13200,
    //         wl: -1256,
    //         balance: 4200,
    //         cashIn: 2000,
    //         cashOut: 0,
    //         numWagers: 250,
    //         avgW: 42,
    //         sharp: false,
    //         lastActive: "08-JAN-16:24",
    //         memberFor: "108 weeks",
    //         mobileRate: "0/100%"
    //     },
    //     // Add more sample data as needed
    // ];
    connection.query("select * from da_form",(err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        
        console.log("read Database successful:", results);
        console.log("type of date is :", typeof(results.sentDate));
        res.render("list_report.ejs",{playerData:results});
    });
});

//Route for Log In
app.post('/da/login',(req,res)=>{
    
})



// Error handling middleware for server
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    connection.end();
    process.exit(0);
});
















