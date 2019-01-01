# canvas 问题

## 问题
问题1：外包一层div，设置其宽高，然后设置canvas宽高为100%,虽然生效了，但往里面放图的时候，就有问题，无法设置对应的大小（done）
问题2：设置了宽高，然后设置border 会让里面的东西变模糊(done)
问题3：设置了 border-radius 有圆角的效果，但用在图片的 src 上显示会有问题，相关问题：https://stackoverflow.com/search?q=border+radius+to+canvas（done）
问题4：请求图片返回二进制，在app中无法显示，有的链接却可以，初步怀疑借口返回的不太一样，用原生的请求就可以了且设置接受的格式为二进制流就可以了。
问题5：字换行。（done）
问题6：文字坐标设置 0 0 会看不到，相关问题链接：https://stackoverflow.com/questions/14289331/html5-canvas-doesnt-fill-text-at-coordinates-0-0