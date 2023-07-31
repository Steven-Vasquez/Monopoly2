import { TextField } from "../components/TextField.tsx";

export function Test() {
    return (
        <div>
            <h1>Test Page</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus ipsum, a nam quasi rem minus eum maxime optio dolores libero aliquid quod molestias quas officiis laborum deleniti mollitia cupiditate qui.</p>
            <TextField inputType="text" placeholder={"Hello World"}/>
            <a href="/register">Register</a>
        </div>
    );
}

export default Test;