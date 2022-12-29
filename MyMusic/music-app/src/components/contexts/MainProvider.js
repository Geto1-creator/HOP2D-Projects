import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({children}) => {
  const [create, setCreate] = useState(false);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [playingTrack, setPlayingTrack] = useState();
  const [albums, setAlbums] = useState([]);
  const [isNavbar, setIsNavbar] = useState(false);
  const [artists, setArtists] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playlistSong, setPlaylistSong] = useState(false);
  const CLIENT_ID = "7989d19bf0fa41c88e1a1acfd7e93c09";
  const CLIENT_SECRET = "78ef5245c2ac4fbfb059f2a375b199a5";
  const audio = new Audio(albums.uri);

  const value = {
    create,
    setCreate,
    accessToken,
    setAccessToken,
    searchInput,
    setSearchInput,
    albums,
    setAlbums,
    playingTrack,
    setPlayingTrack,
    isPlaying,
    setIsPlaying,
    search,
    artists,
    setIsNavbar,
    isNavbar,
    playlists,
    setPlaylists,
    setPlaylistSong,
    playlistSong,
  };

  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log(data.access_token);
      });

    (async () => {
      const res = await axios.get("http://localhost:8000/playlists");
      console.log(res.data);
      setPlaylists(res.data);
    })();
  }, []);

  //Search
  async function search() {
    console.log("Search For " + searchInput);

    //Get req using search to get Artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });
    console.log("Artist ID " + artistID);

    var artist = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => setArtists(data.artists.items));
    console.log("Artist ID " + artistID);

    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      });
  }

  return (
    <MainContext.Provider value={value}>
        {children}
    </MainContext.Provider>
  )
};
