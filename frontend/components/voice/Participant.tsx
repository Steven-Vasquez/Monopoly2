import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";


// Define the type for a participant
interface Participant {
    id: number;
}

const Participant: React.FC<Participant> = ({ id }) => {
    // Connecting to the socket room of the lobby for lobby-wide event updates
    const { lobbyID } = useParams<{ lobbyID: string }>();
    const socket = io("http://localhost:3001");
    socket.emit("join", lobbyID);

    // State variable to store audio tracks
    const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[]>([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const trackDictionary: { [key: number]: MediaStreamTrack } = {};

        // Define a function to handle when a new audio track is subscribed to (AKA when a user joins the chat or unmutes their mic)
        const trackSubscribed = () => {
            // Capture audio from the user's microphone when a new audio track is subscribed.
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    // Get the audio tracks from the stream
                    const audioTrack = stream.getAudioTracks()[0];

                    // Check if there are any audio tracks in the stream
                    if (audioTrack) {
                        // Add the first audio track to the audioTracks state
                        setAudioTracks((audioTracks) => [...audioTracks, audioTrack]);

                        // Define trackDictionary as an object where keys are numbers and values are MediaStreamTrack instances
                        const trackDictionary: { [key: number]: MediaStreamTrack } = {};
                        trackDictionary[id] = audioTrack;
                    }
                })
                .catch((error) => {
                    console.error("Error accessing microphone:", error);
                });

        };

        // Define a function to handle when an audio track is unsubscribed from (AKA when a user leaves the chat or mutes their mic)
        const trackUnsubscribed = (track: MediaStreamTrack) => {
            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
            }
        };

        socket.on(`audioTrackAdded/${id}`, trackSubscribed); // When websocket emits that a user joins the chat, start broadcasting their audio
        socket.on(`audioTrackRemoved/${id}`, () => { // When websocket emits that a user leaves the chat, stop broadcasting their audio
            if (trackDictionary[id]) {
                trackUnsubscribed(trackDictionary[id]);
                delete trackDictionary[id];
            }
        });

        return () => { // Clean up
            setAudioTracks([]);
            // Clean up event listeners
            socket.off(`audioTrackAdded/${id}`, trackSubscribed);
            socket.off(`audioTrackRemoved/${id}`, trackUnsubscribed);
        };
    }, [id]);

    // Attach the audio tracks to the DOM
    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack && audioRef.current) {
            const mediaStream = new MediaStream([audioTrack]);
            audioRef.current.srcObject = mediaStream;
            audioRef.current.autoplay = true;
            audioRef.current.muted = false;
        }
    }, [audioTracks]);

    return (
        <div className="participant">
            <h3>{id}</h3>
            <audio ref={audioRef} />
        </div>
    );
};

export default Participant;
