import { NavBar, Home, Songs, Search, LogIn, SignUp, Profile, SongsPlaylist } from "./components";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider } from "./components/contexts/AuthContext";
import { MainProvider } from "./components/contexts/MainProvider";

export const ThemeContext = createContext({});

function App() {



  return (
    <MainProvider>
    
      <AuthProvider>
        <div className="App">
          <BrowserRouter>
            <NavBar />
            < Profile />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/albums">
                <Route path=":id" element={<Songs />}></Route>
              </Route>
              <Route path="/playlist">
                <Route path=":id" element={<SongsPlaylist />}></Route>
              </Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/login" element={<LogIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
      </MainProvider>
  );
}

export default App;
