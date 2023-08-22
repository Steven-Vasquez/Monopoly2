import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateGame() {

    const [roomName, setRoomName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        axios.post('http://localhost:3001/api/games/create', {
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create Game</h1>
                <label>
                    Room Name:
                    <input
                        type="text"
                        value={roomName}
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
                                onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                )}
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateGame;