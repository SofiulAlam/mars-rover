import React from "react";
import { Position } from "../lib/marsRover";

interface RoverResultProps {
  finalPositions: Position[];
}

const RoverResult: React.FC<RoverResultProps> = ({ finalPositions }) => {
  if (finalPositions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Final Positions:</h2>
      <div className="bg-gray-100 p-4 rounded-md font-mono">
        {finalPositions.map((position, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">Rover {index + 1}:</span>{" "}
            {position.x} {position.y} {position.direction}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoverResult;
