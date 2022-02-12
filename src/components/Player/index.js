import React, { useEffect, useState } from "react";
import "./styles.css";

function Player({ fps, urls }) {
  const oneSecondInMilesseconds = 1000;
  const hundredPerCent = 100;
  const [frameRender, setFrameRender] = useState(0);
  const [startStop, setStartStop] = useState(false);

  const timerIterval = oneSecondInMilesseconds / fps;
  const [frameBarProgress, setFrameBarProgress] = useState(0);
  const [currentFrameTime, setCurrentFrameTime] = useState(0);

  useEffect(() => {
    if (startStop) {
      const timer = setInterval(() => {
        if (frameRender === urls.length - 1) {
          setFrameRender(0);
        } else {
          setFrameRender(frameRender + 1);
        }
      }, timerIterval);
      return () => {
        clearInterval(timer);
      };
    }
  }, [frameRender, startStop]);

  useEffect(() => {
    const progressPercent =
      frameRender === 0
        ? 0
        : (frameRender * hundredPerCent) / (urls.length - 1);
    setFrameBarProgress(progressPercent);

    const currentFrameTimeCalculated =
      (timerIterval * urls.length * progressPercent) /
      hundredPerCent /
      oneSecondInMilesseconds;

    setCurrentFrameTime(currentFrameTimeCalculated);
  }, [frameRender]);

  return (
    <div className="screen-container">
      <div className="player-frame">
        <img className="player-img" alt="imagem" src={urls[frameRender]} />
      </div>
      <div className="player-controls">
        <div className="player-next-back">
          <button
            type="button"
            onClick={() => {
              setFrameRender(
                frameRender === 0 ? urls.length - 1 : frameRender - 1
              );
            }}
          >
            {"<<"}
          </button>
          <div className="progress-bar-border">
            <div
              className="progress-bar-indication"
              style={{ width: `${frameBarProgress}%` }}
            ></div>
          </div>
          <button
            type="button"
            onClick={() => {
              setFrameRender(
                frameRender === urls.length - 1 ? 0 : frameRender + 1
              );
            }}
          >
            {">>"}
          </button>
        </div>
        <div className="progress-time">{currentFrameTime}s</div>
        <div className="play-button-line">
          <button
            className="player-buttom"
            type="button"
            onClick={() => {
              setStartStop(!startStop);
            }}
          >
            {startStop ? "stop" : "play"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
