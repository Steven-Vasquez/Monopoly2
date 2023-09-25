import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button.tsx';
import "../stylesheets/CreateGame.css"
import axiosInstance from '../../backend/axiosInstance.ts';

function CreateGame(props: any) {

    const [roomName, setRoomName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        axiosInstance.post('/api/games/create', {
            roomName: roomName,
            isPrivate: isPrivate,
            password: password
        })
            .then(res => {
                console.log(res.data.message);
                if (res.data.success) {
                    navigate(`/lobby/${res.data.game_id}`)
                }
                else {
                    alert(res.data.message);
                    navigate('/createGame');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (props.trigger) ? (
        <div className="popup-container">
            <div className="popup-content">
                <form onSubmit={handleSubmit}>
                    <h2>Create Game</h2>
                    <label>
                        Room Name:
                        <input
                            type="text"
                            value={roomName}
                            required
                            onChange={(e) => setRoomName(e.target.value)} />
                    </label>

                    <br />

                    <label>
                        Private:
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)} />
                    </label>

                    {isPrivate && (
                        <div>
                            <label>
                                Password:
                                <input type="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                    )}
                    {/* <button type="submit">Create</button> */}
                    <div className="form-button-container">
                        <Button type="submit" style={{ width: "100%" }}>Create</Button>
                    </div>
                </form>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
            </div>
        </div>
    ) : "";
}

export default CreateGame;