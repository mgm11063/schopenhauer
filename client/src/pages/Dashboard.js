import axios from "axios";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer"
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie"

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const [lastDirection, setLastDirection] = useState()
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);

    const userId = cookie.UserId;


    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user", {
                params: { userId },
            });
            setUser(response.data);
        }
        catch (err) {
            console.log(err);
        }
    };


    const getGenderedUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/gendered-users", {
                params: { gender: user?.gender_interest }
            })
            setGenderedUsers(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getUser()
        getGenderedUsers()
    }, [user, genderedUsers])


    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put("http://localhost:8000/addmatch", {
                userId,
                matchedUserId,
            })
            getUser()
        } catch (err) {
            console.log(err);
        }
    }


    const swiped = (direction, swipedUserId) => {
        if (direction === "right") {
            updateMatches(swipedUserId);
        }
        setLastDirection(direction)
    }
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }



    return (
        <>
            {user &&
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {genderedUsers.map((genderedUser) =>
                                <TinderCard
                                    className='swipe'
                                    key={genderedUser.name}
                                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                                >
                                    <div
                                        style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                                        className='card'
                                    >
                                        <h3>{genderedUser.first_name}</h3>
                                    </div>
                                </TinderCard>
                            )}

                            <div className="swipe-info">
                                {lastDirection ? <p>You wiped {lastDirection}</p> : <p> : </p>}
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )

};
export default Dashboard;