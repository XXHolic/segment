/* prettier-ignore */
window.onload = function () {
  const page = {
    canvasObj: null,
    angle: 30,
    ratio: 1, // 宽/高 比
    near: 1,
    far: 20,
    init: function () {
      const canvasObj = new WebGL(400, 400);
      this.canvasObj = canvasObj;
      document.querySelector("#demo").appendChild(canvasObj.node);
      const gl = canvasObj.context;
      if (!gl) {
        alert("浏览器不支持 WebGL");
        return;
      }
      this.gl = gl;

      const source = `
        attribute vec4 aVertexPos;
        attribute vec4 aColor;
        uniform mat4 uProMatrix;
        uniform mat4 uViewMatrix;

        varying vec4 vColor;

        void main(void){
          gl_Position = uProMatrix * uViewMatrix * aVertexPos;
          vColor = aColor;
        }
      `;
      const fragmentSource = `
        precision mediump float;
        varying vec4 vColor;

        void main(void){
          gl_FragColor = vColor;
        }
      `;
      // 初始化着色器程序
      const shaderProgram = this.createShaderProgram(gl, source, fragmentSource);
      // 集中初始化顶点、颜色和索引数据
      const screenBuffer = this.initBuffersForScreen(gl);
      // requestAnimationFrame(this.draw.bind(this));
      // 绘制
      this.draw(gl, shaderProgram, screenBuffer);
      this.pageEvent();
    },
    initBuffersForScreen: function (gl) {
      //    v3 ------ v2
      //    \  \    / /
      //     \   v1  /
      //      \  |  /
      //       \ | /
      //         v0

      // prettier-ignore
      const vertices = new Float32Array([
        0.0,  -1.0,  0.0,   // v0
        0.0,  1.0,  1.0,   // v1
        1.0, 1.0,  -1.0,   // v2
        -1.0, 1.0,  -1.0,   // v3
      ]);

      // prettier-ignore
      const verticesColor = new Float32Array([
        0.0,  0.0,  0.0, // v0
        1.0,  1.0,  1.0, // v1
        0.0,  0.0,  0.0, // v2
        1.0,  1.0,  1.0, // v3
      ]);

      // prettier-ignore
      const verticesIndex = new Uint8Array([
        0, 1, 3, // left
        0, 2, 1, // right
        1, 2, 3, // up
        0, 3, 2, // back
      ]);

      const obj = {};
      obj.verticesBuffer = this.createBuffer(gl, gl.ARRAY_BUFFER, vertices);
      obj.verticesColorBuffer = this.createBuffer(
        gl,
        gl.ARRAY_BUFFER,
        verticesColor
      );
      obj.verticesIndex = verticesIndex;

      return obj;
    },
    // 创建缓冲对象
    createBuffer: function (gl, type, data) {
      const buffer = gl.createBuffer();
      gl.bindBuffer(type, buffer);
      gl.bufferData(type, data, gl.STATIC_DRAW);
      gl.bindBuffer(type, null);
      return buffer;
    },
    // 绑定缓存缓冲对象
    bindTargetBuffer: function (gl, type, data) {
      const buffer = gl.createBuffer();
      gl.bindBuffer(type, buffer);
      gl.bufferData(type, data, gl.STATIC_DRAW);
      return buffer;
    },
    // 缓冲并激活对应顶点属性
    bindEnableBuffer: function (
      gl,
      bindType = gl.ARRAY_BUFFER,
      buffer,
      attribute,
      size,
      type = gl.FLOAT,
      normalize = false,
      stride = 0,
      offset = 0
    ) {
      // 虽然前面有绑定过缓冲数据，但这里就是指定激活那个数据，需要再次 bindBuffer 目标
      gl.bindBuffer(bindType, buffer);
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, size, type, normalize, stride, offset);
    },
    activeBindTexture: function (gl, texture, unit) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    },
    loadShader: function (gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("着色器编译失败: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    },
    // 初始化整个着色器程序
    createShaderProgram: function (gl, vertexSource, fragmentSource) {
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = this.loadShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentSource
      );
      // 创建着色器对象
      const shaderProgram = gl.createProgram();
      // 添加着色器
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      // 多个着色器合并链接
      gl.linkProgram(shaderProgram);
      // 创建是否成功检查
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("无法初始化着色器程序: " + gl.getProgramInfoLog(shaderProgram));
        return null;
      }
      const wrapper = { program: shaderProgram };

      const numAttributes = gl.getProgramParameter(
        shaderProgram,
        gl.ACTIVE_ATTRIBUTES
      );
      for (let i = 0; i < numAttributes; i++) {
        const attribute = gl.getActiveAttrib(shaderProgram, i);
        wrapper[attribute.name] = gl.getAttribLocation(
          shaderProgram,
          attribute.name
        );
      }
      const numUniforms = gl.getProgramParameter(
        shaderProgram,
        gl.ACTIVE_UNIFORMS
      );
      for (let i = 0; i < numUniforms; i++) {
        const uniform = gl.getActiveUniform(shaderProgram, i);
        wrapper[uniform.name] = gl.getUniformLocation(
          shaderProgram,
          uniform.name
        );
      }

      return wrapper;
    },
    getTransform: function () {
      let matrix = m4.identity();
      // const rotatePoint = [0, -0.5]; // 旋转的中心点
      // this.angle = this.angle + 1;
      const rotate = [30, 30, 0];
      matrix = m4.rotate(matrix, rotate[0], "x");
      matrix = m4.rotate(matrix, rotate[1], "y");
      matrix = m4.rotate(matrix, rotate[2], "z");
      return matrix;
    },
    /**
     * 绘制
     * @param {*} gl WebGL 上下文
     * @param {*} shaderProgram 着色器程序
     * @param {*} screenBuffer 顶点、颜色、索引缓冲数据都放在这个对象中
     */
    draw: function (gl, shaderProgram, screenBuffer) {
      this.canvasObj.clear();
      // 开启隐藏面消除
      gl.enable(gl.DEPTH_TEST);
      gl.useProgram(shaderProgram.program);
      // 绑定顶点数据并启用对应属性
      this.bindEnableBuffer(
        gl,
        gl.ARRAY_BUFFER,
        screenBuffer.verticesBuffer,
        shaderProgram.aVertexPos,
        3
      );
      // 绑定顶点颜色数据并启用对应属性
      this.bindEnableBuffer(
        gl,
        gl.ARRAY_BUFFER,
        screenBuffer.verticesColorBuffer,
        shaderProgram.aColor,
        3
      );
      // 使索引缓冲数据生效，需要与 drawElements 一起使用
      this.bindTargetBuffer(
        gl,
        gl.ELEMENT_ARRAY_BUFFER,
        screenBuffer.verticesIndex
      );
      const m4View = new M4();
      // 生成视图矩阵
      m4View.setLookAt([0, 4, 10], [0, 0, 0], [0, 1, 0]);
      const m4Pro = new M4();
      // 生成投影矩阵
      m4Pro.setPerspectiveProjection([30, 1, 1, 100]);
      // 赋给着色器对应变量
      gl.uniformMatrix4fv(shaderProgram.uViewMatrix, false, m4View.matrix);
      gl.uniformMatrix4fv(shaderProgram.uProMatrix, false, m4Pro.matrix);
      // 清理颜色和深度缓冲
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      // 绘制顶点
      gl.drawElements(gl.TRIANGLES, 12, gl.UNSIGNED_BYTE, 0);
      // requestAnimationFrame(this.draw.bind(this));
    },
    pageEvent: function () {},
  };

  page.init();
  insertLink({ title: "JavaScript WebGL 3D 绘制三棱锥", linkIndex: 122 });
};
