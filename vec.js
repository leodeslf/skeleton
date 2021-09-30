"use strict";
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    static angleBetween(a, b) {
        return Math.atan2(b.y * a.x - b.x * a.y, b.x * a.x + b.y * a.y);
    }
    static clone(a) {
        return new Vec2(a.x, a.y);
    }
    static distance(a, b) {
        const ABX = (a.x - b.x);
        const ABY = (a.y - b.y);
        return Math.sqrt(ABX * ABX +
            ABY * ABY);
    }
    static distanceChebyshev(a, b) {
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    }
    static distanceManhattan(a, b) {
        return Math.sqrt(Math.abs(a.x - b.x) +
            Math.abs(a.y - b.y));
    }
    static distanceMinkowski(a, b, e) {
        if (e === 0) {
            console.error("Cannot divide by zero.");
            return NaN;
        }
        return Math.pow((Math.pow(Math.abs(a.x - b.x), e) +
            Math.pow(Math.abs(a.y - b.y), e)), (1 / e));
    }
    static dot(a, b) {
        return (a.x * b.x +
            a.y * b.y);
    }
    static equal(a, b) {
        return (a.x === b.x &&
            a.y === b.y);
    }
    static fromCopy(a) {
        return new Vec2(a.x, a.y);
    }
    static fromPolarCoords(r, phi) {
        return new Vec2(r * Math.cos(phi), r * Math.sin(phi));
    }
    static lerp(a, b, t) {
        if (t > 1)
            t = 1;
        else if (t < 0)
            t = 0;
        return new Vec2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    }
    static project(a, b) {
        return Vec2.clone(b)
            .normalize()
            .scale(a.magnitude * Math.cos(Vec2.angleBetween(a, b)));
    }
    static random(min = 0, max = 1) {
        const R = min + Math.random() * (max - min);
        const PHI = Math.random() * Math.PI * 2;
        return new Vec2(R * Math.cos(PHI), R * Math.sin(PHI));
    }
    static subtract(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }
    get angleX() {
        return Math.atan2(this.y, this.x);
    }
    get angleY() {
        return Math.atan2(this.x, this.y);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x +
            this.y * this.y);
    }
    get xy() {
        return [this.x, this.y];
    }
    set limit(max) {
        if (this.magnitude > max) {
            this.normalize();
            this.x *= max;
            this.y *= max;
        }
    }
    set magnitude(m) {
        this.normalize();
        this.x *= m;
        this.y *= m;
    }
    set xy(xy) {
        this.x = xy[0];
        this.y = xy[1];
    }
    add(a) {
        this.x += a.x;
        this.y += a.y;
        return this;
    }
    clamp(min, max) {
        const M = this.magnitude;
        if (M > max)
            this.magnitude = max;
        else if (M < min)
            this.magnitude = min;
        return this;
    }
    copy(a) {
        this.x = a.x;
        this.y = a.y;
        return this;
    }
    limitMaxMagnitude(max) {
        const M = this.magnitude;
        if (M > max && M > 0) {
            this.normalize();
            this.x *= max;
            this.y *= max;
        }
        return this;
    }
    limitMinMagnitude(min) {
        const M = this.magnitude;
        if (M < min && M > 0) {
            this.normalize();
            this.x *= min;
            this.y *= min;
        }
        return this;
    }
    normalize() {
        let m = this.magnitude;
        if (m === 0)
            return this;
        else
            m = 1 / m;
        this.x *= m;
        this.y *= m;
        return this;
    }
    rotateAxisZ(phi) {
        [this.x, this.y] = [
            this.x * Math.cos(phi) + this.y * -Math.sin(phi),
            this.x * Math.sin(phi) + this.y * Math.cos(phi)
        ];
        return this;
    }
    scale(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }
    subtract(a) {
        this.x -= a.x;
        this.y -= a.y;
        return this;
    }
}
export default Vec2;
