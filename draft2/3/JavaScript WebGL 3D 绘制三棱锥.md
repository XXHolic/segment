# JavaScript WebGL 3D 绘制三棱锥

## <a name="start"></a> 引子
接着 [JavaScript WebGL 绘制顺序][url-pre]，终于可以进行三维绘制了，很多示例都是正方体，感觉顶点数据有些多，就来绘制一个三棱锥。

## <a name="coord"></a> 绘制三棱锥
以下是为了进行三维绘制去了解的知识点：
- [JavaScript WebGL 矩阵][url-2]
- [JavaScript WebGL 三维相关概念][url-3]
- [JavaScript WebGL 绘制顺序][url-pre]

由于相邻面会公用顶点数据，所以还会涉及到**索引缓冲对象**，在前面的 [JavaScript WebGL 绘制一个面][url-4]中有介绍。

下面代码涉及到上面的相关点不会再详细介绍。这里[在线示例][url-example1]。
## <a name="data"></a> 顶点数据
```js
//    v3 ------ v2
//    \  \    / /
//     \   v1  /
//      \  |  /
//       \ | /
//         v0
// 顶点
const vertices = new Float32Array([
  0.0,  -1.0,  0.0,   // v0
  0.0,  1.0,  1.0,   // v1
  1.0, 1.0,  -1.0,   // v2
  -1.0, 1.0,  -1.0,   // v3
]);
// 顶点对应颜色
const verticesColor = new Float32Array([
  0.0,  0.0,  0.0, // v0
  1.0,  1.0,  1.0, // v1
  0.0,  0.0,  0.0, // v2
  1.0,  1.0,  1.0, // v3
]);
// 公用顶点的索引缓冲数据
const verticesIndex = new Uint8Array([
  0, 1, 3, // left
  0, 2, 1, // right
  1, 2, 3, // up
  0, 3, 2, // back
]);
```
- 这里顶点和颜色单独分开了，需要注意这两个声明的数据相匹配，否则在最后绘制的时候，可能会导致无法绘制，出现 `Vertex buffer is not big enough for the draw call` 的提示。

## <a name="vertex"></a> 顶点着色器
```js
const source = `
  attribute vec4 aVertexPos;
  attribute vec4 aColor;
  uniform mat4 uProMatrix;
  uniform mat4 uViewMatrix;

  varying vec4 vColor;

  void main(void){
    gl_Position = uProMatrix * uViewMatrix * aVertexPos;
    vColor = aColor;
  }
`;
```
- `aVertexPos` ：顶点数据
- `aColor` ：顶点对应颜色
- `uProMatrix` ：投影矩阵。
- `uViewMatrix` ：视图矩阵，模拟观察者。

## <a name="fragment"></a> 片元着色器
```js
const fragmentSource = `
  precision mediump float;
  varying vec4 vColor;

  void main(void){
    gl_FragColor = vColor;
  }
`;
```

## <a name="draw"></a> 绘制
下面是绘制的主要逻辑：

```js
/* 部分省略代码 */

// 初始化着色器程序
const shaderProgram = createShaderProgram(gl, source, fragmentSource);
// 集中初始化顶点、颜色和索引数据
const screenBuffer = initBuffersForScreen(gl);
// 绘制
draw(gl, shaderProgram, screenBuffer);

/* 部分省略代码 */

/**
 * 绘制
 * @param {*} gl WebGL 上下文
 * @param {*} shaderProgram 着色器程序
 * @param {*} screenBuffer 顶点、颜色、索引缓冲数据都放在这个对象中
 */
function draw(gl, shaderProgram, screenBuffer) {
  // 开启隐藏面消除
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(shaderProgram.program);
  // 绑定顶点数据并启用对应属性
  bindEnableBuffer(
    gl,
    gl.ARRAY_BUFFER,
    screenBuffer.verticesBuffer,
    shaderProgram.aVertexPos,
    3
  );
  // 绑定顶点颜色数据并启用对应属性
  bindEnableBuffer(
    gl,
    gl.ARRAY_BUFFER,
    screenBuffer.verticesColorBuffer,
    shaderProgram.aColor,
    3
  );
  // 使索引缓冲数据生效，需要与 drawElements 一起使用
  bindTargetBuffer(
    gl,
    gl.ELEMENT_ARRAY_BUFFER,
    screenBuffer.verticesIndex
  );
  const m4View = new M4();
  // 生成视图矩阵
  m4View.setLookAt([0, 4, 10], [0, 0, 0], [0, 1, 0]);
  const m4Pro = new M4();
  // 生成投影矩阵
  m4Pro.setPerspectiveProjection([30, 1, 1, 100]);
  // 赋给着色器对应变量
  gl.uniformMatrix4fv(shaderProgram.uViewMatrix, false, m4View.matrix);
  gl.uniformMatrix4fv(shaderProgram.uProMatrix, false, m4Pro.matrix);
  // 清理颜色和深度缓冲
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // 绘制顶点
  gl.drawElements(gl.TRIANGLES, 12, gl.UNSIGNED_BYTE, 0);
}
```
- `M4` 类是一个简单的矩阵处理类，看源码即可。
- 看了好几个示例，都是在各个地方分别给着色器中变量赋值，这里按照个人习惯为了方便对照，都集中到了 `draw` 方法中。


<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [WebGL编程指南在线版][url-1]

[url-pre]:https://github.com/XXHolic/segment/issues/121
[url-1]:https://sites.google.com/site/webglbook/
[url-2]:https://github.com/XXHolic/segment/issues/117
[url-3]:https://github.com/XXHolic/segment/issues/120
[url-4]:https://github.com/XXHolic/segment/issues/111

[url-example1]:https://xxholic.github.io/segment/draft2/3/example/index.html


<details>
<summary>:wastebasket:</summary>

最近看了电影[《坠入》][url-waste]，感觉蛮不错的。

![img-waste][url-waste-local]

</details>

[url-waste]:https://movie.douban.com/subject/1890572/
[url-waste-local]:./image/waste.png