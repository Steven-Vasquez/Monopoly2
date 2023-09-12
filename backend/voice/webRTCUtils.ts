// webRTCUtils.ts
import dotenv from 'dotenv';

dotenv.config();

export const createPeerConnection = (): RTCPeerConnection => {
    if (!process.env.STUN_SERVER_1 || !process.env.STUN_SERVER_2 || !process.env.TURN_SERVER_URL_1 || !process.env.TURN_SERVER_USERNAME_1 || !process.env.TURN_SERVER_CREDENTIAL_1 || !process.env.TURN_SERVER_URL_2 || !process.env.TURN_SERVER_USERNAME_2 || !process.env.TURN_SERVER_CREDENTIAL_2 || !process.env.TURN_SERVER_URL_3 || !process.env.TURN_SERVER_USERNAME_3 || !process.env.TURN_SERVER_CREDENTIAL_3 || !process.env.TURN_SERVER_URL_4 || !process.env.TURN_SERVER_USERNAME_4 || !process.env.TURN_SERVER_CREDENTIAL_4) {
        throw new Error('Missing STUN/TURN server configuration');
    }
        

    const config = {
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
    return new RTCPeerConnection(config);
};

export const createOffer = async (peerConnection: RTCPeerConnection) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
};

export const createAnswer = async (peerConnection: RTCPeerConnection) => {
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return answer;
};

export default {
    createPeerConnection,
    createOffer,
    createAnswer,
};