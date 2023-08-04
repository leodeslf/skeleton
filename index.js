import { Vec2 } from "@leodeslf/vec.js";
class Segment {
    constructor(length = 1, target = new Vec2(), anchor) {
        this.length = length;
        this.target = target;
        this.anchor = anchor;
        this.angle = 0;
        this.head = new Vec2();
        this.tail = new Vec2();
    }
    reachTarget() {
        if (this.target) {
            const difference = Vec2.subtract(this.target, this.tail);
            this.angle = difference.angleX;
            difference.scale(-1);
            difference.magnitude = this.length;
            this.tail.copy(Vec2.add(this.target, difference));
        }
    }
    reanchorTail() {
        if (this.anchor) {
            this.tail.copy(this.anchor);
        }
    }
    recoverLength() {
        this.head.copy(this.tail);
        this.head.add(Vec2.fromPolarCoords(this.length, this.angle));
    }
}
class Module {
    constructor(amountOfSegments, length, target, anchor) {
        this.amountOfSegments = amountOfSegments;
        this.length = length;
        this.segments = [];
        this.amountOfSegments = amountOfSegments;
        const segmentLength = length / amountOfSegments;
        this.segments[0] = new Segment(segmentLength, undefined, anchor);
        for (let i = 1; i < amountOfSegments; i++) {
            this.segments[i] = new Segment(segmentLength, undefined, this.segments[i - 1].head);
            this.segments[i - 1].target = this.segments[i].tail;
        }
        this.segments[amountOfSegments - 1].target = target;
    }
    get anchor() {
        return this.segments[0].anchor;
    }
    get target() {
        return this.segments[this.amountOfSegments - 1].target;
    }
    set anchor(anchor) {
        this.segments[0].anchor = anchor;
    }
    set target(target) {
        this.segments[this.amountOfSegments - 1].target = target;
    }
    updatePositions() {
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
