import React, { useState } from "react";
import "./App.css";
import RoverControlForm from "./components/RoverControlForm";
import MarsRoverGrid from "./components/MarsRoverGrid";
import RoverResult from "./components/RoverResult";
import {
  MarsRover,
  parseCommands,
  parsePosition,
  parsePlateau,
  Position,
  Plateau,
} from "./lib/marsRover";

function App() {
  const [plateau, setPlateau] = useState<Plateau>({ width: 5, height: 5 });
  const [finalPositions, setFinalPositions] = useState<Position[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (plateauSize: string, roversData: string) => {
    try {
      setError(null);

      // Parse plateau size
      const parsedPlateau = parsePlateau(plateauSize);
      setPlateau(parsedPlateau);

      // Parse rovers data
      const lines = roversData.trim().split("\n");
      const results: Position[] = [];

      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 >= lines.length) break;

        const positionStr = lines[i];
        const commandsStr = lines[i + 1];

        const initialPosition = parsePosition(positionStr);
        const commands = parseCommands(commandsStr);

        // Create and execute rover
        const rover = new MarsRover(initialPosition, parsedPlateau);
        rover.executeCommands(commands);
        results.push(rover.getPosition());
      }

      setFinalPositions(results);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Mars Rover Mission Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Mission Parameters</h2>
          <RoverControlForm onSubmit={handleSubmit} />

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <RoverResult finalPositions={finalPositions} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Mars Terrain</h2>
          <MarsRoverGrid plateau={plateau} positions={finalPositions} />
        </div>
      </div>
    </div>
  );
}

export default App;
