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
        <TODO />
      </div>
    </>
  );
}
