# 正则表达式
## <a name="index"></a> 目录
- [场景](#situation)
- [正则表达式](#style)
  - [历史](#link)

## <a name="situation"></a> 场景
问题1：外包一层div，设置其宽高，然后设置canvas宽高为100%,虽然生效了，但往里面放图的时候，就有问题，无法设置对应的大小（已总结）
问题2：设置了宽高，然后设置border 会让里面的东西变模糊
问题3：设置了 border-radius 有圆角的效果，但用在图片的 src 上显示会有问题，相关问题：https://stackoverflow.com/search?q=border+radius+to+canvas
问题4：请求图片返回二进制，在app中无法显示，有的链接却可以，初步怀疑借口返回的不太一样，用原生的请求就可以了且设置接受的格式为二进制流就可以了。
问题4：文字换行。










## 参考资料
[LET’S CALL IT A DRAW(ING SURFACE)][url-blog1]
[High DPI Canvas][url-blog2]


[url-blog1]:http://diveintohtml5.info/canvas.html
[url-stackoverflow]:https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas?r=SearchResults
[url-blog2]:https://www.html5rocks.com/en/tutorials/canvas/hidpi/