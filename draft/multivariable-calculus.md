# Multivariable calculus

## 引子
由于想要绘制流体相关，发现要学习多元微积分的内容。就去可汗学院学了一下所做的笔记。

https://www.khanacademy.org/math/multivariable-calculus

## Thinking about multivariable functions
### Visualizing scalar-valued functions
- 多元微积分简单的说就是多个变量相关的方程。
- 单变量函数，例如常见的 f(x) = x ，在二维坐标轴上，我们知道是每个点的 x 轴上对应的 y 轴上的一个位置，所有符合这种关系的坐标(x,y)，就形成了一条直线。对于多变量函数，例如 f(x,y) = x*x + y*y ，输入就是一个点(x,y)，得到的是 z 轴的值，应用到的就是三维空间 。
- 对于三维空间的函数图形，有一个思考方法，就是先把其中的一个变量看成是常量，然后看另外一个变量变化所产生变化。
- 一些三维的函数，以 z 轴作为切片，然后将切片上的点映射到 x和 y 的二维轴上形成的图案，就是对三维图形的另外一种形式展现。


### Derivatives of multivariable functions
- 关于导数和偏导数的[基本概念][url-1]，偏导数就是对多元变量函数的单个变量进行求导。
- 偏导数告诉你，当您只调整输入中的一个变量时，多变量函数是如何变化的
- 求导[基础公式][url-2]

## Gradient and directional derivatives
梯度和方向导数
- 梯度，多变量函数中对各个变量单独求偏导数后，组成的向量。

![gradient][url-local-1]

- 梯度可以理解为“最陡峭的上升方向”，例如你爬山，你想如何以最快的方向到达顶峰，梯度的指向就是这个。

![gradient-2][url-local-2]

- 计算梯度可以看成是为了计算方向导数的一种方式，方向导数反应了某个矢量方向上的斜率。

## Differentiating parametric curves（参数曲线的微分）
- 曲线参数化跟曲线方程描述的是等效的。
![curve-1][url-local-3]

- 对曲线参数化求导，就可以得到曲线某个点的切线斜率

## Multivariable chain rule（多变量链式规则）

[url-1]: https://zhuanlan.zhihu.com/p/321425509
[url-2]: https://www.cnblogs.com/masterchd/p/14082162.html

[url-local-1]:../images/n1/1.png
[url-local-2]:../images/n1/2.png
[url-local-3]:../images/n1/3.png

