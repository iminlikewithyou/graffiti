import { ServerStorage } from "@rbxts/services"

let graffitiInstance: Instance | undefined = undefined;

function thereIsNoGraffitiInstance() {
  warn("There is no active Graffiti instance. Creating one now.");

  graffitiInstance = new Instance("Atmosphere");
  graffitiInstance.Name = "Graffiti Editor";
  graffitiInstance.Parent = ServerStorage;

  return graffitiInstance;
}

export function getGraffitiContainer() {
  // TODO
}

export function getGraffitiLocation() {
  return ServerStorage.FindFirstChild("Graffiti Editor")
}

export function getGraffitiInstance() {
  return graffitiInstance;
}

export function getBlueprintLocation(identifier: string) {
  return 
}