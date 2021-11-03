# glsl
## <a name="index"></a> 目录
- [引子](#start)
- [title1](#title1)
  - [title11](#title11)
- [参考资料](#reference)


## <a name="start"></a> 引子
看 glsl 代码一些说明。

## 基本类型
- vec2 ： 2分量浮点向量
- float : 浮点型
- sampler2D ：二维纹理句柄

## 修饰符
- uniform ： 一致变量。在着色器执行期间一致变量的值是不变的。与const常量不同的是，这个值在编译时期是未知的是由着色器外部初始化的。一致变量在顶点着色器和片段着色器之间是共享的。它也只能在全局范围进行声明。
- attribute : 表示只读的顶点数据，只用在顶点着色器中。数据来自当前的顶点状态或者顶点数组。它必须是全局范围声明的，不能再函数内部。一个attribute可以是浮点数类型的标量，向量，或者矩阵。不可以是数组或则结构体
- varying ： 顶点着色器的输出。例如颜色或者纹理坐标，（插值后的数据）作为片段着色器的只读输入数据。必须是全局范围声明的全局变量。可以是浮点数类型的标量，向量，矩阵。不能是数组或者结构体。

## 声明
precision mediump float ： 设定了默认的精度，这样所有没有显式表明精度的变量都会按照设定好的默认精度来处理。

## 内置变量
- gl_PointSize ： 点的大小
- gl_Position ： 输出属性-变换后的顶点的位置，用于后面的固定的裁剪等操作。所有的顶点着色器都必须写这个值。
- gl_FragColor ： 输出的颜色用于随后的像素操作

## 方法
- texture2D ： 第一个参数代表图片纹理，第二个参数代表纹理坐标点，获取对应位置纹理的颜色RGBA值
- mix(x,y,a) ： a控制混合结果 return x(1-a) +y*a  返回 线性混合的值
- length(x) ： 返回向量x的长度
- fract(x) ： 返回x的小数部分
- floor(x) ： 小于等于x的最大整数值
- dot(x,y) : 向量x，y之间的点积
- step(edge,x) : 如果x < edge，返回0.0，否则返回1.0

## 一些概念
- OpenGL自身是一个巨大的状态机(State Machine)：一系列的变量描述OpenGL此刻应当如何运行。OpenGL的状态通常被称为OpenGL上下文(Context)。在代码中可以看到一些特定环节会输入特定的一些全局变量作为下一个环节的输入。
- 在OpenGL中，任何事物都在3D空间中，而屏幕和窗口却是2D像素数组，这导致OpenGL的大部分工作都是关于把3D坐标转变为适应你屏幕的2D像素。
- 3D坐标转为2D坐标的处理过程是由OpenGL的图形渲染管线
- 图形渲染管线可以被划分为两个主要部分：第一部分把你的3D坐标转换为2D坐标，第二部分是把2D坐标转变为实际的有颜色的像素。


下面是一个图形渲染管线的每个阶段的抽象展示。要注意蓝色部分代表的是可以注入自定义的着色器的部分。对于大多数场合，我们只需要配置顶点和片段着色器就行了。几何着色器是可选的，通常使用它默认的着色器就行了。

![glsl-1][url-local-1]

图形渲染管线每个部分要点概括：
### 顶点着色器(Vertex Shader)
- 主要的目的是把3D坐标转为另一种3D坐标，同时顶点着色器允许我们对顶点属性进行一些基本处理。
- 可编程注入自定义
- 输入顶点数据（数组的形式传递3个3D坐标用来表示一个三角形），数据中包含了顶点各种想用的数据属性（例如颜色）。顶点缓冲对象(Vertex Buffer Objects, VBO)管理这些数据。bindBuffer 方法将给定的WebGLBuffer绑定到目标
- OpenGL仅当3D坐标在3个轴（x、y和z）上都为-1.0到1.0的范围内时才处理它。
- 为了设置顶点着色器的输出，我们必须把位置数据赋值给预定义的 gl_Position 变量。
- createShader 方法创建着色器，shaderSource方法源代码发送到着色器，然后用 compileShader 方法进行编译。类型都是 VERTEX_SHADER 。

### 图元装配(Primitive Assembly)
- 顶点着色器输出的所有顶点作为输入（如果是GL_POINTS，那么就是一个顶点），并所有的点装配成指定图元的形状；

### 几何着色器(Geometry Shader)
- 可以通过产生新顶点构造出新的（或是其它的）图元来生成其他形状。
- 可编程注入自定义


### 光栅化阶段(Rasterization Stage)
- 这里它会把图元映射为最终屏幕上相应的像素，生成供片段着色器(Fragment Shader)使用的片段(Fragment)。
- 在片段着色器运行之前会执行裁切(Clipping)。裁切会丢弃超出你的视图以外的所有像素，用来提升执行效率。

### 片段着色器
- 主要目的是计算一个像素的最终颜色，这也是所有OpenGL高级效果产生的地方。
- 可编程注入自定义。
- 片段着色器只需要一个输出变量，这个变量是一个4分量向量，它表示的是最终的输出颜色，我们应该自己将其计算出来。
- 编译片段着色器的过程与顶点着色器类似，只是类型为 FRAGMENT_SHADER

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [example][url-article-1]


[url-article-1]:https://xxholic.github.io/segment

[url-local-1]:../images/glsl/1.png

<details>
<summary>:wastebasket:</summary>


![n-poster][url-local-poster]

</details>

[url-book]:https://book.douban.com/subject/26916012/
[url-local-poster]:../images/n/poster.jpg
