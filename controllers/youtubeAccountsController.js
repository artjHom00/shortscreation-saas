let ShortsGenerator = require('../providers/shorts')
let YoutubeAccount = require('../models/YoutubeAccount')


async function addYoutubeAccount(req, res) {
    try {
        const { email, password, recoveryEmail } = req.body;
            
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        // Check if the email already exists in the database
        const existingAccount = await YoutubeAccount.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        // Create a new YoutubeAccount instance
        const newYoutubeAccount = new YoutubeAccount({
            user_id: req.user.id,
            email,
            password,
            recovery_email: recoveryEmail
        });

        // Save the YoutubeAccount to the database
        const savedYoutubeAccount = await newYoutubeAccount.save();

        res.status(201).json(savedYoutubeAccount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
  // Get all Youtube accounts
  const getYoutubeAccounts = async (req, res) => {
    try {
      const youtubeAccounts = await YoutubeAccount.find();
      res.json(youtubeAccounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get a single Youtube account by ID
  const getUsersYoutubeAccounts = async (req, res) => {
    try {
      const id = req.user.id
      const youtubeAccounts = await YoutubeAccount.find({ user_id: id});
      
      res.json(youtubeAccounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update a Youtube account by ID
  const updateYoutubeAccount = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        user_id,
        email,
        password,
        recovery_email,
        tiktok_provider_instance,
        tiktok_accounts,
        background_video,
        settings
      } = req.body;
  
      const updatedYoutubeAccount = await YoutubeAccount.findByIdAndUpdate(
        id,
        {
          user_id,
          email,
          password,
          recovery_email,
          tiktok_provider_instance,
          tiktok_accounts,
          background_video,
          settings
        },
        { new: true }
      );
  
      if (!updatedYoutubeAccount) {
        return res.status(404).json({ error: 'Youtube account not found' });
      }
  
      res.json(updatedYoutubeAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete a Youtube account by ID
  const deleteYoutubeAccount = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedYoutubeAccount = await YoutubeAccount.findByIdAndDelete(id);
  
      if (!deletedYoutubeAccount) {
        return res.status(404).json({ error: 'Youtube account not found' });
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
    addYoutubeAccount,
    getYoutubeAccounts,
    getUsersYoutubeAccounts,
    updateYoutubeAccount,
    deleteYoutubeAccount
}