import styles from "./assets/navbar.module.css";
import Logo from "./img/Invader.png";
import { BsMusicNoteList, BsSearch } from "react-icons/bs";
import { BiLibrary } from "react-icons/bi";
import { AiFillHome, AiFillPlusCircle, AiFillHeart } from "react-icons/ai";
import { Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import { useAuth } from "./contexts/AuthContext";
import { MainContext } from "./contexts/MainProvider";

export const NavBar = () => {
  const { create, setCreate, setIsNavbar, isNavbar } = useContext(MainContext)
  let location = useLocation()
  const { currentUser, isLogIn } = useAuth();
  useEffect(() => {
    if (location.pathname == '/login' || location.pathname == '/signup') {
      setIsNavbar(true)
    } else {
      setIsNavbar(false)
    }
  }, [location])
  console.log(isLogIn)




  return (

    <div className={isNavbar ? `${styles.Container} ${styles.none}` : styles.Container}>
      <Container>

        <div className={styles.logoCont}>
          {/* <img className={styles.logoImg} src={Logo} /> */}
          <BsMusicNoteList className={styles.logo} />
          <span className={styles.logoText}>Invader</span>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.tInner}>
            <AiFillHome className={styles.icons} />
            <Link to="/" className={styles.texts}>Home</Link>
          </div>
          <div className={styles.tInner}>
            <BiLibrary className={styles.icons} />
            <Link className={styles.texts}>Library</Link>
          </div>
          <div className={styles.tInner}>
            <BsSearch className={styles.icons} />
            <Link to="/search" className={styles.texts}>Search</Link>
          </div>
        </div>

        <div className={styles.textContainer}>
          <div className={styles.tInner}>
            <AiFillPlusCircle className={styles.icons} />
            <Link onClick={() => setCreate(!create)} className={styles.texts}>Create Playlist</Link>
          </div>
          <div className={styles.tInner}>
            <AiFillHeart className={styles.icons} />
            <Link className={styles.texts}>Favourite Playlist</Link>
          </div>
        </div>

        <div className={currentUser ? `${styles.bottomCont} ${styles.none}` : styles.bottomCont}>
          <Link to="/login" onClick={() => setIsNavbar(true)}>
            <Button className={styles.buttonLogIn}>Log In</Button>{" "}
          </Link>
          <Link to="/signup">
            <Button className={styles.buttonSignUp}>Sign Up</Button>{" "}
          </Link>

        </div>

      </Container>
    </div >
  );
};
