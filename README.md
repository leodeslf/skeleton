# Inverse Kinematics

```txt
                ____     ____          ____
             ~~/   /\~~~/   /\~~~~~~~_/ __/\~~~
            ~~/   / /~~/   / /~~~~_/ __/\_\/~~
           ~~/   / /~~/   / /~~_/ __/\_\/~~~~
          ~~/   / /~~/   / /_/ __/\_\/~~~~~~
         ~~/   / /~~/   /_/   /\_\/~~~~~~~~
        ~~/   / /~~/   ____   \/~~~~~~~~~~
       ~~/   / /~~/   /\___\   \~~~~~~~~~
      ~~/   / /~~/   / /~~~~\   \~~~~~~~
     ~~/___/ /~~/___/ /~~~~~~\___\~~~~~
    ~~~\___\/~~~\___\/~~~~~~~~\___\~~~

```

## About

A class to create an IK module in 2D for JavaScript.

## Shapes

|`Module`
|---
|`body: Segment[]`
|`segments: number`
|`set anchor(value: Vec2 \| undefined)`
|`set target(value: Vec2)`
|`update(): void`

|`Segment`
|---
|`angle: number`
|`end: Vec2`
|`base: Vec2`
|`segmentSize: number`
|`desiredTarget: Vec2 \| undefined`
|`desiredAnchor: Vec2 \| undefined`
|`anchor(): void`
|`link(): void`
|`lookAt(): void`

## Install

```bash
npm i @leodeslf/inverse-kinematics
```

## Import

```javascript
import Module from '@leodeslf/inverse-kinematics';
```

## Usage

```javascript
const module = new Module(
  8,      // Amount of segments (number).
  20,     // Segments' size (number).
  target, // Module's target (Vec2).
  anchor  // Module's anchor (Vec2, optional).
);

// Update each body segment (lookAt + anchor + link).
module.update();

/**
 * We can, for instance, animate and draw each segment on a canvas and
 * update the `target` position as the mouse moves. See demo below.
 */
```

[Live demo here](https://leodeslf.github.io/inverse-kinematics/ "GitHub Pages") (1000 segments of 1px each).

## Author

[Leonardo de S.L.F](https://github.com/leodeslf "GitHub profile").

## License

MIT License.
