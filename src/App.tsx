import { eventsSrc, videoSrc } from "$config";

import { Controlls } from "$components/controlls";
import { EventList } from "$components/eventslist";
import { EventsProvider } from "$components/events/EventsProvider";
import { Player } from "$components/player";
import { ViewEventZones } from "$components/vieweventzone";

export const App = () => {

  return (
    <>
      <Player src={videoSrc} width={600} height={300}>
        <EventsProvider data={eventsSrc}>
          <ViewEventZones />
          <Controlls />
          <EventList />
        </EventsProvider>
      </Player>
    </>
  );
};