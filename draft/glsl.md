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

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [example][url-article-1]


[url-article-1]:https://xxholic.github.io/segment

[url-local-5]:../images/n/help.png

<details>
<summary>:wastebasket:</summary>


![n-poster][url-local-poster]

</details>

[url-book]:https://book.douban.com/subject/26916012/
[url-local-poster]:../images/n/poster.jpg
