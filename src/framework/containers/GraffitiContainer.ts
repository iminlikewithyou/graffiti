import { ServerStorage } from "@rbxts/services";
import Container from "./Container";

export default class GraffitiContainer extends Container {
  // public blueprintContainer: BlueprintContainer;

  constructor() {
    super("Graffiti Editor", "Atmosphere", ServerStorage);
    // this.blueprintContainer = blueprintContainer;
  }
}