import { Blueprint } from "../models/Blueprint";

export class UDim3 {
  private xDim: UDim;
  private yDim: UDim;
  private zDim: UDim;

  public constructor();
  public constructor(xDim: UDim, yDim: UDim, zDim: UDim);
  public constructor(xScale: number, xOffset: number, yScale: number, yOffset: number, zScale: number, zOffset: number);
  public constructor(a?: unknown, b?: unknown, c?: unknown, d?: unknown, e?: unknown, f?: unknown) {
    if (typeOf(a) === "number") {
      this.xDim = new UDim(a as number, b as number);
      this.yDim = new UDim(c as number, d as number);
      this.zDim = new UDim(e as number, f as number);
    } else if (a === undefined) {
      this.xDim = new UDim(0, 0);
      this.yDim = new UDim(0, 0);
      this.zDim = new UDim(0, 0);
    } else {
      this.xDim = a as UDim;
      this.yDim = b as UDim;
      this.zDim = c as UDim;
    }
  }

  static fromOffset(xOffset: number, yOffset: number, zOffset: number): UDim3 {
    return new UDim3(
      new UDim(0, xOffset),
      new UDim(0, yOffset),
      new UDim(0, zOffset)
    );
  }

  static fromScale(xScale: number, yScale: number, zScale: number): UDim3 {
    return new UDim3(
      new UDim(xScale, 0),
      new UDim(yScale, 0),
      new UDim(zScale, 0)
    );
  }
}

/*
  An Element3 can be proxied to another Element3 using a UDim3 position,
  or proxied to an Element2 using a UDim2 position.
*/
export abstract class Element3 {
  public Container: Frame;
  public Parent: Element3 | Element2;

  constructor(Parent: Element3 | Element2) {
    this.Container = new Instance("Frame");
    this.Parent = Parent;
  }

  isInSpace(): boolean {
    return this.Parent instanceof Element3;
  }

  proxyTo(parent: Element3, position: UDim3, tween: TweenInfo): Promise<void>;
  proxyTo(parent: Element2, position: UDim2, tween: TweenInfo): Promise<void>;
  proxyTo(parent: unknown, position: unknown, tween: TweenInfo): Promise<void> {
    return Promise.resolve();
  }
}

/*
  An Element2 can only be proxied to another Element2 using a UDim2 position.
  It is impossible for a 2D element to proxy to an Element3 in an understandable or predictable way.

  but that's not completely true - you can proxy an Element2 to another Element2 in 3D space
  (like a wall on some sort of Element3)

  think about this more

  how can an Element2 be on an Element3?
  we'd need to find the "world" of the Element2 (could be in a ViewportFrame, or in the Workspace)
  then we can create a temporary part for the proxy of the Element2 to the position it will go to in 3D space
  then we can tween the position of the part and destroy it afterwards


*/
export interface Element2 {
  proxyTo(parent: Element2, position: UDim2, tween: TweenInfo): Promise<void>;
}

// there needs to be a sort of 3D container to be able to make some sick explosion offsets easily

// should just use a sort of part or something instead because that supports .Changed and etc.
// and is optimized and very easy to tween
// but a CFrameValue can suffice as well

// the tradeoff is more that you can also unanchor it and allow it to do wacky things like be welded
// etc.

// 

// it doesn't make sense to be able to offset something that is unanchored
// because it will just move around completely unpredictably, or be affected by gravity unexpectedly
// it is impossible to create a "visual offset" on Roblox?
// maybe it's possible by welding..

// this requires the model to be a single piece - meaning it's a whole package and doesn't contain
// multiple unanchorable pieces
// you can make it avoid collision and it wouldn't be affected by gravity since it's welded

// this works if the answer to this question is no:
// does a Blueprint ever need to be unanchored (to fall apart into multiple pieces)?

// i think the answer is no
// and even when the answer is yes, it seems like you wanted to destroy the blueprint anyway
// not intending to keep it intact or use welding

export class ModelContainer {
  public Parent: PVInstance;
  private CFrame: CFrame;

  constructor(parent: PVInstance, position: CFrame);
  constructor(parent: PVInstance, position: Vector3);
  constructor(parent: PVInstance, position: unknown) {
    if (typeIs(position, "CFrame")) {
      this.CFrame = position;
    } else {
      this.CFrame = new CFrame(position as Vector3);
    }

    this.Parent = parent;
  }

  getPosition() {
    return this.CFrame.Position;
  }

  getCFrame() {
    return this.CFrame;
  }
}