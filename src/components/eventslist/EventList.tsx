import { useMemo, useState } from "react";

import s from "./EventList.module.sass";
import { useEventsContext } from "$components/events/EventsProvider";
import { usePlayerRef } from "$components/player";

const formatTime = (n = 0) => {
  let ceil = Math.floor(n);
  var milliseconds = `${(n - ceil) * 1000 | 0}`.padStart(3, '0');
  let seconds = `${(ceil % 60) | 0}`.padStart(2, '0');
  let minutes = `${(ceil / 60) % 60 | 0}`.padStart(2, '0');

  return `${minutes}:${seconds}:${milliseconds}`;
};

export const EventList = () => {
  const result = useEventsContext();
  const video = usePlayerRef();
  const [show, setShow] = useState(false);

  const resultSort = useMemo(() => {
    return result.sort((a, b) => a.timestamp - b.timestamp);
  }, [result]);

  return (
    <>
      <button className={s.button} onClick={() => setShow(true)}>≣</button>
      <div className={s.back} onClick={() => setShow(false)} data-show={show || undefined} />
      <div className={s.list} data-show={show || undefined}>
        <div className={s.content}>
          {
            resultSort.map((event, index) => (
              <button
                key={index}
                onClick={() => {
                  if (video.current) {
                    video.current.pause();
                    video.current.currentTime = event.timestamp;
                  }
                  setShow(false);
                }}
              >
                {formatTime(event.timestamp)}
              </button>
            ))
          }
        </div>
      </div>
    </>
  );
};