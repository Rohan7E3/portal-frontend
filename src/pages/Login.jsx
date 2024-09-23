import Form from "../components/Form";
import '../styles/Login.css';

function Login() {
    return (
        <div id="container">
            <Form route="/api/token/" method="login"/>
        </div>
    )
}

export default Login