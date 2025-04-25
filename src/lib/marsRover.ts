export type Direction = "N" | "E" | "S" | "W";
export type Command = "L" | "R" | "M";
export type Position = {
  x: number;
  y: number;
  direction: Direction;
};
export type Plateau = {
  width: number;
  height: number;
};

export class MarsRover {
  private position: Position;
  private plateau: Plateau;

  constructor(position: Position, plateau: Plateau) {
    this.position = { ...position };
    this.plateau = { ...plateau };
  }

  public getPosition(): Position {
    return { ...this.position };
  }

  public executeCommands(commands: Command[]): void {
    commands.forEach((command) => {
      this.executeCommand(command);
    });
  }

  private executeCommand(command: Command): void {
    switch (command) {
      case "L":
        this.turnLeft();
        break;
      case "R":
        this.turnRight();
        break;
      case "M":
        this.moveForward();
        break;
    }
  }

  private turnLeft(): void {
    const directionMap: Record<Direction, Direction> = {
      N: "W",
      W: "S",
      S: "E",
      E: "N",
    };
    this.position.direction = directionMap[this.position.direction];
  }

  private turnRight(): void {
    const directionMap: Record<Direction, Direction> = {
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    };
    this.position.direction = directionMap[this.position.direction];
  }

  private moveForward(): void {
    const newPosition = { ...this.position };

    switch (this.position.direction) {
      case "N":
        newPosition.y += 1;
        break;
      case "E":
        newPosition.x += 1;
        break;
      case "S":
        newPosition.y -= 1;
        break;
      case "W":
        newPosition.x -= 1;
        break;
    }

    // Check if new position is within plateau bounds
    if (
      newPosition.x >= 0 &&
      newPosition.x <= this.plateau.width &&
      newPosition.y >= 0 &&
      newPosition.y <= this.plateau.height
    ) {
      this.position = newPosition;
    }
  }
}

export function parseCommands(commandString: string): Command[] {
  return commandString
    .split("")
    .filter(
      (char) => char === "L" || char === "R" || char === "M"
    ) as Command[];
}

export function parsePosition(positionString: string): Position {
  const parts = positionString.trim().split(" ");

  if (parts.length !== 3) {
    throw new Error("Invalid position format");
  }

  const x = parseInt(parts[0], 10);
  const y = parseInt(parts[1], 10);
  const direction = parts[2] as Direction;

  if (isNaN(x) || isNaN(y) || !["N", "E", "S", "W"].includes(direction)) {
    throw new Error("Invalid position values");
  }

  return { x, y, direction };
}

export function parsePlateau(plateauString: string): Plateau {
  const parts = plateauString.trim().split(" ");

  if (parts.length !== 2) {
    throw new Error("Invalid plateau format");
  }

  const width = parseInt(parts[0], 10);
  const height = parseInt(parts[1], 10);

  if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
    throw new Error("Invalid plateau values");
  }

  return { width, height };
}
