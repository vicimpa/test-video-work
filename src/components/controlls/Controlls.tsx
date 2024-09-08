import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import s from "./Controlls.module.sass";
import { useFrames } from "$hooks/useFrames";
import { usePlayerRef } from "$components/player";

export const Controlls: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const video = usePlayerRef();
  const [moved, setMoved] = useState(0);

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

  const mouseEvent = () => {
    setMoved(performance.now());
  };

  useEffect(() => {
    if (!video.current)
      return;
    var defaultValue = video.current.controls;
    video.current.controls = false;

    return () => {
      if (!video.current) return;
      video.current.controls = defaultValue;
    };
  });

  useFrames((_, time) => {
    if (!video.current || !range.current)
      return;

    range.current.max = `${video.current.duration}`;
    range.current.value = `${video.current.currentTime}`;

    if (container.current) {
      const div = container.current;
      const { classList } = div;

      if (document.fullscreenElement?.contains(div)) {
        classList.add(s.fullscreen);

        if (time < moved + 1000 || video.current.paused) {
          classList.add(s.moved);
        } else {
          classList.remove(s.moved);
        }

      } else {
        classList.remove(s.fullscreen);
      }
    }

    if (button.current) {
      const text = video.current.paused ? '⏵' : '⏸';

      if (button.current.innerText !== text)
        button.current.innerText = text;
    }
  });

  return (
    <div
      className={s.controlls}
      ref={container}
      onClick={playPause}
      onMouseDown={mouseEvent}
      onMouseMove={mouseEvent}
      onKeyDown={mouseEvent}
      onDoubleClick={toggleFullscreen}
    >
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