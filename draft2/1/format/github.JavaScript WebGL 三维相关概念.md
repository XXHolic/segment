# JavaScript WebGL 三维相关概念
## <a name="index"></a> 目录
- [引子](#start)
- [齐次坐标](#coord)
- [空间转换](#transform)
- [可视域](#view)
- [参考资料](#reference)

## <a name="start"></a> 引子
在 [JavaScript WebGL 矩阵][url-pre]之后，发现三维编程之前还有一些概念需要理解，就去查了下资料，按照自己的习惯整合了一下。

## <a name="coord"></a> 齐次坐标
三维坐标理论上三个分量就够了，但在看相关程序的时候，发现会出现 4 个分量，这种表示的方式称为**齐次坐标**，它将一个原本 n 维的向量用一个 n+1 维的向量表示。比如向量 (x, y, z) 的齐次坐标可表示为 (x, y, z, w)。这样表示有利于使用矩阵运算将一个点集从一个坐标系转换到另一个坐标系。齐次坐标 (x, y, z, w) 等价于三维坐标 (x/w, y/w, z/w) 。更详细的介绍见[这里][url-1]。

## <a name="transform"></a> 空间转换
WeGL 没有现成的 API ，可以直接用来绘制三维物体，需要进行一系列的空间转换，最终在二维空间（比如电脑屏幕）显示，从视觉上看上去是立体的效果。下面看看主要的几个转换过程。

### 模型空间
**模型空间**是描述三维物体自身的空间，拥有自己的坐标系和对应的原点。这里的点坐标可以按照 WebGL 中可见范围 [-1, +1] 约束进行描述，也可以不按照这个约束。

### 世界空间
物体模型创建好后，放在具体的环境当中，才会达到想要的效果，除此之外，还可能会进行位移、缩放和旋转，进行这些变化都需要一个新的参考坐标系，这个所处的环境就是**世界空间**。有了世界坐标系，相互独立的物体才会有相对位置的描述。

从模型空间转换到世界空间，需要用到**模型矩阵(Model Matrix)**。

### 视图空间
人眼在观察一个立方体时，从远处看和从近处看会有大小的差别，从左边看和从右边看会看到不同的面，在 WebGL 中绘制三维物体时，需要根据观察者的位置和方向，将物体放到正确的位置，观察者所处的空间就是**视图空间**。

从世界空间转换到视图空间，需要用到**视图矩阵(View Matrix)**。

### 裁剪空间
在 WebGL 程序中，顶点着色器会将点转换到一个称为**裁剪空间**的特殊坐标系上。延展到裁剪空间之外的任何数据都会被剪裁并且不会被渲染。

从视图空间转换到裁剪空间，需要用到**投影矩阵(Projection Matrix)**。


## <a name="view"></a> 可视域
找了一些资料，对比了一下，感觉还是《WebGL 编程指南》里面解释的比较好，这里从其中摘录的一部分内容。

人眼的观察范围是有限的，WebGL 类似的限制了水平视角、垂直视角和可视深度，这些共同决定了**可视域(View Volume)**。

有两类常见的可视域：
- 长方体/盒状可视域，由**正射投影**产生。
- 四棱锥/金字塔可视域，由**透视投影**产生。

正射投影可以方便的比较场景中物体的大小，因为物体看上去的大小与所在位置没有关系，在建筑平面等技术绘图相关场合，应当使用这种投影。透视投影让产生的场景看上去更有深度，更加自然。

### 正射投影
正射投影的可视域由前后两个矩形表面确定，分别称为**近裁剪面**和**远裁剪面**，近裁剪面和远裁剪面之间的空间就是可视域，只有在这个空间内的物体会被显示出来。正射投影下，近裁剪面和远裁剪面的尺寸是一样的。

![img-1][url-local-1]

Canvas 上显示的就是物体在近裁剪面上的投影。如果裁剪面的宽高比和 Canvas 的不一样，画面就会按照 Canvas 的宽高比进行压缩，物体会被扭曲。

### 透视投影
透视投影的可视域产生跟正射投影的类似，只是近裁剪面和远裁剪面的尺寸不一样。

![img-2][url-local-2]

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [WebGL model view projection][url-2]
- [WebGL摄像机详解之一：模型、视图和投影矩阵变换的含义][url-3]
- [坐标系统][url-4]

[url-pre]:https://github.com/XXHolic/segment/issues/117

[url-1]:https://zhuanlan.zhihu.com/p/148760721
[url-2]:https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection
[url-3]:http://www.jiazhengblog.com/blog/2015/03/05/480/
[url-4]:https://learnopengl-cn.github.io/01%20Getting%20started/08%20Coordinate%20Systems/#_1

[url-example1]:https://xxholic.github.io/lab/starry-night/translate.html

[url-local-1]:https://xxholic.github.io/segment/draft2/1/image/10.png
[url-local-2]:https://xxholic.github.io/segment/draft2/1/image/11.png


<details>
<summary>:wastebasket:</summary>

最近看了 2019 年出的电视剧《切尔诺贝利》，核辐射对毫不知情的人的摧残让人心惊。

有些地方引用了豆瓣的评分，但现在看不到关于这部电视剧的豆瓣评分详情，真是奇怪。

</details>
