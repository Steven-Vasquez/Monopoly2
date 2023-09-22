// webRTCUtils.ts
// Set up using https://dashboard.metered.ca/

export const createPeerConnection = (): RTCPeerConnection => {
    /*
    if (!process.env.STUN_SERVER_1 || !process.env.STUN_SERVER_2 || !process.env.TURN_SERVER_URL_1 || !process.env.TURN_SERVER_USERNAME_1 || !process.env.TURN_SERVER_CREDENTIAL_1 || !process.env.TURN_SERVER_URL_2 || !process.env.TURN_SERVER_USERNAME_2 || !process.env.TURN_SERVER_CREDENTIAL_2 || !process.env.TURN_SERVER_URL_3 || !process.env.TURN_SERVER_USERNAME_3 || !process.env.TURN_SERVER_CREDENTIAL_3 || !process.env.TURN_SERVER_URL_4 || !process.env.TURN_SERVER_USERNAME_4 || !process.env.TURN_SERVER_CREDENTIAL_4) {
        throw new Error('Missing STUN/TURN server configuration');
    }
    */  

    const config = {
        iceServers: [
            // STUN servers
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun.relay.metered.ca:80" },

            // TURN servers
            {
                urls: "turn:turn.relay.metered.ca:80",
                username: "f80bce809d7dc5551fc39c1a",
                credential: "P+sTQPs589T1LKPz",
            },
            {
                urls: "turn:a.relay.metered.ca:80?transport=tcp",
                username: "f80bce809d7dc5551fc39c1a",
                credential: "P+sTQPs589T1LKPz",
            },
            {
                urls: "turn:a.relay.metered.ca:443",
                username: "f80bce809d7dc5551fc39c1a",
                credential: "P+sTQPs589T1LKPz",
            },
            {
                urls: "turn:a.relay.metered.ca:443?transport=tcp",
                username: "f80bce809d7dc5551fc39c1a",
                credential: "P+sTQPs589T1LKPz",
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