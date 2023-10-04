import express from 'express';

const router = express.Router(); // Create router object to define routes

// Define STUN and TURN server configuration
const rtcServerConfig = {
    iceServers: [
        // STUN servers
        { urls: process.env.STUN_SERVER_1 },
        { urls: process.env.STUN_SERVER_2 },

        // TURN servers
        {
            urls: process.env.TURN_SERVER_URL_1,
            username: process.env.TURN_SERVER_USERNAME_1,
            credential: process.env.TURN_SERVER_CREDENTIAL_1,
        },
        {
            urls: process.env.TURN_SERVER_URL_2,
            username: process.env.TURN_SERVER_USERNAME_2,
            credential: process.env.TURN_SERVER_CREDENTIAL_2,
        },
        {
            urls: process.env.TURN_SERVER_URL_3,
            username: process.env.TURN_SERVER_USERNAME_3,
            credential: process.env.TURN_SERVER_CREDENTIAL_3,
        },
        {
            urls: process.env.TURN_SERVER_URL_4,
            username: process.env.TURN_SERVER_USERNAME_4,
            credential: process.env.TURN_SERVER_CREDENTIAL_4,
        },
    ],
  };

router.get("/getWebRTCServers", async (request: any, response: any) => {
