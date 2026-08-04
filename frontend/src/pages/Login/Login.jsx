import "./Login.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();


    const [form, setForm] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleLogin = async () => {

        if (!form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }


        try {

            setLoading(true);

            const res = await API.post("/login", form);


            // Context API use
            login(
                res.data.user,
                res.data.token
            );


            toast.success("Login Successful");

            navigate("/dashboard");


        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="login-page">

            <div className="login-left">

                <h1>AuthFusion</h1>

                <h2>Secure Authentication Platform</h2>

                <p>
                    Protect your applications with JWT Authentication,
                    MongoDB and React.
                </p>

            </div>


            <div className="login-right">

                <div className="login-card">

                    <h2>Welcome Back</h2>


                    <Input
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                    />


                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                    />


                    <Button
                        text={loading ? "Signing In..." : "Login"}
                        onClick={handleLogin}
                    />


                    <p>
                        Don't have an account?
                        <Link to="/signup"> Sign Up</Link>
                    </p>


                </div>

            </div>

        </div>
    );
}

export default Login;