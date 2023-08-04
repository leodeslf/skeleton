declare interface Segment {
  anchor: Vec2 | undefined;
  angle: number;
  head: Vec2;
  length: number;
  tail: Vec2;
  target: Vec2;

  /**
   * Looks at the target and reaches it with the head (keeps length).
   */
  reachTarget(): void;

  /**
   * Moves the tail back to the anchor.
   */
  reanchorTail(): void;

  /**
   * Recovers the distance between head and tail to the original length.
   */
  recoverLength(): void;
}

declare interface SegmentConstructor {
  new(length?: number, target?: Vec2, anchor?: Vec2): Segment;
}

declare interface Module {
  amountOfSegments: number;
  segments: Segment[];
  length: number;

  get anchor(): Vec2 | undefined;

  get target(): Vec2;

  set anchor(anchor: Vec2 | undefined);

  set target(target: Vec2);

  /**
   * Each segment:
   * 
   * 1. Reaches its updated target.
   * 2. Re-anchors and recovers its length.
   */
  updatePositions(): void;
}

declare interface ModuleConstructor {
  new(amountOfSegments: number, length: number, target: Vec2, anchor?: Vec2): Module;
}

/**
 * Inverse kinematics in JavaScript.
 */
declare module "@leodeslf/skeleton" {
  /**
   * Inverse kinematic module.
   */
  const Module: ModuleConstructor;

  export default Module;
}
