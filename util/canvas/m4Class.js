class M4 {
  constructor(init) {
    // Float32 减少 CPU 消耗周期
    // https://blog.mozilla.org/javascript/2013/11/07/efficient-float32-arithmetic-in-javascript/
    // https://stackoverflow.com/questions/67873321/float32array-weird-precision-loss

    this.matrix = init ? init : this.getIdentity();
  }

  // 单位矩阵
  getIdentity() {
    // prettier-ignore
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }

  // 位移矩阵
  translation(tx, ty, tz) {
    const x = Number(tx),
      y = Number(ty),
      z = Number(tz);
    // prettier-ignore
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    ];
  }

  // 缩放矩阵
  scaling(sx, sy, sz) {
    const x = Number(sx),
      y = Number(sy),
      z = Number(sz);
    // prettier-ignore
    return [
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1,
    ];
  }

  // 旋转矩阵
  xRotation(angle) {
    const radian = (Math.PI * angle) / 180.0; // Convert to radians
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    // prettier-ignore
    return [
      1,  0,  0,  0,
      0,  c,  s,  0,
      0, -s,  c,  0,
      0,  0,  0,  1,
    ];
  }
  yRotation(angle) {
    const radian = (Math.PI * angle) / 180.0; // Convert to radians
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    // prettier-ignore
    return [
      c, 0, s, 0,
      0, 1, 0, 0,
     -s, 0, c, 0,
      0, 0, 0, 1,
    ];
  }
  zRotation(angle) {
    const radian = (Math.PI * angle) / 180.0; // Convert to radians
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    // prettier-ignore
    return [
      c, s, 0, 0,
     -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }
  multiply(a, b) {
    const a00 = a[0 * 4 + 0];
    const a01 = a[0 * 4 + 1];
    const a02 = a[0 * 4 + 2];
    const a03 = a[0 * 4 + 3];
    const a10 = a[1 * 4 + 0];
    const a11 = a[1 * 4 + 1];
    const a12 = a[1 * 4 + 2];
    const a13 = a[1 * 4 + 3];
    const a20 = a[2 * 4 + 0];
    const a21 = a[2 * 4 + 1];
    const a22 = a[2 * 4 + 2];
    const a23 = a[2 * 4 + 3];
    const a30 = a[3 * 4 + 0];
    const a31 = a[3 * 4 + 1];
    const a32 = a[3 * 4 + 2];
    const a33 = a[3 * 4 + 3];
    const b00 = b[0 * 4 + 0];
    const b01 = b[0 * 4 + 1];
    const b02 = b[0 * 4 + 2];
    const b03 = b[0 * 4 + 3];
    const b10 = b[1 * 4 + 0];
    const b11 = b[1 * 4 + 1];
    const b12 = b[1 * 4 + 2];
    const b13 = b[1 * 4 + 3];
    const b20 = b[2 * 4 + 0];
    const b21 = b[2 * 4 + 1];
    const b22 = b[2 * 4 + 2];
    const b23 = b[2 * 4 + 3];
    const b30 = b[3 * 4 + 0];
    const b31 = b[3 * 4 + 1];
    const b32 = b[3 * 4 + 2];
    const b33 = b[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  }

  translate(data) {
    const [tx, ty, tz] = data;
    const translateMatrix = this.translation(tx, ty, tz);
    this.matrix = this.multiply(this.matrix, translateMatrix);
    return this;
  }

  rotate(angle, axis = "z") {
    switch (axis) {
      case "x":
        this.matrix = this.multiply(this.matrix, this.xRotation(angle));
        break;
      case "y":
        this.matrix = this.multiply(this.matrix, this.yRotation(angle));
        break;
      case "z":
        this.matrix = this.multiply(this.matrix, this.zRotation(angle));
        break;
    }
    return this;
  }

  scale(data) {
    const [sx, sy, sz] = data;
    const scaleMatrix = this.scaling(sx, sy, sz);
    this.matrix = this.multiply(this.matrix, scaleMatrix);
    return this;
  }

  // 描述观察者
  setLookAt(eye, target, up) {
    const [eyeX, eyeY, eyeZ] = eye;
    const [targetX, targetY, targetZ] = target;
    const [upX, upY, upZ] = up;
    let fx, fy, fz, sx, sy, sz, ux, uy, uz;

    fx = targetX - eyeX;
    fy = targetY - eyeY;
    fz = targetZ - eyeZ;

    // 单位化
    const rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
    fx *= rlf;
    fy *= rlf;
    fz *= rlf;
    // f 与上向量的叉乘
    sx = fy * upZ - fz * upY;
    sy = fz * upX - fx * upZ;
    sz = fx * upY - fy * upX;
    // 单位化
    const rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
    sx *= rls;
    sy *= rls;
    sz *= rls;

    // s 和 f 的叉乘
    ux = sy * fz - sz * fy;
    uy = sz * fx - sx * fz;
    uz = sx * fy - sy * fx;

    const m12 = sx * -eyeX + sy * -eyeY + sz * -eyeZ;
    const m13 = ux * -eyeX + uy * -eyeY + uz * -eyeZ;
    const m14 = -fx * -eyeX + -fy * -eyeY + -fz * -eyeZ;

    // prettier-ignore
    this.matrix = [
      sx, ux, -fx, 0,
      sy, uy, -fy, 0,
      sz, uz, -fz, 0,
     m12,m13, m14, 1,
    ];

    return this;
  }
  // 正射投影
  serOrthographicProjection(data) {
    const [left, right, bottom, top, near, far] = data;

    if (left === right || bottom === top || near === far) {
      throw "Invalid Projection";
    }

    const rw = 1 / (right - left);
    const rh = 1 / (top - bottom);
    const rd = 1 / (far - near);

    const m0 = 2 * rw;
    const m5 = 2 * rh;
    const m10 = -2 * rd;
    const m12 = -(right + left) * rw;
    const m13 = -(top + bottom) * rh;
    const m14 = -(far + near) * rd;

    // prettier-ignore
    this.matrix = [
      m0,   0,  0,  0,
       0,  m5,  0,  0,
       0,   0, m10, 0,
     m12, m13, m14, 1,
    ];

    return this;
  }
}
