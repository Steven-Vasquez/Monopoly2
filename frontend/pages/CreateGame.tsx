import { useState } from 'react';

function CreateGame() {

    const [roomName, setRoomName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
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