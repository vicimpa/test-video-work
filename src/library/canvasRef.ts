import { RefCallback, RefObject } from "react";

export const canvasRef = (
  canvas: RefObject<HTMLCanvasElement>,
  context?: RefObject<CanvasRenderingContext2D>,
  handler?: (can: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => any
): RefCallback<HTMLCanvasElement> => {

  return (can: HTMLCanvasElement | null) => {
    var ctx = can?.getContext('2d') ?? null;
    Object.assign(canvas, { current: can });

    if (context)
      Object.assign(context, { current: ctx });

    if (handler && can && ctx)
      handler(can, ctx);
  };
};