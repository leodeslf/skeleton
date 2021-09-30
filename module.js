"use strict";
import Segment from "./segment.js";
class Module {
    constructor(segments, segmentSize, desiredTarget, desiredAnchor) {
        this.segments = segments;
        this.body = [];
        this.body[0] = new Segment(segmentSize, undefined, desiredAnchor);
        for (let i = 1; i < segments; i++) {
            this.body[i] = new Segment(segmentSize, undefined, this.body[i - 1].end);
            this.body[i - 1].desiredTarget = this.body[i].base;
        }
        this.body[segments - 1].desiredTarget = desiredTarget;
    }
    set target(target) {
        this.body[this.segments - 1].desiredTarget = target;
    }
    set anchor(anchor) {
        this.body[0].desiredAnchor = anchor;
    }
    update() {
        for (let i = this.segments - 1; i > -1; i--) {
            this.body[i].lookAt();
        }
        for (let i = 0; i < this.segments; i++) {
            this.body[i].anchor();
            this.body[i].link();
        }
    }
}
export default Module;
