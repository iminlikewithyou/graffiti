// need to be able to transition certain elements between scenes

// this makes less or almost no sense in a 3D environment because it's hard to find a common
// origin and the camera may be positioned very far away or just not in a good position to see any transition

// but this is great for any 2D scenes since you can always see everything on the screen

// i guess there is some sort of sense of use for a 3D scene transition if you DO see the object
// you want to transition in the scene and want to move it or put it on a ViewportLayer

// so it really isn't as useless as i initially thought
// there should definitely be a helper function to check if the object is visible or not in the current viewport
// so the scene can decide to animate it differently or not at all