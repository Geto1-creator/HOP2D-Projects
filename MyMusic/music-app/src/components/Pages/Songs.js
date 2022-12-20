import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ThemeContext } from "../../App";
import styles from "../assets/songs.module.css";
import { Player } from "../Player";


export const Songs = (props) => {
  const { accessToken } = useContext(ThemeContext);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [dur, setDur] = useState()
  const [p, setP] = useState(false)
  const [song_data, setSong_data] = useState()
  const [length, setLength] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [index, setIndex] = useState()
  const { id } = useParams("");

  const audioElem = useRef()

  useEffect(() => {
    generateSongs();
    console.log(accessToken);

  }, []);
  useEffect(() => {
    if (selectedSong != null) {
      if (isPlaying) {
        audioElem.current.play()
      } else {
        audioElem.current.pause()
      }
    }
  }, [isPlaying, selectedSong]);


  async function generateSongs() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch(
      "https://api.spotify.com/v1/albums/" + `${id}` + "/tracks" + "?market=us",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("song: ", data.items);
        setSongs(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onPlaying = () => {
    const duration = audioElem.current.duration
    const ct = audioElem.current.currentTime
    // console.log(duration, ct)
    setDur(ct / duration * 100)
    setLength(duration)
  }
  console.log(song_data)
  const ms = 54000000;
  console.log(new Date(ms).toISOString().slice(11, 19)); // 👉️ 15:00:00
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${padTo2Digits(minutes)}:${padTo2Digits(
      seconds,
    )}`;
  }


  console.log(dur)
  return (
    <div className={styles.Container}>
      {songs.map((song, index) => {

        return (
          <div className={styles.songContainer} onClick={() => {
            setIndex(index)
            setP(true)
            setSong_data(song)
            setSelectedSong(song.preview_url)
            setIsPlaying(true)
            // audioElem.current.play()

          }}>
            {/* <img src={song.image} /> */}
            <span className={styles.id}>{index + 1}</span>
            <div className={styles.song}>
              <span className={styles.songName}>{song.name}</span>
              <span className={styles.artist}>{song.artists[0].name}</span>
            </div>
            <span className={styles.duration}>{convertMsToTime(song.duration_ms)}</span>
            <Player />
          </div>
        );
      })}

      <>
        <audio src={selectedSong} ref={audioElem} onTimeUpdate={onPlaying} />
        <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying}
          setIsPlaying={setIsPlaying} audioElem={audioElem} selectedSong={selectedSong}
          setSelectedSong={setSelectedSong} index={index} setIndex={setIndex}
          dur={dur} p={p} setSongData={setSong_data} songData={song_data} length={Math.trunc(length)}

        />
      </>

    </div>
  );
};