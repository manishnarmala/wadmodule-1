<<<<<<< HEAD
/* ---------- backend/server.js ---------- */
=======
>>>>>>> 3f865c6 (Add project to wadmodule-1 repository)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.use('/api/memberships', require('./routes/memberships'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));