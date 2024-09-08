import { FC, PropsWithChildren, RefObject, createContext, useContext, useRef } from "react";

import s from "./Player.module.sass";

export type TPlayerProps = {
  src?: string;
  width?: number | string,
  height?: number | string;
} & PropsWithChildren;

const PlayerContext = createContext<RefObject<HTMLVideoElement> | null>(null);

export const usePlayerRef = () => {
  const video = useContext(PlayerContext);

  if (!video)
    throw new Error('No provide PlayerContext');

  return video;
};

export const Player: FC<TPlayerProps> = ({
  src,
  width,
  height,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  return (
    <div className={s.container} ref={ref} style={{ width, height }}>
      <video src={src} ref={video} />
      <div className={s.overlay}>
        <PlayerContext.Provider value={video}>
          {children}
        </PlayerContext.Provider>
      </div>
    </div>
  );
};