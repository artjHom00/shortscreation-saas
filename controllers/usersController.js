let User = require('../models/User.js')
let { generateAccessToken } = require('../services/jwt.js')
let { sendConfirmationCode, confirmEmail } = require('../services/mailConfirmation.js')
// let bcrypt = require('bcrypt')

async function confirmUser(req, res) {
  try {
    const { code } = req.body;
    
    let confirmation = await confirmEmail(req.user.id, code)

    if(!confirmation) {
      return res.status(401).json({ error: 'Email address not verified'}) 
    }
    
    res.json(confirmation)
    
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function authUser(req, res) {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and if the password is correct
    if (user && password === user.password) {
      
      let userWithJWT = await generateAccessToken(user)
      // Return the authenticated user
      res.json(userWithJWT);

    } else {
      // If the user doesn't exist or the password is incorrect, return an error response
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Create a new user
async function createUser(req, res) {
    
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
  
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
        return res.status(409).json({ error: 'Username or email already exists' });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        
        await sendConfirmationCode(email)
        let userWithJWT = await generateAccessToken(savedUser)

        res.status(201).json(userWithJWT);
        
    } catch (error) {
        res.status(500).json({ error });
    }
  }
  
  // Get all users
  async function getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  
  // Get a single user by ID
  async function getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  
  // Update a user by ID
  async function updateUser(req, res) {
    const { id } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  
  // Delete a user by ID
  async function deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  
  module.exports = {
    confirmUser,
    authUser,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  };