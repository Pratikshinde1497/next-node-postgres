
const users = require("../controllers/user.controller");
const  passport = require('passport');
var router = require("express").Router();


//  @desc   Demo path for success on authenticate with google
//  @route  GET   /api/v1/auth
router.get('/profile', (req, res)=> { res.json({ success: true, token_id: req.user.tokenId })})

//  @desc   Authenticate with google
//  @route  GET   /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile']} ))

//  @desc   Google auth callback decide what  to do on success or failure
//  @route  GET   /api/v1/auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), 
  (req, res) => {
    req.user = res
    res.redirect('/api/v1/auth/profile')
  })


//  @desc   Logout user from google sign in
//  @route  GET   /api/v1/auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect("/api/v1/");
})


// Create a new Tutorial
// router.post("/", users.create);

// // Retrieve all Tutorials
// router.get("/", users.findAll);


// Retrieve all published Tutorials
// router.get("/published", users.findAllPublished);

// login user
router.post("/login", users.findOne);

// // Update a Tutorial with id
// router.put("/:id", users.update);

// // Delete a Tutorial with id
// router.delete("/:id", users.delete);

// // Create a new Tutorial
// router.delete("/", users.deleteAll);

module.exports = router