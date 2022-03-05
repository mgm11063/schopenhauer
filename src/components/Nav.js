import logo from "../../src/images/color-logo-tinder.png"



const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    }
    const authToken = true;

    return (
        <>
            <nav>
                <div className="logo-container">
                    <img src={minimal ? logo : null} className="logo" alt="logo" />
                </div>

                {!authToken && !minimal &&
                    <button
                        className="nav-button"
                        onClick={handleClick}
                        disabled={showModal}
                    >Log in</button>
                }
            </nav>
        </>
    )
};
export default Nav;