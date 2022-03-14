const { MongoClient } = require("mongodb")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cors = require("cors")


const PORT = 8000;
const express = require("express");
const uri = "mongodb://chris1382:a7640198@cluster0-shard-00-00.9upqe.mongodb.net:27017,cluster0-shard-00-01.9upqe.mongodb.net:27017,cluster0-shard-00-02.9upqe.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8dq447-shard-0&authSource=admin&retryWrites=true&w=majority"

const app = express()
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello my app");
})

app.post("/signup", async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).send("user already exists. pls login");
        }

        const sanitizedEmail = email.toLowerCase();
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword,
        }
        const insertedUser = await users.insertOne(data);

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        })

        res.status(201).json({ token, userId: generatedUserId, })
    }
    catch (err) {
        console.log(err);
    }
})



app.post("/login", async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const user = await users.findOne({ email });

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            res.status(201).json({ token, userId: user.user_id })
        }
        res.status(400).send("Invalid Credentials")
    }
    catch (err) {
        console.log(err);
    }
})


app.get("/user", async (req, res) => {
    const client = new MongoClient(uri);
    const userId = req.query.userId;


    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const query = { user_id: userId };
        const user = await users.findOne(query);
        res.send(user)
    } finally {
        await client.close();
    }

})






app.get("/gendered-users", async (req, res) => {
    const client = new MongoClient(uri);
    const gender = req.query.gender;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");
        const query = { gender_identity: { $eq: gender } }
        const foundUsers = await users.find(query).toArray();
        res.send(foundUsers);
    }
    finally {
        await client.close();
    }

})


app.put("/user", async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData;

    try {
        await client.connect()
        const database = client.db("app-data");
        const users = database.collection("users");

        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interset: formData.gender_interset,
                url: formData.url,
                about: formData.about,
                matches: formData.matches,
            },
        }
        const insertedUser = await users.updateOne(query, updateDocument);
        res.send(insertedUser);
    }
    finally {
        await client.close();
    }
})





app.put("/addmatch", async (req, res) => {
    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const query = { user_id: userId }
        const updateDocument = {
            $push: { matches: { user_id: matchedUserId } },
        }
        const user = await users.updateOne(query, updateDocument);
        res.send(user);
    } finally {
        await client.close();
    }
})


app.listen(PORT, () => console.log("🚀server running on PORT " + PORT));