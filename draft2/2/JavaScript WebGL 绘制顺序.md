# JavaScript WebGL 绘制顺序
## <a name="index"></a> 目录
- [引子](#start)
- [参考资料](#reference)

## <a name="start"></a> 引子
在 [JavaScript WebGL 三维相关概念][url-pre]中尝试一些效果的时候，又碰到了新的问题，就去查了资料，自己尝试后总结下。

## 面绘制顺序
二维也有这个问题，前面尝试的时候这个问题并没有产生明显的不好效果，但现在绘制三维影响就比较大了。

先看看二维相同一套顶点不同顺序的效果：
- 二维面顺序示例 1
- 二维面顺序示例 2

面的颜色始终保持一致，但顺序变了，发现 **WebGL 默认情况下会按照缓冲区中顺序绘制**，也就是后绘制的图形会覆盖先绘制的图形。这个就像一层一层贴纸一样，比较容易理解。

再来看看绘制三维，先想一下三维顶点有三个分量，第三个分量是在 z 轴上表示深度信息，默认垂直屏幕向内为负方向，那么 z 值越大表示离屏幕越近，既然都有记录值了，直接按照这个顺序绘制也算是合理的想法。实际试试：
- 三维面顺序示例 1
- 三维面顺序示例 2

发现示例 2 中的 z 分量的设置并没有预期的那样，还是跟二维绘制面顺序一样。这个时候想要 z 分量发挥深度的效果，需要使用 `gl.enable(gl.DEPTH_TEST)` 开启隐藏面消除功能，再来看看 示例 2 开启后的[效果][]。

## 深度冲突


<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [矩阵百科][url-1]

[url-pre]:https://github.com/XXHolic/segment/issues/120
[url-1]:https://baike.baidu.com/item/%E7%9F%A9%E9%98%B5/18069?fr=aladdin

[url-example1]:https://xxholic.github.io/lab/starry-night/translate.html

[url-local-1]:./image/1.png


<details>
<summary>:wastebasket:</summary>

最近看了[《红线》][url-waste]这部作品，里面赛车设计和场面看着还是蛮过瘾的！

</details>

[url-waste]:https://movie.douban.com/subject/3903715/
