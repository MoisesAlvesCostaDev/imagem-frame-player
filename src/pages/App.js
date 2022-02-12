import Player from "../components/Player";
import { fps, urls } from "./mock";

function App() {
  return (
    <div>
      <Player fps={fps} urls={urls}></Player>
    </div>
  );
}

export default App;
