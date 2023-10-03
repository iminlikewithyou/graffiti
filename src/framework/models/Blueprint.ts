export default class Blueprint {
  public model: Model;
  // public scale: number;

  // TODO: In the future, it should be an ID which retrieves a model
  // from the model registry. For now, it's simpler to just pass the
  // model directly.
  constructor(model: Model) {
    this.model = model;
  }

  scale(scale: number) {
    this.model.ScaleTo(scale);
  }
}