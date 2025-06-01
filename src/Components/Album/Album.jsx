import { useState } from "react";
import styles from "./Album.module.css";
import Button from "../Button/Button";

import audioFiles from "../../JS/audioWithoutJudgement";

const Album = ({ title, audioFilesArray, artWork }) => {
  const [audioFile, setAudioFile] = useState({
    title: "",
    value: "",
    src: null,
  });

  // Function for rendering audio files
  const renderAudioFiles = (e) => {
    const selectedAudioFile = audioFilesArray.find((file) => {
      return file.value === e.target.value;
    });
    setAudioFile({
      title: selectedAudioFile.title,
      value: selectedAudioFile.value,
      src: selectedAudioFile.src,
    });
  };

  return (
    <section className={styles.album}>
      <div className={styles.headerContainer}>
        <h1>{title}</h1>
      </div>
      <div className={styles.artworkContainer}>
        <img
          src={artWork}
          alt="artwork from our latest album Without Judgement"
          className={styles.albumArtwork}
        />
      </div>
      <div className={styles.audioContainer}>
        <div className={styles.titleContainer}>
          <h2>{audioFile.title !== "" ? audioFile.title : "Select a song"}</h2>
        </div>
        <div className={styles.buttonsContainer}>
          <audio
            src={audioFile.src}
            controls
            controlsList="nodownload"
            className={styles.audioPlayer}
          ></audio>
        </div>
        <div className={styles.songsContainer}>
          {audioFilesArray.map((song) => {
            return (
              <Button
                value={song.value}
                className={styles.songButton}
                onClick={renderAudioFiles}
                key={song.value}
              >
                {song.title}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Album;
