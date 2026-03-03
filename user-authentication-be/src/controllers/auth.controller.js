const { USER_CREDENTIALS } = require('../config/user-credentials')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    let userData = USER_CREDENTIALS.filter(user => user.email == email)

    if (!userData.length) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    userData = userData[0]

    if (email !== userData.email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (password !== userData.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      userName: userData['full_name']
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};