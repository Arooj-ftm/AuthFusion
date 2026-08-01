import "./Input.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-group">
            <label>{label}</label>

            <div className="input-wrapper">
                <input
                    name={name}
                    type={
                        type === "password"
                            ? showPassword
                                ? "text"
                                : "password"
                            : type
                    }
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                {type === "password" && (
                    <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Input;