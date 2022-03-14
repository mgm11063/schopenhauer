import Nav from "../components/Nav"
import AuthModal from '../components/AuthModal'
import { useState } from "react";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const authToken = false;

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(true);

    }

    return (
        <>
            <div className="overlay">
                <Nav
                    minmal={false}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    setIsSignUp={setIsSignUp}
                />
                <div className="home">
                    <h1 className="primary-title">Swipe Right</h1>
                    <button className="primary-button" onClick={handleClick}>
                        {authToken ? "Signout" : "Create Account"}
                    </button>

                    {showModal && (
                        <AuthModal
                            setShowModal={setShowModal}
                            isSignUp={isSignUp}
                        />
                    )}

                </div>
            </div>
        </>
    )
};
export default Home;