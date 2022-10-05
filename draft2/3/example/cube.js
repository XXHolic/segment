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

      this.shaderProgram = this.createShaderProgram(gl, source, fragmentSource);
      this.screenBuffer = this.initBuffersForScreen(gl);
      // requestAnimationFrame(this.draw.bind(this));
      this.draw();
      this.pageEvent();
    },
    initBuffersForScreen: function (gl) {
      //    v6----- v5
      //   /|      /|
      //  v1------v0|
      //  | |     | |
      //  | |v7---|-|v4
      //  |/      |/
      //  v2------v3
      // prettier-ignore
      const vertices = new Float32Array([
        1.0,  1.0,  1.0,   // v0
        -1.0,  1.0,  1.0,   // v1
        -1.0, -1.0,  1.0,   // v2
        1.0, -1.0,  1.0,   // v3
        1.0, -1.0, -1.0,   // v4
        1.0,  1.0, -1.0,   // v5
        -1.0,  1.0, -1.0,  // v6
        -1.0, -1.0, -1.0,  // v7
      ]);

      // prettier-ignore
      const verticesColor = new Float32Array([
        1.0,  1.0,  1.0, // v0
        0.0,  0.0,  0.0, // v1
        1.0,  1.0,  1.0, // v2
        0.0,  0.0,  0.0, // v3
        1.0,  1.0,  1.0, // v4
        0.0,  0.0,  0.0, // v5
        1.0,  1.0,  1.0, // v6
        0.0,  0.0,  0.0, // v7
      ]);

      // prettier-ignore
      const verticesIndex = new Uint8Array([
        0, 1, 2,   0, 2, 3,    // front
        0, 3, 4,   0, 4, 5,    // right
        0, 5, 6,   0, 6, 1,    // up
        1, 6, 7,   1, 7, 2,    // left
        7, 4, 3,   7, 3, 2,    // down
        4, 7, 6,   4, 6, 5     // back
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
     */
    draw: function () {
      const gl = this.gl;
      this.canvasObj.clear();
      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const program = this.shaderProgram;
      const targetBuffer = this.screenBuffer;

      gl.useProgram(program.program);
      this.bindEnableBuffer(
        gl,
        gl.ARRAY_BUFFER,
        targetBuffer.verticesBuffer,
        program.aVertexPos,
        3
      );
      this.bindEnableBuffer(
        gl,
        gl.ARRAY_BUFFER,
        targetBuffer.verticesColorBuffer,
        program.aColor,
        3
      );
      // 不绑定就报错
      this.bindTargetBuffer(
        gl,
        gl.ELEMENT_ARRAY_BUFFER,
        targetBuffer.verticesIndex
      );
      const m4View = new M4();
      m4View.setLookAt([3, 3, 7], [0, 0, 0], [0, 1, 0]);
      const m4Pro = new M4();
      m4Pro.setPerspectiveProjection([30, 1, 1, 100]);
      gl.uniformMatrix4fv(program.uViewMatrix, false, m4View.matrix);
      gl.uniformMatrix4fv(program.uProMatrix, false, m4Pro.matrix);
      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
      // requestAnimationFrame(this.draw.bind(this));
    },
    pageEvent: function () {},
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 矩阵", linkIndex: 117 });
};
