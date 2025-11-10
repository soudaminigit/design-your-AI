import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

const {
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_REDIRECT_URI
} = process.env;

// Step 1: Redirect user to LinkedIn authorization page
app.get('/auth/linkedin', (req, res) => {
  const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI)}&scope=openid%20profile%20email`;
  res.redirect(authorizationUrl);
});

// Step 2: Handle LinkedIn callback and exchange code for access token
app.get('/auth/linkedin/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    console.error("❌ Missing authorization code in callback");
    return res.status(400).send("Missing authorization code");
  }

  try {
    // Exchange code for access token
        const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      {   headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",            //  Force JSON
      "Accept-Encoding": "identity",           //  Prevent gzip compression
    },
    responseType: "text",                      //  Explicitly expect JSON
    decompress: true,                          //  Let Axios handle compression if present
   }
    );
    let raw = tokenResponse.data;
if (Buffer.isBuffer(raw)) raw = raw.toString("utf-8");
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("Failed to parse LinkedIn response:", raw.slice(0, 200));
  throw e;
}

    console.log("Token Response Data:", data);
    const { id_token } = data; // OpenID returns ID token
    if (!id_token) {
      console.error("❌ No ID token received:", tokenResponse.data);
      return res.status(400).send("Authentication failed: No ID token received");
    }

    //  Decode the ID token (it's a JWT)
    function decodeBase64Url(base64Url) {
  // Replace URL-safe chars
        base64Url = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with '=' if necessary
        const pad = base64Url.length % 4;
        if (pad) {
            base64Url += "=".repeat(4 - pad);
        }
        return JSON.parse(Buffer.from(base64Url, "base64").toString("utf-8"));
    }

    const [headerB64, payloadB64, signature] = id_token.split(".");
    const header = decodeBase64Url(headerB64);
    const payload = decodeBase64Url(payloadB64);

    console.log("✅ LinkedIn User Payload:", payload);


    //  Extract name & email from payload
    const user = {
      name: payload.name || `${payload.given_name || ""} ${payload.family_name || ""}`.trim(),
      email: payload.email,
      sub: payload.sub,
    };
    // Redirect user back to frontend with user info (encode in URL for demo)
    const redirectUrl = `${process.env.FRONTEND_URL}/student?name=${encodeURIComponent(
    user.name)}&email=${encodeURIComponent(user.email)}`;
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error("Error during LinkedIn OIDC flow:", error.response?.data || error.message);
    res.status(500).send("LinkedIn OIDC authentication failed");

  }
});

app.listen(3000, () => console.log(' Backend running on http://localhost:3000'));
