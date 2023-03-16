import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";
import { Event, getEvents, simpleGetEvents } from "./MockApiCommunication";

export default function App() {
  return (
    <>
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Pingvin AS logo" />
        Pingvin AS eventside
      </header>
      <div className="events-overview">
        <h1>Dine hendelser</h1>
        <SimpleLoaderVersion />
      </div>
    </>
  );
}

const SimplestVersion = () => {
  const events = simpleGetEvents();
  return <EventsOverview events={events} />;
};

const SimpleVersion = () => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    getEvents().then(setEvents);
  }, []);
  return <EventsOverview events={events} />;
};

const SimpleLoaderVersion = () => {
  const [events, setEvents] = useState<Event[]>();
  useEffect(() => {
    getEvents().then(setEvents);
  }, []);
  return events ? <EventsOverview events={events} /> : <Loader />;
};

const EventsOverview = ({ events }: { events: Event[] }) => (
  <div>
    {events.map((event) => (
      <EventThumbnail key={event.id} event={event} />
    ))}
  </div>
);

const EventThumbnail = ({ event }: { event: Event }) => (
  <div onClick={() => console.log(event.title)}>
    <h2>{event.title}</h2>
  </div>
);

const Loader = () => <div>Laster hendelser...</div>;
