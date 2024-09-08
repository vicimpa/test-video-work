import { FC, PropsWithChildren, createContext, useContext } from "react";

import { useAsync } from "$hooks/useAsync";

export type TEventItem = {
  timestamp: number;
  duration: number;
  zone: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

const EventsContext = createContext<TEventItem[] | null>(null);

export type TEventProviderProps = {
  data: TEventItem[] | string;
} & PropsWithChildren;

export const useEventsContext = () => {
  const result = useContext(EventsContext);
  if (!result)
    throw new Error('No events context provided');

  return result;
};

export const EventsProvider: FC<TEventProviderProps> = ({ data, children }) => {
  const [result, loading, error] = useAsync(async () => {
    if (typeof data === "string") {
      const response = await fetch(data);
      data = await response.json();
    }

    if (!Array.isArray(data))
      throw new Error('Invalid data');

    return data.filter(item => (
      !!item
      && typeof item === 'object'
      && typeof item.timestamp === 'number'
      && typeof item.duration === 'number'
      && !!item.zone
      && typeof item.zone === 'object'
      && typeof item.zone.left === 'number'
      && typeof item.zone.top === 'number'
      && typeof item.zone.width === 'number'
      && typeof item.zone.height === 'number'
    ));
  }, [data]);

  if (loading)
    return null;

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <EventsContext.Provider value={result}>
      {children}
    </EventsContext.Provider>
  );
};