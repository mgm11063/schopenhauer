import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {
    const [cookie, setCookies, removeCookies] = useCookies(["user"]);
    const logout = () => {
        removeCookies("UserId", cookie.UserId);
        removeCookies("AuthToken", cookie.AuthToken);
        window.location.reload()
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt="사진" />
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>🔙</i>
        </div>
    )
};
export default ChatHeader;