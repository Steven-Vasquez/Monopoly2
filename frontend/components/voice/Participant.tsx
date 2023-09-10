import { useState, useEffect, useRef } from "react";


// Define the type for a participant
interface Participant {
    id: number;
    audioRefPassed : React.RefObject<HTMLAudioElement>;
}

const Participant: React.FC<Participant> = ({ id, audioRefPassed }) => {

    // Special case for when the audioRef is passed in as a prop (for the current user)
    if(audioRefPassed) {
        return (
            <div className="participant">
                <h3>{id}</h3>
                <audio ref={audioRefPassed} />
            </div>
        );
    }


    // State variable to store audio tracks
    const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[]>([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Define trackDictionary as an object where keys are numbers (user_id) and values are MediaStreamTrack instances
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
                        // Add the audio track to the track dictionary
                        trackDictionary[id] = audioTrack;
                    }
                })
                .catch((error) => {
                    console.error("Error accessing microphone:", error);
                });

        };
        trackSubscribed();

        // Define a function to handle when an audio track is unsubscribed from (AKA when a user leaves the chat or mutes their mic)
        const trackUnsubscribed = (track: MediaStreamTrack) => {
            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
            }
        };

        return () => { // Clean up
            setAudioTracks([]);
            if (trackDictionary[id]) {
                trackUnsubscribed(trackDictionary[id]);
                delete trackDictionary[id];
            }
        };
    }, []);

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
