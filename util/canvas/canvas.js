class Canvas {
  constructor(widthN = 300, heightN = 150, options = {}) {
    const { mode = "create", target } = options;
    const ratio = window.devicePixelRatio || 1;
    const w = parseFloat(widthN),
      h = parseFloat(heightN);
    this.width = w;
    this.height = h;
    this.ratio = ratio;
    if (mode === "set" && target) {
      this.node = target;
      const context = target.getContext("2d");
      this.context = context;
      // 高清屏幕模糊问题处理
      target.width = w * ratio; // 实际渲染像素
      target.height = h * ratio; // 实际渲染像素
      target.style.width = `${w}px`; // 控制显示大小
      target.style.height = `${h}px`; // 控制显示大小
      return;
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    this.node = canvas;
    this.context = context;
    // 高清屏幕模糊问题处理
    canvas.width = w * ratio; // 实际渲染像素
    canvas.height = h * ratio; // 实际渲染像素
    canvas.style.width = `${w}px`; // 控制显示大小
    canvas.style.height = `${h}px`; // 控制显示大小
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  // 设置属性
  attrs = (attributes = {}) => {
    const target = this.node;
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
  };

  /**
   * 画线
   * @param {*} points 组成线的坐标点
   * @param {*} lineWidth 绘制线的宽度
   * @param {*} lineCap 每一条线段末端的属性，见 https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap
   * @param {*} strokeStyle 线边框的颜色
   * @param {*} fillStyle 填充的颜色
   * @param {*} isClose 是否闭合
   */
  line = ({
    points,
    lineWidth = 1,
    lineCap = "butt",
    strokeStyle = "#fff",
    fillStyle = "#fff",
    isClose = false,
  }) => {
    const context = this.context;
    context.beginPath();
    const loopLen = points.length;
    context.lineWidth = lineWidth;
    context.lineCap = lineCap;
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    for (let index = 0; index < loopLen; index++) {
      const [x, y] = points[index];
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
        if (isClose && index === loopLen - 1) {
          const firstPoint = points[0];
          context.lineTo(firstPoint[0], firstPoint[1]);
        }
      }
    }
    context.stroke();
    if (isClose) {
      context.fill();
    }
    context.closePath();
    return this;
  };

  // 绘制三角形
  triangle = ({
    points,
    lineWidth = 1,
    strokeStyle = "#fff",
    fillStyle = "#fff",
  }) => {
    const { context } = this;
    context.beginPath();
    const loopLen = points.length;
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    for (let index = 0; index < loopLen; index++) {
      const [x, y] = points[index];
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
        if (index === loopLen - 1) {
          const [x, y] = points[0];
          context.lineTo(x, y);
        }
      }
    }
    context.stroke();
    context.closePath();
    return this;
  };

  // 绘制矩形
  rect = ({
    x,
    y,
    width,
    height,
    lineWidth = 1,
    strokeStyle = "#fff",
    fillStyle = "#fff",
  }) => {
    const { context } = this;
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = fillStyle;
    context.fill();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
    context.closePath();
    return this;
  };

  // 绘制圆形
  arc = ({
    x,
    y,
    radius,
    startAngle,
    endAngle,
    anticlockwise = false,
    lineWidth = 1,
    strokeStyle = "#fff",
    fillStyle = "#fff",
  }) => {
    const { context } = this;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    context.fillStyle = fillStyle;
    context.fill();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
    context.closePath();
    return this;
  };

  // 生成有圆角的矩形
  roundedRect = (x, y, width, height, radius) => {
    const { context } = this;
    context.beginPath();
    context.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2);
    context.lineTo(width - radius + x, y);
    context.arc(
      width - radius + x,
      radius + y,
      radius,
      (Math.PI * 3) / 2,
      Math.PI * 2
    );
    context.lineTo(width + x, height + y - radius);
    context.arc(
      width - radius + x,
      height - radius + y,
      radius,
      0,
      (Math.PI * 1) / 2
    );
    context.lineTo(radius + x, height + y);
    context.arc(
      radius + x,
      height - radius + y,
      radius,
      (Math.PI * 1) / 2,
      Math.PI
    );
    context.closePath();
    return this;
  };

  // 文本换行处理，并返回实际文字所占据的高度
  textEllipsis = (text, x, y, maxWidth, lineHeight, row) => {
    if (
      typeof text != "string" ||
      typeof x != "number" ||
      typeof y != "number"
    ) {
      return;
    }
    const { context } = this;
    var canvas = context.canvas;

    if (typeof maxWidth == "undefined") {
      maxWidth = (canvas && canvas.width) || 300;
    }

    if (typeof lineHeight == "undefined") {
      // 有些情况取值结果是字符串，比如 normal。所以要判断一下
      var getLineHeight = window.getComputedStyle(canvas).lineHeight;
      var reg = /^[0-9]+.?[0-9]*$/;
      lineHeight = reg.test(getLineHeight) ? getLineHeight : 20;
    }

    // 字符分隔为数组
    var arrText = text.split("");
    // 文字最终占据的高度，放置在文字下面的内容排版，可能会根据这个来确定位置
    var textHeight = 0;
    // 每行显示的文字
    var showText = "";
    // 控制行数
    var limitRow = row;
    var rowCount = 0;

    for (var n = 0; n < arrText.length; n++) {
      var singleText = arrText[n];
      var connectShowText = showText + singleText;
      // 没有传控制的行数，那就一直换行
      var isLimitRow = limitRow ? rowCount === limitRow - 1 : false;
      var measureText = isLimitRow ? connectShowText + "……" : connectShowText;
      var metrics = context.measureText(measureText);
      var textWidth = metrics.width;

      if (textWidth > maxWidth && n > 0 && rowCount !== limitRow) {
        var canvasShowText = isLimitRow ? measureText : showText;
        context.fillText(canvasShowText, x, y);
        showText = singleText;
        y += lineHeight;
        textHeight += lineHeight;
        rowCount++;
        if (isLimitRow) {
          break;
        }
      } else {
        showText = connectShowText;
      }
    }
    if (rowCount !== limitRow) {
      context.fillText(showText, x, y);
    }

    var textHeightValue =
      rowCount < limitRow ? textHeight + lineHeight : textHeight;
    return textHeightValue;
  };

  /**
   * 图像灰度处理
   * @param {*} sx 提取图像数据矩形区域的左上角 x 坐标。
   * @param {*} sy 提取图像数据矩形区域的左上角 y 坐标。
   * @param {*} sw 提取图像数据矩形区域的宽度。这要注意一下，canvas 标签上 width 属性值，不是渲染后实际宽度值，否则在高清手机屏幕下且做了高清处理，只能获取到部分图像宽度。
   * @param {*} sh 提取图像数据矩形区域的高度。这要注意一下，canvas 标签上 height 属性值，不是渲染后实际高度值，否则在高清手机屏幕下且做了高清处理，只能获取到部分图像高度。
   */
  toGray = (sx, sy, sw, sh) => {
    const { context } = this;
    var imageData = context.getImageData(sx, sy, sw, sh);
    var colorDataArr = imageData.data;
    var colorDataArrLen = colorDataArr.length;
    for (var i = 0; i < colorDataArrLen; i += 4) {
      var gray =
        (colorDataArr[i] + colorDataArr[i + 1] + colorDataArr[i + 2]) / 3;
      colorDataArr[i] = gray;
      colorDataArr[i + 1] = gray;
      colorDataArr[i + 2] = gray;
    }
    context.putImageData(imageData, 0, 0);
    return this;
  };

  /**
   * 获取透明所占百分比，初始参考透明值是 128
   * @param {number} opacity 透明度参考值
   */
  getOpacityPercentage = (opacity = 128) => {
    const { context } = this;
    var imageData = context.getImageData(0, 0, 248, 415);
    var colorDataArr = imageData.data;
    // console.info('color data:',colorDataArr);
    var colorDataArrLen = colorDataArr.length;
    var eraseArea = [];
    for (var i = 0; i < colorDataArrLen; i += 4) {
      // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
      if (colorDataArr[i + 3] < opacity) {
        eraseArea.push(colorDataArr[i + 3]);
      }
    }
    var divResult = eraseArea.length / (colorDataArrLen / 4);
    var pointIndex = String(divResult).indexOf(".");
    if (pointIndex > -1) {
      divResult = String(divResult).slice(0, pointIndex + 5);
    }
    return Number(divResult).toFixed(2);
  };

  resetTransform = () => {
    const { context, ratio } = this;
    context.transformData = [1, 0, 0, 1, 0, 0];
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return this;
  };

  /**
   * canvas.transform(sx, ry, rx, sy, tx, ty)
   * sx-0-水平缩放，ry-1-垂直倾斜，rx-2-水平倾斜，sy-3-垂直缩放，tx-4-水平移动，ty-5-垂直移动
   *
   * 为了方便使用 ，再次包装一下，参照 CSS 中的方法命名
   * @param {number} x 水平方向的移动
   * @param {number} y 垂直方向的移动
   */
  translate = (x = 0, y = 0) => {
    const context = this.context;
    if (!context.transformData) {
      this.resetTransform();
    }
    context.translate(x, y);
    let [sx, ry, rx, sy, tx, ty] = context.transformData;
    tx = sx * x + rx * y;
    ty = ry * x + sy * y;
    context.transformData = [sx, ry, rx, sy, tx, ty];
    return this;
  };

  rotate = (angle) => {
    const context = this.context;

    if (!context.transformData) {
      this.resetTransform();
    }

    context.rotate(angle);
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let [sx, ry, rx, sy, tx, ty] = context.transformData;
    let newSX = sx * c + rx * s;
    let newRY = ry * c + sy * s;
    let newRX = sx * -s + rx * c;
    let newSY = ry * -s + sy * c;
    context.transformData = [newSX, newRY, newRX, newSY, tx, ty];
    return this;
  };

  scale = (x = 1, y = 1) => {
    const context = this.context;
    if (!context.transformData) {
      this.resetTransform(context);
    }
    context.scale(x, y);
    let [sx, ry, rx, sy, tx, ty] = context.transformData;
    let newSX = sx * x;
    let newRY = ry * x;
    let newRX = rx * y;
    let newSY = sy * y;
    context.transformData = [newSX, newRY, newRX, newSY, tx, ty];
    return this;
  };

  // 获取点的坐标
  getPosition = (px, py) => {
    const context = this.context;

    if (!context.transformData) {
      console.info("no data");
    }
    let x = px;
    let y = py;
    let [sx, ry, rx, sy, tx, ty] = context.transformData;
    px = x * sx + y * rx + tx;
    py = x * ry + y * sy + ty;
    return [px, py];
  };

  /**
   * 清除画布
   * @param {object} context canvas 上下文对象
   * @param {number} width 画布高度
   * @param {number} height 画布宽度
   */
  clear = (isAnimation = false) => {
    const { width, height, context } = this;
    if (!isAnimation) {
      context.clearRect(0, 0, width, height);
      return;
    }
    var centerX = width / 2;
    var centerY = height / 2;
    var maxRadius = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)) + 1;
    var radius = 10;
    context.beginPath();
    var count = setInterval(() => {
      if (radius > maxRadius) {
        clearInterval(count);
      }
      radius += 3;
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill();
    }, 10);
  };
}

Canvas.setTarget = (target) => {
  if (typeof target !== "string") {
    console.warn("Invalid Canvas Target");
    return;
  }
  const element = document.querySelector(target);
  if (!element) {
    console.warn("Invalid Canvas Target");
    return;
  }
  const renderStyles = window.getComputedStyle(element);
  return new Canvas(renderStyles.width, renderStyles.height, {
    mode: "set",
    target: element,
  });
};
