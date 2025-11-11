import axios from "axios";

export default async function handler(req, res) {
  try {
    const { code } = req.query;

    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { name, email } = profileResponse.data;

    // Redirect user to frontend success page with their name/email
    const redirectURL = `${process.env.FRONTEND_URL}/auth-success?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}`;

    res.redirect(redirectURL);
  } catch (err) {
    console.error("LinkedIn callback error:", err.message);
    res.status(500).json({ error: "LinkedIn authentication failed" });
  }
}
