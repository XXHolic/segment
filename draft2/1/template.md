# JavaScript WebGL 三维相关概念
## <a name="index"></a> 目录
- [引子](#start)
- [参考资料](#reference)

## <a name="start"></a> 引子
在 [JavaScript WebGL 矩阵][url-pre]之后，发现三维编程之前还有一堆概念需要理解，就去查了下资料，按照自己的习惯整合了一下。

## 齐次坐标
三维坐标理论上三个分量就够了，但在看相关程序的时候，发现会出现 4 个分量，这种表示的方式称为**齐次坐标**，它将一个原本 n 维的向量用一个 n+1 维的向量表示。比如向量 (x, y, z) 的齐次坐标可表示为 (x, y, z, w)。这样表示有利于使用矩阵运算将一个点集从一个坐标系转换到另一个坐标系。齐次坐标 (x, y, z, w) 等价于三维坐标 (x/w, y/w, z/w) 。更详细的介绍见[这里][url-1]。

## 空间转换
WeGL 没有现成的 API ，可以直接用来绘制三维物体，需要进行一系列的空间转换，最终在二维空间（比如电脑屏幕）显示，从视觉上看上去是立体的效果。下面看看主要的几个转换过程。

### 模型空间
模型空间是描述三维物体自身的空间，拥有自己的坐标系和对应的原点。这里的点坐标可以按照 WebGL 中可见范围 [-1, +1] 约束进行描述，也可以不按照这个约束。




<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [矩阵百科][url-1]

[url-pre]:https://github.com/XXHolic/segment/issues/117

[url-1]:https://zhuanlan.zhihu.com/p/148760721

[url-example1]:https://xxholic.github.io/lab/starry-night/translate.html

[url-local-1]:./image/1.png


<details>
<summary>:wastebasket:</summary>

最近看了[《红线》][url-waste]这部作品，里面赛车设计和场面看着还是蛮过瘾的！

</details>

[url-waste]:https://movie.douban.com/subject/3903715/
