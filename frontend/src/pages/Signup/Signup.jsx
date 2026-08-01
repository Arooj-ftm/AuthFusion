import "./Signup.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/authService";
import { toast } from "react-toastify";

function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async () => {
        if (!form.name || !form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

        if (!passwordRegex.test(form.password)) {
            toast.error(
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
            );
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);

            await API.post("/register", form);

            toast.success("Account Created Successfully 🎉");

            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <h1>AuthFusion</h1>

                <h2>Create Your Account</h2>

                <p>
                    Join AuthFusion and experience secure authentication with JWT,
                    MongoDB and React.
                </p>
            </div>

            <div className="login-right">
                <div className="login-card">
                    <h2>Sign Up</h2>

                    <Input
                        label="Full Name"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                    />

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
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <p className="password-hint">
                        Password must contain at least <b>8 characters</b>, one uppercase,
                        one lowercase, one number and one special character.
                    </p>

                    <Button
                        text={loading ? "Creating Account..." : "Create Account"}
                        onClick={handleSignup}
                    />

                    <p>
                        Already have an account?
                        <Link to="/"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;