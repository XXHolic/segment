# JavaScript WebGL 绘制顺序
## <a name="index"></a> 目录
- [引子](#start)
- [参考资料](#reference)

## <a name="start"></a> 引子
在 [JavaScript WebGL 三维相关概念][url-pre]中尝试一些效果的时候，又碰到了新问题，就去查了资料，自己尝试后总结下。

## 绘制顺序
之前二维绘制顺序并没有产生明显的不好效果，现在绘制三维影响就比较大了。

先看看二维相同一套顶点不同顺序的效果：
- [二维面顺序示例 1][url-example1]
- [二维面顺序示例 2][url-example2]

面的颜色始终保持一致，但顺序变了，发现 **WebGL 默认情况下会按照缓冲区中顺序绘制**，也就是后绘制的图形会覆盖先绘制的图形。这个就像一层一层贴纸一样，比较符合一般认知，所以在二维绘制时并没发现明显不对劲的地方。

关于三维绘制顺序先思考一下：三维的顶点坐标有三个分量，第三个分量是在 z 轴上表示深度信息，默认垂直屏幕向内为负方向，那么 z 值越大表示离屏幕越近，既然都有区分的依据，直接按照这个顺序绘制应该就可以了。实际试试：
- [三维面顺序示例 1][url-example3]
- [三维面顺序示例 2][url-example4]

发现示例 2 中 z 分量的设置并没有效果，还是跟二维绘制面顺序一样。查资料说要开启**隐藏面消除**功能：
```js
gl.enable(gl.DEPTH_TEST)
```
再来看看[示例 2 开启 DEPTH_TEST][url-example5]，发现还是没有效果，找到网上的一些示例并进行对比，发现还需要投影，才能看到效果，见[示例 2 开启 DEPTH_TEST 且产生正确投影][url-example5]。

## 深度冲突
开启隐藏面消除功能之后，在绘制两个很靠近的面时，可能会出现显示异常的情况，这个现象称为**深度冲突(Z fighting)**。这里有两类这个现象的示例：
- drawArrays 执行一次绘制，里面包含了两个面[示例1][url-example7]
- drawArrays 执行两次绘制，单独绘制的两个面[示例2][url-example6]

示例 1 的情况是一次绘制多个面，通过调整 z 分量比较容易解决。

示例 2 的情况是多次绘制多个面，不确定性相对更强，这个时候就需要借助**多边形偏移(polygon offset)**来解决。在两次绘制之间指定偏移：
```js
  // 代码省略
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.drawArrays(gl.TRIANGLES, 0, 3); // 开启多边形偏移
  gl.polygonOffset(1, 1); // 指定偏移
  gl.drawArrays(gl.TRIANGLES, 3, 3);
```
这是[示例][url-example8]。

[polygonOffset(factor, units)][url-1] 指定加到每个顶点绘制 z 值上的偏移量，两个参数都是比例因子，最终值的计算公式是 factor × DZ + r × units ，其中 DZ 是顶点所在表面相对于观察者视线的角度， r 是设备能够解析偏移量的最小值。这个方法对于渲染隐藏线图像、将贴花应用于表面以及渲染具有高亮显示边缘立体图形很有用。

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [polygonOffset mdn][url-1]
- [WebGL编程指南在线版][url-3]

[url-pre]:https://github.com/XXHolic/segment/issues/120
[url-1]:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/polygonOffset
[url-2]:https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glPolygonOffset.xml
[url-3]:https://sites.google.com/site/webglbook/

[url-example1]:https://xxholic.github.io/segment/draft2/2/example/2d-order1.html
[url-example2]:https://xxholic.github.io/segment/draft2/2/example/2d-order2.html
[url-example3]:https://xxholic.github.io/segment/draft2/2/example/3d-order1.html
[url-example4]:https://xxholic.github.io/segment/draft2/2/example/3d-order2.html
[url-example5]:https://xxholic.github.io/segment/draft2/2/example/3d-order2-depth.html
[url-example6]:https://xxholic.github.io/segment/draft2/2/example/3d-depth-conflict.html
[url-example7]:https://xxholic.github.io/segment/draft2/2/example/3d-depth-conflict2.html
[url-example8]:https://xxholic.github.io/segment/draft2/2/example/3d-depth-offset.html

[url-local-1]:./image/1.png


<details>
<summary>:wastebasket:</summary>

最近看了[《红线》][url-waste]这部作品，里面赛车设计和场面看着还是蛮过瘾的！

</details>

[url-waste]:https://movie.douban.com/subject/3903715/
