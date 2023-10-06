import BlueprintReference from "./BlueprintReference";

export type BlueprintCreateable = BlueprintReference;

export default class Blueprint {
  public blueprintReference: BlueprintReference;
  // public scale: number;

  // TODO: In the future, it should be an ID which retrieves a model
  // from the model registry. For now, it's simpler to just pass the
  // model directly.
  constructor(createable: BlueprintCreateable) {
    if (createable instanceof BlueprintReference) {
      this.blueprintReference = createable;
    } else {
      error("Blueprint couldn't be created from", createable);
    }
  }

  scale(scale: number) {
    this.model.ScaleTo(scale);
  }
}