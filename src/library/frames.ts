export type FrameListener = (dtime: number, time: number) => any;

const FRAME_LISETENRS = new Set<FrameListener>();
const FRAME_STATE = {
  currentTime: 0,
  deltaTime: 0,
};

function loop(time = performance.now()) {
  requestAnimationFrame(loop);
  const { currentTime } = FRAME_STATE;
  FRAME_STATE.deltaTime = time - currentTime;
  FRAME_STATE.currentTime = time;
  FRAME_LISETENRS.forEach(runFrame);
}

loop();

export function runFrame<T extends FrameListener>(fn: T): ReturnType<T> {
  const { deltaTime, currentTime } = FRAME_STATE;
  return fn(deltaTime, currentTime);
}

export function frames<T extends FrameListener>(fn: T) {
  FRAME_LISETENRS.add(fn);

  return () => {
    FRAME_LISETENRS.delete(fn);
  };
}