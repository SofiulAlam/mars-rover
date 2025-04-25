import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface RoverControlFormProps {
  onSubmit: (plateauSize: string, roversData: string) => void;
}

const RoverControlForm: React.FC<RoverControlFormProps> = ({ onSubmit }) => {
  const [plateauSize, setPlateauSize] = useState("5 5");
  const [roversData, setRoversData] = useState(
    "1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plateauSize, roversData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="plateau-size">Plateau Size (width height)</Label>
        <Input
          id="plateau-size"
          value={plateauSize}
          onChange={(e) => setPlateauSize(e.target.value)}
          placeholder="e.g. 5 5"
          className="font-mono"
        />
      </div>

      <div>
        <Label htmlFor="rovers-data">
          Rovers Data (alternating position and commands)
        </Label>
        <textarea
          id="rovers-data"
          value={roversData}
          onChange={(e) => setRoversData(e.target.value)}
          placeholder="1 2 N&#10;LMLMLMLMM&#10;3 3 E&#10;MMRMMRMRRM"
          className="w-full h-32 p-2 border rounded-md font-mono"
        />
        <p className="text-xs text-gray-500 mt-1">
          Format: x y direction (N, E, S, W) on one line, commands (L, R, M) on
          the next line
        </p>
      </div>

      <Button type="submit">Run Rovers</Button>
    </form>
  );
};

export default RoverControlForm;
