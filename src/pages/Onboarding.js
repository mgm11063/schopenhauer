import { useState } from "react";
import Nav from "../components/Nav"

const Onboarding = () => {

    const [formData, setFormData] = useState({
        user_id: "",
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gender: false,
        gender_identity: "",
        gender_interset: "",
        email: "",
        url: "",
        about: "",
        matches: [],
    });

    const handleSubmit = () => {

    }
    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(formData);
    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => { }}
                showModal={false}
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">Fist Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />


                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                type="number"
                                id="dob_day"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                id="dob_month"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                id="dob_year"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'man'}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                            <input
                                type="radio"
                                id="woman-gender-identity"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'woman'}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>
                            <input
                                type="radio"
                                id="more-gender-identity"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'more'}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="show-gender">Show Gender On My Profile</label>
                        <input
                            type="checkbox"
                            id="show-gender"
                            name="show-gender"
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />

                        <label>Show Me</label>
                        <div className="multiple-input-container">
                            <input
                                type="radio"
                                id="man-gender-interest"
                                name="gender_interest"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_interset === "man"}
                            />
                            <label htmlFor="man-gender-interest">Man</label>
                            <input
                                type="radio"
                                id="woman-gender-interest"
                                name="gender_interest"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_interset === "woman"}
                            />
                            <label htmlFor="woman-gender-interest">Woman</label>
                            <input
                                type="radio"
                                id="everyone-gender-interest"
                                name="gender_interest"
                                value="everyone"
                                onChange={handleChange}
                                checked={formData.gender_interset === "everyone"}
                            />
                            <label htmlFor="more-gender-interest">Everyone</label>
                        </div>
                        <label htmlFor="about">About Me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            placeholder="i like long walks.."
                            value={formData.about}
                            onChange={handleChange}
                            required={true}
                        />
                        <input type="submit" />
                    </section>

                    <section>
                        <label htmlFor="url">Profile Profile</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            <img src={formData.url} alt="프로필" />
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
};
export default Onboarding;