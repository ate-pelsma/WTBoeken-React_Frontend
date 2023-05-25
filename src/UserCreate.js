import { useState } from "react";
import { useLocalState } from "./utils/setLocalStorage";
import { useNavigate } from "react-router-dom";

export const UserCreate = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    permissions: "",
    checked: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    formData.permissions = checked ? "ROLE_ADMIN" : "ROLE_USER";

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { checked, confirmPassword, ...userData } = formData;

    fetch("http://localhost:8080/user/save", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(userData),
    }).then(() => {
      navigate("/users");
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="nameInput" className="form-label">
            Naam
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Wachtwoord
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required="required"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
            title="Wachtwoord moet kleine letter, hoofdletter en cijfer bevatten en tussen 8-32 tekens"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirmInput" className="form-label">
            Wachtwoord bevestigen
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required="required"
            pattern={`^${formData.password}$`}
            title="Wachtwoorden komen niet overeen"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkbox"
            name="checked"
            checked={formData.checked}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkbox">
            Admin?
          </label>
        </div>
        <button type="submit" className="buttonGreen">
          Aanmaken
        </button>
      </form>
    </div>
  );
};
