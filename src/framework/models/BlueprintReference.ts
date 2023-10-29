export class BlueprintReference {
  public blueprintInstance: Instance;
  public changeReferenceEvent: BindableEvent = new Instance("BindableEvent");

  constructor(blueprintInstance: Instance) {
    this.blueprintInstance = blueprintInstance;
  }

  changeReference(blueprintInstance: Instance) {
    const oldBlueprintInstance = this.blueprintInstance;
    this.blueprintInstance = blueprintInstance;

    this.changeReferenceEvent.Fire(blueprintInstance, oldBlueprintInstance);
  }

  destroy() {
    this.changeReferenceEvent.Destroy();
  }
}