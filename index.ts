import { Vec2 } from "@leodeslf/vec.js";

class Segment implements Segment {
  angle: number = 0;
  head: Vec2 = new Vec2();
  tail: Vec2 = new Vec2();

  constructor(
    public length: number = 1,
    public target: Vec2 = new Vec2(),
    public anchor: Vec2 | undefined
  ) { }

  reachTarget(): void {
    if (this.target) {
      const difference: Vec2 = Vec2.subtract(this.target, this.tail);
      this.angle = difference.angleX;
      difference.scale(-1)
      difference.magnitude = this.length;
      this.tail.copy(Vec2.add(this.target, difference));
    }
  }

  reanchorTail(): void {
    if (this.anchor) {
      this.tail.copy(this.anchor);
    }
  }

  recoverLength(): void {
    this.head.copy(this.tail);
    this.head.add(Vec2.fromPolarCoords(this.length, this.angle));
  }
}

class Module implements Module {
  segments: Segment[] = [];

  constructor(
    public amountOfSegments: number,
    public length: number,
    target: Vec2,
    anchor?: Vec2
  ) {
    this.amountOfSegments = amountOfSegments;
    const segmentLength = length / amountOfSegments;
    this.segments[0] = new Segment(segmentLength, undefined, anchor);

    for (let i = 1; i < amountOfSegments; i++) {
      this.segments[i] = new Segment(
        segmentLength,
        undefined,
        this.segments[i - 1].head
      );
      this.segments[i - 1].target = this.segments[i].tail;
    }

    this.segments[amountOfSegments - 1].target = target as Vec2;
  }

  get anchor(): Vec2 | undefined {
    return this.segments[0].anchor;
  }

  get target(): Vec2 {
    return this.segments[this.amountOfSegments - 1].target;
  }

  set anchor(anchor: Vec2 | undefined) {
    this.segments[0].anchor = anchor;
  }

  set target(target: Vec2) {
    this.segments[this.amountOfSegments - 1].target = target;
  }

  updatePositions(): void {
    for (let i = this.amountOfSegments - 1; i >= 0; i--) {
      this.segments[i].reachTarget();
    }

    for (let i = 0; i < this.amountOfSegments; i++) {
      this.segments[i].reanchorTail();
      this.segments[i].recoverLength();
    }
  }
}

export default Module;
