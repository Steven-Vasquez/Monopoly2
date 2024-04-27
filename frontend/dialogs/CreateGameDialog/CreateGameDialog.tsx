import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/general/Button/Button.tsx';
import { TextField } from '../../components/general/TextField/TextField.tsx';
import { DialogPopup } from '../../components/general/DialogPopup/DialogPopup.tsx';
import "./CreateGameDialog.css"
import axiosInstance from '#backend/axiosInstance.ts';

export default function CreateGameDialog(): JSX.Element {
    const [roomName, setRoomName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');

    const [isDialogVisible, setDialogVisible] = useState(false);

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

    return (
        <div>
            <Button type="button" style={{ width: "auto" }} onClick={() => setDialogVisible(true)}>Create Game</Button>
            {isDialogVisible && (
                <DialogPopup setDialogVisible={setDialogVisible}>
                    <div className="create-game-dialog-container">
                        <div className="create-game-content">
                            <form onSubmit={handleSubmit}>
                                <h2>Create Game</h2>
                                <TextField
                                    label="Room Name"
                                    type="text"
                                    id="roomName"
                                    name="roomName"
                                    required
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}>
                                </TextField>
                                <label>
                                    Private:&nbsp;
                                    <input
                                        type="checkbox"
                                        checked={isPrivate}
                                        onChange={() => setIsPrivate(!isPrivate)} />
                                </label>
                                {isPrivate && (
                                    // Show password field only only if game room is private
                                    <div>
                                        <TextField
                                            label="Password"
                                            type="password"
                                            id="password"
                                            name="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}>
                                        </TextField>
                                    </div>
                                )}
                                <div className="form-button-container">
                                    <Button type="submit" style={{ width: "100%" }}>Create</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogPopup>
            )}
        </div>
    );
}
