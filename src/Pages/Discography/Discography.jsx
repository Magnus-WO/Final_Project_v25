import React from "react";
import Album from "../../Components/Album/Album";
import audioFilesWithoutJudgement from "../../JS/audioWithoutJudgement";
import audioFilesDawn from "../../JS/audioDawn";

const Discography = () => {
  const withoutJudgementImage = "/Assets/Images/WJalbumArtwork.JPG";
  const dawnImage = "/Assets/Images/DawnArtWork.png";
  return (
    <section>
      <Album
        title="Without Judgement"
        audioFilesArray={audioFilesWithoutJudgement}
        artWork={withoutJudgementImage}
      ></Album>
      <Album
        title="Dawn"
        audioFilesArray={audioFilesDawn}
        artWork={dawnImage}
      ></Album>
    </section>
  );
};

export default Discography;
