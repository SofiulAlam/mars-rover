import {
  MarsRover,
  parseCommands,
  parsePosition,
  parsePlateau,
} from "./marsRover";

describe("MarsRover", () => {
  describe("movement", () => {
    test("should move forward in the correct direction", () => {
      const rover = new MarsRover(
        { x: 1, y: 2, direction: "N" },
        { width: 5, height: 5 }
      );
      rover.executeCommands(["M"]);
      expect(rover.getPosition()).toEqual({ x: 1, y: 3, direction: "N" });
    });

    test("should turn left correctly", () => {
      const rover = new MarsRover(
        { x: 1, y: 2, direction: "N" },
        { width: 5, height: 5 }
      );
      rover.executeCommands(["L"]);
      expect(rover.getPosition()).toEqual({ x: 1, y: 2, direction: "W" });
    });

    test("should turn right correctly", () => {
      const rover = new MarsRover(
        { x: 1, y: 2, direction: "N" },
        { width: 5, height: 5 }
      );
      rover.executeCommands(["R"]);
      expect(rover.getPosition()).toEqual({ x: 1, y: 2, direction: "E" });
    });

    test("should handle multiple commands", () => {
      const rover = new MarsRover(
        { x: 1, y: 2, direction: "N" },
        { width: 5, height: 5 }
      );
      rover.executeCommands(["L", "M", "L", "M", "L", "M", "L", "M", "M"]);
      expect(rover.getPosition()).toEqual({ x: 1, y: 3, direction: "N" });
    });

    test("should stay within the plateau boundaries", () => {
      const rover = new MarsRover(
        { x: 0, y: 0, direction: "S" },
        { width: 5, height: 5 }
      );
      rover.executeCommands(["M"]);
      expect(rover.getPosition()).toEqual({ x: 0, y: 0, direction: "S" });
    });
  });

  describe("provided test cases", () => {
    test("Test Case 1", () => {
      const rover = new MarsRover(
        { x: 1, y: 2, direction: "N" },
        { width: 5, height: 5 }
      );
      rover.executeCommands(["L", "M", "L", "M", "L", "M", "L", "M", "M"]);
      expect(rover.getPosition()).toEqual({ x: 1, y: 3, direction: "N" });
    });

    test("Test Case 2", () => {
      const rover = new MarsRover(
        { x: 3, y: 3, direction: "E" },
        { width: 5, height: 5 }
      );
      rover.executeCommands(["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"]);
      expect(rover.getPosition()).toEqual({ x: 5, y: 1, direction: "E" });
    });
  });
});

describe("Input parsing", () => {
  test("parseCommands should convert string to command array", () => {
    expect(parseCommands("LMLM")).toEqual(["L", "M", "L", "M"]);
  });

  test("parsePosition should convert string to position object", () => {
    expect(parsePosition("1 2 N")).toEqual({ x: 1, y: 2, direction: "N" });
  });

  test("parsePlateau should convert string to plateau object", () => {
    expect(parsePlateau("5 5")).toEqual({ width: 5, height: 5 });
  });

  test("parsePosition should throw error on invalid input", () => {
    expect(() => parsePosition("X Y Z")).toThrow();
  });

  test("parsePlateau should throw error on invalid input", () => {
    expect(() => parsePlateau("-1 5")).toThrow();
  });
});
