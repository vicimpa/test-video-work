import { FC, useRef } from "react";

import { canvasRef } from "$library/canvasRef";
import s from "./ViewEventZone.module.sass";
import { useEventsContext } from "$components/events/EventsProvider";
import { useFrames } from "$hooks/useFrames";
import { usePlayerRef } from "$components/player";

export const ViewEventZones: FC = () => {
  const result = useEventsContext();
  const videoRef = usePlayerRef();
  const canvas = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D>(null);

  useFrames(() => {
    const { current: video } = videoRef;
    const { current: can } = canvas;
    const { current: ctx } = context;

    if (!video || !can || !ctx || !result)
      return;

    const currentTime = video.currentTime ?? 0;

    ctx.clearRect(0, 0, can.width, can.height);

    if (
      false
      || can.width !== video.videoWidth
      || can.height !== video.videoHeight
    ) {
      can.width = video.videoWidth;
      can.height = video.videoHeight;
    }

    ctx.fillStyle = '#0F0';

    for (let i = 0; i < result.length; i++) {
      var { timestamp, duration, zone } = result[i];
      timestamp = Math.floor(timestamp * 1000) / 1000;

      if (currentTime >= timestamp && currentTime <= (timestamp + duration)) {
        ctx.fillRect(zone.left, zone.top, zone.width, zone.height);
      }
    }
  });

  return (
    <canvas
      className={s.canvas}
      ref={canvasRef(canvas, context)} />
  );
};