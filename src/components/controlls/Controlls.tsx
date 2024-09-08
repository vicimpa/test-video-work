import { ChangeEvent, FC, useRef } from "react";

import s from "./Controlls.module.sass";
import { useFrames } from "$hooks/useFrames";
import { usePlayerRef } from "$components/player";

export const Controlls: FC = () => {
  const range = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const video = usePlayerRef();

  const playPause = () => {
    if (video.current) {
      if (video.current.paused) {
        video.current.play();
      } else {
        video.current.pause();
      }
    }
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const val = +e.currentTarget.value;
    if (video.current) {
      if (video.current.currentTime !== val) {
        video.current.currentTime = val;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!video.current || !video.current.parentElement)
      return;
    if (document.fullscreenElement !== video.current.parentElement) {
      video.current.parentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useFrames(() => {
    if (!video.current || !range.current)
      return;

    video.current.controls = false;
    range.current.max = `${video.current.duration}`;
    range.current.value = `${video.current.currentTime}`;

    if (!button.current)
      return;

    const text = video.current.paused ? '⏵' : '⏸';
    if (button.current.innerText !== text)
      button.current.innerText = text;
  });

  return (
    <div className={s.controlls} onClick={playPause}>
      <div className={s.pannel}>
        <div style={{ display: 'contents' }} onClick={e => e.stopPropagation()}>
          <button ref={button} onClick={playPause}>
            Loading...
          </button>
          <input
            type="range"
            style={{ flexGrow: 1 }}
            onChange={changeValue}
            ref={range}
            step={0.001} />
          <button onClick={toggleFullscreen}>
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
};