let User = require('../models/User')
let Short = require('../models/Short')
let Transaction = require('../models/Transaction')
let {
  generateAccessToken
} = require('../providers/jwt.js')
let {
  sendConfirmationCode,
  confirmEmail,
  sendRestorePasswordLink
} = require('../services/mailConfirmation.js')

// let bcrypt = require('bcrypt')

async function confirmUser(req, res) {
  try {
    const {
      code
    } = req.body;

    let confirmation = await confirmEmail(req.user.id, code)

    if (!confirmation) {
      return res.status(401).json({
        error: 'Email address not verified'
      })
    }

    res.json(confirmation)

  } catch (error) {
    console.error('Error confirming user:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

async function resendConfirmationMail(req, res) {
  try {

    if (req.user && req.user.email) {

      let isSent = await sendConfirmationCode(req.user.email).catch((error) => {
        res.status(500).json({
          error: 'Error occured while sending email!'
        });
        return false
      })


      if (isSent !== false) {

        res.status(201).send(true);

      }

    }

  } catch (error) {
    console.error('Error resending message:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

async function resetPasswordUsingMail(req, res) {
  try {

    let {
      email
    } = req.body

    let isSent = await sendRestorePasswordLink(email).catch((error) => {
      res.status(500).json({
        error: 'Error occured while sending email!'
      });
      return false
    })


    if (isSent !== false) {

      res.status(201).send(true);

    }

  } catch (error) {
    console.log("🚀 ~ file: usersController.js:79 ~ createUser ~ error:", error)
    res.status(500).json({
      error
    });
  }
}

async function authUser(req, res) {
  try {
    const {
      email,
      password
    } = req.body;

    // Find the user by email
    const user = await User.findOne({
      email
    });

    // Check if the user exists and if the password is correct
    if (user && password === user.password) {

      let userWithJWT = await generateAccessToken(user)
      // Return the authenticated user
      res.json(userWithJWT);

    } else {
      // If the user doesn't exist or the password is incorrect, return an error response
      res.status(401).json({
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

// Create a new user
async function createUser(req, res) {

  const {
    username,
    email,
    password
  } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: 'Username, email, and password are required'
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{
        username
      }, {
        email
      }]
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'Username or email already exists'
      });
    }


    let code = await sendConfirmationCode(email).catch((error) => {
      res.status(500).json({
        error: 'Error occured while sending email!'
      });
      return false
    })


    if (code !== false) {

      const newUser = new User(req.body);
      const savedUser = await newUser.save();


      // Update the user's model with the confirmation code
      await User.findOneAndUpdate({
        email
      }, {
        $set: {
          'confirmation.code': code
        }
      }, {
        new: true
      });

      let userWithJWT = await generateAccessToken(savedUser)

      res.status(201).json(userWithJWT);
    }

  } catch (error) {
    console.log("🚀 ~ file: usersController.js:79 ~ createUser ~ error:", error)
    res.status(500).json({
      error
    });
  }
}

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error
    });
  }
}


// Get all user's shorts
async function getUsersShorts(req, res) {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const shorts = await Short.find({
        user_id: req.user.id
      })
      .sort({
        created_at: 'desc'
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    const totalShorts = await Short.countDocuments({
      user_id: req.user.id
    }).exec();

    // Calculate total pages based on totalAffiliates and limit
    const totalPages = Math.ceil(totalShorts / limit);


    res.json({
      shorts: shorts,
      pagination: {
        page,
        limit,
        totalShorts,
        totalPages, // Include the total pages in the pagination object
      },
    });
  } catch (error) {
    console.log("🚀 ~ file: usersController.js:100 ~ getUsersShorts ~ error:", error)
    res.status(500).json({
      error
    });
  }
}

async function getUsersAffiliates(req, res) {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Fetch affiliates with pagination
    const affiliates = await User.find({
        refferal: userId
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    // Count the total number of affiliates
    const totalAffiliates = await User.countDocuments({
      refferal: userId
    }).exec();

    // Calculate total pages based on totalAffiliates and limit
    const totalPages = Math.ceil(totalAffiliates / limit);

    // Get transaction info for each affiliate
    const affiliateIds = affiliates.map((affiliate) => affiliate._id);

    const transactions = await Transaction.find({
      user_id: {
        $in: affiliateIds
      },
      status: 'paid'
    });

    const affiliatesWithTransactions = affiliates.map((affiliate) => {
      const affiliateTransactions = transactions.filter((transaction) =>
        transaction.user_id.equals(affiliate._id)
      );

      return {
        _id: affiliate._id,
        username: affiliate.username,
        email: affiliate.email,
        registration_date: affiliate.registration_date,
        transactions: affiliateTransactions.map((transaction) => ({
          _id: transaction._id,
          type: transaction.type,
          amount: transaction.amount,
          date: transaction.date,
        })),
      };
    });

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      affiliates: affiliatesWithTransactions,
      pagination: {
        page,
        limit,
        totalAffiliates,
        totalPages, // Include the total pages in the pagination object
      },
    });
  } catch (error) {
    console.error('Error fetching user affiliates:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}


// Get a single user by ID
async function getUserById(req, res) {
  const {
    id
  } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        error: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error
    });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  const {
    id
  } = req.params;

  try {
    let updatedUser = null;

    if (id === 'me') {
      updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true
      });
    } else {
      updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true
      });
    }
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({
        error: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error
    });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const {
    id
  } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({
        error: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error
    });
  }
}

// Get user by JWT
async function getUserInfo(req, res) {
  try {

    if (req.user) {
      let user = await User.findById(req.user.id)

      res.json(user)
    } else {
      res.status(404).json({
        error: 'User not found'
      });
    }

  } catch (error) {
    res.status(500).json({
      error
    });
  }
}


module.exports = {
  resendConfirmationMail,
  resetPasswordUsingMail,
  confirmUser,
  authUser,
  createUser,
  getUsers,
  getUsersAffiliates,
  getUsersShorts,
  getUserById,
  getUserInfo,
  updateUser,
  deleteUser
};