const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("../database/connect");

const router = express.Router();

// =======================
// LOGIN PAGE
// =======================
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

// =======================
// SIGNUP
// =======================
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send("Missing username or password");
  }

  const hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users(username,password) VALUES(?,?)`,
    [username, hash],
    (err) => {
      if (err) return res.send("Username already exists");
      res.redirect("/login.html");
    }
  );
});

// =======================
// LOGIN
// =======================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE username=?`,
    [username],
    async (err, user) => {
      if (!user) return res.send("User not found");

      const ok = await bcrypt.compare(password, user.password);

      if (!ok) return res.send("Wrong password");

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role
      };

      if (user.role === "admin") {
        return res.redirect("/admin.html");
      }

      res.redirect("/chat.html");
    }
  );
});

// =======================
// LOGOUT
// =======================
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// =======================
// CURRENT USER
// =======================
router.get("/me", (req, res) => {
  if (!req.session.user) return res.json(null);
  res.json(req.session.user);
});

router.post("/update-account",(req,res)=>{

if(!req.session.user){
return res.send("Login required");
}

const { username,email,password } = req.body;

db.get(
`SELECT * FROM users WHERE id=?`,
[req.session.user.id],

async (err,user)=>{

if(!user) return res.send("User not found");

let finalPass=user.password;

if(password && password.trim()!==""){
finalPass=await bcrypt.hash(password,10);
}

db.run(
`UPDATE users SET username=?,email=?,password=? WHERE id=?`,
[
username || user.username,
email || user.email,
finalPass,
user.id
],
()=>{

req.session.user.username=username || user.username;

res.redirect("/account.html");

});

});
});
module.exports = router;
