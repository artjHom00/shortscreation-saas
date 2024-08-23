let ShortsGenerator = require('../providers/shorts')
let YoutubeAccount = require('../models/YoutubeAccount')
let User = require('../models/User')


async function addYoutubeAccount(req, res) {
  try {
    const {
      event_trigger_url,
      settings,
      tiktok_accounts
    } = req.body;

    const youtubeAccountsOfUser = await YoutubeAccount.find({
      user_id: req.user.id
    }).count()

    const user = await User.findById(req.user.id)

    if (user.subscription.type === 'Basic' && youtubeAccountsOfUser >= 1) {
      return res.status(400).json({
        error: 'Limit of accounts reached, buy subscription better!'
      });
    }
    if (youtubeAccountsOfUser >= 3) {
      return res.status(400).json({
        error: 'Limit of accounts reached!'
      });
    }

    // Check if event_trigger_email exists & matches regex
    if (!event_trigger_url || !event_trigger_url.match(/https:\/\/[^.]+\.m\.pipedream\.net/)) {
      return res.status(400).json({
        error: 'Event trigger URL is required'
      });
    }

    // Check if the url already exists in the database
    const existingAccount = await YoutubeAccount.findOne({
      event_trigger_url
    });
    if (existingAccount) {
      return res.status(400).json({
        error: 'Event Trigger Url already exists'
      });
    }

    // Create a new YoutubeAccount instance
    const newYoutubeAccount = new YoutubeAccount({
      user_id: req.user.id,
      event_trigger_url,
      settings,
      tiktok_accounts
    });

    // Save the YoutubeAccount to the database
    const savedYoutubeAccount = await newYoutubeAccount.save();

    res.status(201).json(savedYoutubeAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

// Get all Youtube accounts
const getYoutubeAccounts = async (req, res) => {
  try {
    const youtubeAccounts = await YoutubeAccount.find();
    res.json(youtubeAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Get a single Youtube account by ID
const getUsersYoutubeAccounts = async (req, res) => {
  try {
    const id = req.user.id
    const youtubeAccounts = await YoutubeAccount.find({
      user_id: id
    });

    res.json(youtubeAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Update a Youtube account by ID
const updateYoutubeAccount = async (req, res) => {
  try {
    const {
      id
    } = req.params;


    let {
      user_id,
      email,
      password,
      recovery_email,
      tiktok_provider_instance,
      use_tiktok_title,
      tiktok_accounts,
      background_video,
      settings
    } = req.body;

    if (req.file) {
      background_video = req.file.path
    }
    const user = await User.findById(req.user.id)

    if (settings?.uploadInterval && !(settings?.uploadInterval === 3 || settings?.uploadInterval === 6 || settings?.uploadInterval === 12 || settings?.uploadInterval === 24)) {
      return res.status(400).json({
        error: 'Upload interval should be either 3 / 6 / 12 / 24 hours'
      });
    }

    if (settings?.uploadInterval && (user.subscription.type === 'Basic' && settings?.uploadInterval < 12)) {
      return res.status(400).json({
        error: 'Upload interval should be higher, or upgrade your subscription!'
      });
    }
    if (settings?.uploadInterval && (user.subscription.type === 'Premium' && settings?.uploadInterval < 6)) {
      return res.status(400).json({
        error: 'Upload interval should be higher, or upgrade your subscription!'
      });
    }
    if (settings?.uploadInterval && (user.subscription.type === 'Ultimate' && settings?.uploadInterval < 3)) {
      return res.status(400).json({
        error: 'Upload interval should be higher, or upgrade your subscription!'
      });
    }

    const updatedYoutubeAccount = await YoutubeAccount.findByIdAndUpdate(
      id, {
        user_id,
        email,
        password,
        recovery_email,
        tiktok_provider_instance,
        use_tiktok_title,
        tiktok_accounts,
        background_video,
        settings
      }, {
        new: true
      }
    );

    if (!updatedYoutubeAccount) {
      return res.status(404).json({
        error: 'Youtube account not found'
      });
    }

    res.json(updatedYoutubeAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Delete a Youtube account by ID
const deleteYoutubeAccount = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deletedYoutubeAccount = await YoutubeAccount.findByIdAndDelete(id);

    if (!deletedYoutubeAccount) {
      return res.status(404).json({
        error: 'Youtube account not found'
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  addYoutubeAccount,
  getYoutubeAccounts,
  getUsersYoutubeAccounts,
  updateYoutubeAccount,
  deleteYoutubeAccount
}