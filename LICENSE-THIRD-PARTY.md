# Third-party licenses

## pmndrs/examples (MIT)

Source: https://github.com/pmndrs/examples (commit 541599a). The 3D scene patterns
come from these examples and were rewritten for this project (Next.js 16, R3F 9,
TypeScript strict):

- `room-with-soft-shadows`: interior lighting and accumulative soft shadows, camera easing.
- `html-markers`: drei `<Html>` markers that hide behind the model (`occlude`).
- `sky-dome-with-annotations`: idea of clickable annotation links (not shipped).

```
MIT License

Copyright (c) 2024 Poimandres

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

No model, texture or image from the examples is shipped (several have no credit).

## npm dependencies

Runtime dependencies (React, Next.js, three.js, @react-three/fiber, @react-three/drei,
maath) are MIT-licensed; their licenses ship in `node_modules` and in the bundles' license comments.
