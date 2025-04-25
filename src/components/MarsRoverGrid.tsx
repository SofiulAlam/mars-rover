import React from "react";
import { Position, Plateau } from "../lib/marsRover";
import { cn } from "../lib/utils";

interface MarsRoverGridProps {
  plateau: Plateau;
  positions: Position[];
}

const MarsRoverGrid: React.FC<MarsRoverGridProps> = ({
  plateau,
  positions,
}) => {
  const rows = Array.from(
    { length: plateau.height + 1 },
    (_, i) => plateau.height - i
  );
  const cols = Array.from({ length: plateau.width + 1 }, (_, i) => i);

  const getArrowForDirection = (direction: string) => {
    switch (direction) {
      case "N":
        return "↑";
      case "E":
        return "→";
      case "S":
        return "↓";
      case "W":
        return "←";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-auto border rounded-md p-2 bg-white">
      <div className="grid gap-0">
        {rows.map((y) => (
          <div key={y} className="flex">
            {cols.map((x) => {
              const rover = positions.find((pos) => pos.x === x && pos.y === y);

              return (
                <div
                  key={`${x},${y}`}
                  className={cn(
                    "w-12 h-12 border flex items-center justify-center text-lg font-bold",
                    rover ? "bg-blue-200" : "bg-green-100"
                  )}
                >
                  {rover ? (
                    <span className="flex flex-col items-center">
                      <span className="text-xl">
                        {getArrowForDirection(rover.direction)}
                      </span>
                      <span className="text-xs">
                        ({x},{y})
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">
                      ({x},{y})
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverGrid;
