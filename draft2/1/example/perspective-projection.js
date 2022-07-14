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
      // prettier-ignore
      const vertices = new Float32Array([
        // 面 1
        0.75,  1.0,  -4.0, 0.25, -1.0,  -4.0,1.25, -1.0,  -4.0,
        // 面 2
        0.75,  1.0,  -2.0, 0.25, -1.0,  -2.0, 1.25, -1.0,  -2.0,
        // 面 3
        0.75,  1.0,   0.0, 0.25, -1.0,   0.0, 1.25, -1.0,   0.0,
      ]);
      // prettier-ignore
      const verticesColor = new Uint8Array([
        // 面 1 - 红色
        255, 0, 0, 255, 0, 0, 255, 0, 0,
        // 面 2 - 绿色
        0, 255, 0, 0, 255, 0, 0, 255, 0,
        // 面 3 - 蓝色
        0, 0, 255, 0, 0, 255, 0, 0, 255,
      ]);

      const obj = {};
      obj.verticesBuffer = this.createBuffer(gl, gl.ARRAY_BUFFER, vertices);
      obj.verticesColorBuffer = this.createBuffer(
        gl,
        gl.ARRAY_BUFFER,
        verticesColor
      );

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
    // 缓冲并激活对应顶点属性
    bindEnableBuffer: function (
      gl,
      buffer,
      attribute,
      size,
      type = gl.FLOAT,
      normalize = false
    ) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, size, type, normalize, 0, 0);
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
      let m4Object = new M4();
      m4Object.setLookAt([0.2, 0.2, 0.1], [0, 0, 0], [0, 1, 0]);
      m4Object.rotate(-this.angle, "y");
      // console.info("matrix", m4Object);
      return m4Object.matrix;
    },
    setProjection: function () {
      let m4Object = new M4();
      m4Object.setPerspectiveProjection([
        this.left,
        this.right,
        this.bottom,
        this.top,
        this.near,
        this.far,
      ]);
      return m4Object.matrix;
    },
    /**
     * 绘制
     * @param {*} gl WebGL 上下文
     * @param {*} shaderProgram 着色器程序
     */
    draw: function () {
      const gl = this.gl;
      this.canvasObj.clear();
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const program = this.shaderProgram;
      const targetBuffer = this.screenBuffer;

      gl.useProgram(program.program);
      this.bindEnableBuffer(
        gl,
        targetBuffer.verticesBuffer,
        program.aVertexPos,
        3
      );
      this.bindEnableBuffer(
        gl,
        targetBuffer.verticesColorBuffer,
        program.aColor,
        3,
        gl.UNSIGNED_BYTE,
        true
      );
      const m4View = new M4();
      // 0, 0, 7, 0, 0, -10, 0, 1, 0
      m4View.setLookAt([0, 0, 7], [0, 0, -10], [0, 1, 0]);
      const m4Pro = new M4();
      m4Pro.setPerspectiveProjection([
        this.angle,
        this.ratio,
        this.near,
        this.far,
      ]);
      gl.uniformMatrix4fv(program.uViewMatrix, false, m4View.matrix);
      gl.uniformMatrix4fv(program.uProMatrix, false, m4Pro.matrix);
      gl.drawArrays(gl.TRIANGLES, 0, 3 * 3);
      // requestAnimationFrame(this.draw.bind(this));
    },
    pageEvent: function () {
      const angleEle = document.querySelector("#angleBoundary");
      const angleValue = document.querySelector("#angleValue");
      angleEle.onchange = (e) => {
        const value = e.target.value;
        this.angle = Number(value);
        angleValue.innerHTML = value;
        this.draw();
      };
      const ratioEle = document.querySelector("#ratioBoundary");
      const ratioValue = document.querySelector("#ratioValue");
      ratioEle.onchange = (e) => {
        const value = e.target.value;
        this.ratio = Number(value);
        ratioValue.innerHTML = value;
        this.draw();
      };

      const nearEle = document.querySelector("#nearBoundary");
      const nearValue = document.querySelector("#nearValue");
      nearEle.onchange = (e) => {
        const value = e.target.value;
        this.near = Number(value);
        nearValue.innerHTML = value;
        this.draw();
      };
      const farEle = document.querySelector("#farBoundary");
      const farValue = document.querySelector("#farValue");
      farEle.onchange = (e) => {
        const value = e.target.value;
        this.far = Number(value);
        farValue.innerHTML = value;
        this.draw();
      };
    },
  };

  page.init();
  // insertLink({ title: "JavaScript WebGL 矩阵", linkIndex: 117 });
};
