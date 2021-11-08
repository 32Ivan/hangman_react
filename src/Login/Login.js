import "./Login.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./login_store";
import user from "../image/user.png";
import { Link } from "react-router-dom";

function Login() {
  const [newuser, setUser] = useState(""); // novi korisnik input
  const [uuid, setUUID] = useState(); // uuid za svakog korisnika
  const [name, setNonName] = useState(); //za preged korisnika postojeci
  const [nonUUid, setNonUUid] = useState(); //za preged uuid postojeci
  const [error, setError] = useState(); // za error
  const [showbutton, setShowButton] = useState(false); // prikaz button za novog korisnika
  const [showlink, setShowLink] = useState(false); // prikaz igre

  const dispatch = useDispatch();

  //podatci koje saljemo za izradu novog korisnika
  const data = { uuid, newuser };

  //dohvacanje podataka iz redux objekta
  const show = useSelector((state) => state.login.loginUser);

  // Button za novog korisnika pregled jel vec postoi i dozvola za nastavak u igru
  const userHandler = (e) => {
    e.preventDefault();
    if (nonUUid !== uuid && name !== newuser) {
      dispatch(addUser(data));
      setError(false);
      setShowLink(true);
    } else {
      setError(true);
      setShowLink(false);
    }
  };

  useEffect(() => {
    //pregled postojecih korisnika za usporedivanje prilikom dodavanja novog
    show.map((users) => {
      setNonUUid(users.uuid);
      return setNonName(users.newuser);
    });

    //izrada uuid za svakog korisnika
    if (newuser.length >= 5) {
      setUUID(
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        })
      );
      setShowButton(true);
    } else {
      setShowButton(false);
      setShowLink(false);
    }
  }, [newuser, show]);

  return (
    <form>
      <div className="main">
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <img src={user} alt="profile" className="profile" />
              </div>
            </div>
            <div className="username">
              <h1>Enter Your Name</h1>
              {error && <div className="alert">The user already exists</div>}
              <div>
                <input
                  type="text"
                  placeholder="5-characters"
                  onChange={(e) => setUser(e.target.value)}
                  className="name"
                />
              </div>
              {showbutton && (
                <div className="login-button">
                  <button className="button" onClick={userHandler}>
                    New User
                  </button>
                </div>
              )}
              {showlink && (
                <div className="linkdiv">
                  <Link
                    to="/game"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    let's play a game
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
