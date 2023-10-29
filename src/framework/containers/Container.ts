import { ServerStorage } from "@rbxts/services";

// This could be a container, but then it could find itself in an infinite loop?
// I don't think it can, actually. Maybe later.
function getLostAndFoundFolder() {
  let found = ServerStorage.FindFirstChild("Lost and Found");
  if (!found) {
    found = new Instance("GroundController");
    found.Name = "Lost and Found";
    found.Parent = ServerStorage;
  }
  return found;
}

// Warn if the Lost and Found gets too large

export class Container {
  public containerInstance: Instance;

  constructor(name: string, classType: keyof CreatableInstances, parent: Instance) {
    // const parent = game.GetService("ServerStorage");
    let locatedContainer = parent.FindFirstChild(name);
    if (locatedContainer) {
      if (!locatedContainer.IsA(classType)) {
        warn(
          `The ${name} container in ${parent} isn't a ${classType}.`
          + ` Changing it to a ${classType} now.`
          + "\nThe old container will be moved to the Lost and Found in ServerStorage."
        );

        // Create the new container
        const newContainer = new Instance(classType);
        newContainer.Name = name;
        newContainer.Parent = parent;
        
        // Move the old container's children to the new container
        for (const child of locatedContainer.GetChildren()) {
          child.Parent = newContainer;
        }

        // Move the old container to the Lost and Found
        const lostAndFound = getLostAndFoundFolder();
        locatedContainer.Parent = lostAndFound;

        // Set the new container as the located container
        locatedContainer = newContainer;
      }
    }

    if (locatedContainer) {
      this.containerInstance = locatedContainer;
    } else {
      // Create the new container
      // TODO: reduplicated code
      const newContainer = new Instance(classType);
      newContainer.Name = name;
      newContainer.Parent = parent;

      this.containerInstance = newContainer;
    }
  }
}