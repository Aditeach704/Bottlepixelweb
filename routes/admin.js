const express = require("express");
const db = require("../database/connect");

const router = express.Router();

// Admin check
router.use((req,res,next)=>{
if(!req.session.user || req.session.user.role!=="admin"){
return res.send("No access");
}
next();
});

// Users list
router.get("/users",(req,res)=>{
db.all(`SELECT id,username,email,role FROM users`,(err,rows)=>{
res.json(rows);
});
});

// Delete user
router.post("/delete-user",(req,res)=>{
db.run(`DELETE FROM users WHERE id=?`,[req.body.id],()=>{
res.send("Deleted");
});
});

// Announcement
router.post("/announce",(req,res)=>{
db.run(
`INSERT INTO announcements(message) VALUES(?)`,
[req.body.message],
()=>res.send("Done")
);
});

// Set rank
router.post("/set-rank",(req,res)=>{
db.run(
`UPDATE users SET role=? WHERE username=?`,
[req.body.role, req.body.username],
()=>res.send("Updated")
);
});

module.exports = router;