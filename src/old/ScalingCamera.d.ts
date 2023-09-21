interface Module {
  ActiveViewportPosition: UDim2,
  ActiveViewportSize: UDim2,
  CameraPosition: CFrame,
  DistortedPosition: UDim2,
  DistortedSize: UDim2,
  Fit: boolean,
  FocusArea: Vector2,
}

declare const Module: Module;

export = Module;