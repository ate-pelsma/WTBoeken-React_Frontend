import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalState } from "./utils/setLocalStorage";

export const UserSelf = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
  });
  // const [formData, setFormData] = useState({
  //   name: "",
  //   username: "",
  //   password: "",
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userData)

    fetch("http://localhost:8080/user/update", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "PUT",
      body: JSON.stringify(userData),
    });

    setJwt(null);
    localStorage.setItem("jwt", null);
    window.location.href = "/login";
  };

  const fetchUser = () => {
    fetch("http://localhost:8080/user/self", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((r) => r.json())
      .then((d) => setUserData(d));
  };

  useEffect(() => fetchUser(), [])

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="nameInput" className="form-label">
            Naam
          </label>
          <input
            type="text"
            placeholder={userData.name}
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder={userData.username}
            className="form-control"
            id="email"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Huidig of nieuw wachtwoord
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            required="required"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
            title="Wachtwoord moet kleine letter, hoofdletter en cijfer bevatten en tussen 8-32 tekens"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirmInput" className="form-label">Wachtwoord bevestigen</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            required="required"
            onChange={handleChange}
            pattern={`^${userData.password}$`}
            title="Wachtwoorden komen niet overeen"
          />
        </div>
        <button type="submit" className="buttonGreen">
          Bewerken
        </button>
      </form>
    </div>
  );
};
