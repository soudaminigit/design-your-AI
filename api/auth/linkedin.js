import axios from "axios";

export default async function handler(req, res) {
  const { LINKEDIN_CLIENT_ID, LINKEDIN_REDIRECT_URI } = process.env;

  const linkedinAuthURL =
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
    `&client_id=${LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}` +
    `&scope=openid%20profile%20email`;

  res.redirect(linkedinAuthURL);
}
