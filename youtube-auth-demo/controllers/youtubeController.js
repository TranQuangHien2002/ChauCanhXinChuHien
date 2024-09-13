const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');

dotenv.config();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const youtubeController = {
  authorize: (req, res) => {
    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/youtube.readonly',
    });
    res.json({ redirectUrl: authorizeUrl });
  },

  oauth2callback: async (req, res) => {
    const code = req.query.code;

    try {
      const { tokens } = await client.getToken(code);
      client.setCredentials(tokens);
      req.user.youtubeToken = tokens;
      res.json({ message: 'YouTube authorization successful' });
    } catch (error) {
      res.status(400).json({ message: 'Authorization failed', error });
    }
  },

  checkVideoAccess: async (req, res) => {
    const videoId = req.query.videoId;

    try {
      const youtube = google.youtube({ version: 'v3', auth: client });
      const response = await youtube.videos.list({
        part: 'status',
        id: videoId,
      });

      const video = response.data.items[0];
      if (video && video.status.privacyStatus === 'private') {
        return res.json({ message: 'Video is private' });
      }

      return res.json({ message: 'Video is public or you have access' });
    } catch (error) {
      return res.status(500).json({ message: 'Error checking video access', error });
    }
  },
};

module.exports = youtubeController;
