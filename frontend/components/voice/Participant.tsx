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

        const trackSubscribed = (track: MediaStreamTrack) => {
            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track: MediaStreamTrack) => {
            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
            }
        };

        socket.on(`audioTrackAdded/${id}`, trackSubscribed);
        socket.on(`audioTrackRemoved/${id}`, trackUnsubscribed);


        return () => {
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
