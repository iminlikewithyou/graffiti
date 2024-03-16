import { Element2, Element3, UDim3 } from "../screen/Element";
import { BlueprintReference } from "./BlueprintReference";

export type BlueprintCreateable = BlueprintReference;

export class Blueprint implements Element3 {
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
  async proxyTo(parent: Element3, position: UDim3, tween: TweenInfo): Promise<void>;
  async proxyTo(parent: Element2, position: UDim2, tween: TweenInfo): Promise<void>;
  async proxyTo(parent: unknown, position: unknown, tween: unknown): Promise<void> {

  }

  scale(scale: number) {
    if (this.blueprintReference.blueprintInstance.IsA("Model")) {
      this.blueprintReference.blueprintInstance.ScaleTo(scale);
    }
  }
}