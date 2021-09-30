"use strict";
import Vec2 from "./vec.js";
class Segment {
    constructor(segmentSize, desiredTarget, desiredAnchor) {
        this.segmentSize = segmentSize;
        this.desiredTarget = desiredTarget;
        this.desiredAnchor = desiredAnchor;
        this.end = new Vec2();
        this.base = new Vec2();
    }
    anchor() {
        if (!this.desiredAnchor)
            return;
        this.base.copy(this.desiredAnchor);
    }
    link() {
        this.end.copy(this.base);
        this.end.add(Vec2.fromPolarCoords(this.segmentSize, this.angle));
    }
    lookAt() {
        if (!this.desiredTarget)
            return;
        let difference = Vec2.subtract(this.desiredTarget, this.base);
        this.angle = difference.angleX;
        difference.scale(-1);
        difference.magnitude = this.segmentSize;
        this.base.copy(Vec2.add(this.desiredTarget, difference));
    }
}
export default Segment;
