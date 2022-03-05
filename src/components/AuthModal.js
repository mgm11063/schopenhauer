import { useState } from "react";

const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);


    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (isSignUp && password !== confirmPassword) {
                setError("패스워드가 일치하지 않습니다.");
            } console.log("asfadsf")
        }
        catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>닫기</div>
            <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
            <p>쿠키활성화</p>
            <form onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" placeholder="email" required={true} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" name="password" placeholder="password" required={true} onChange={(e) => setPassword(e.target.value)} />
                {isSignUp && <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirmPassword" required={true} onChange={(e) => setConfirmPassword(e.target.value)} />}
                <input className="secondary-button" type="submit" />
                <p>{error}</p>
            </form>
            <hr />
            <h2>GET THE APP</h2>
        </div>
    )
};
export default AuthModal;