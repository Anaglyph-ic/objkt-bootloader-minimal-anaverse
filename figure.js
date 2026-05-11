const genererFigures = (hex, anaverse, deltaLocation) => {
  //=== OBJKT RANDOM ===
  function parseSeed(hex) {
    if (!hex || typeof hex !== "string") {
      hex = Array(32)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    }
    hex = hex
      .replace(/[^0-9a-f]/gi, "f")
      .padStart(32, "0")
      .toLowerCase();
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2)
      bytes.push(parseInt(hex.substring(i, i + 2), 16));
    const abcd = new Uint32Array(4);
    for (let i = 0; i < 4; i++) {
      abcd[i] =
        (bytes[i * 4] << 24) |
        (bytes[i * 4 + 1] << 16) |
        (bytes[i * 4 + 2] << 8) |
        bytes[i * 4 + 3];
    }
    for (let i = 16; i < bytes.length; i++) {
      const idx = i - 16;
      const wi = idx % 4;
      const shift = (3 - (idx % 4)) * 8;
      abcd[wi] ^= bytes[i] << shift;
    }
    if (!(abcd[0] | abcd[1] | abcd[2] | abcd[3])) abcd[3] = 1;
    return abcd;
  }

  function sfc32(seed) {
    let [a, b, c, d] = [...seed];
    const g = function () {
      a |= 0;
      b |= 0;
      c |= 0;
      d |= 0;
      const t = (((a + b) | 0) + d) | 0;
      d = (d + 1) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
    g.reset = () => {
      [a, b, c, d] = [...seed];
    };
    return g;
  }

  const seed = hex;
  const rnd = sfc32(parseSeed(seed));

  //=== ANAV STANDARD ===

  const figures = [];
  const features = {};
  const u = 0.5;

  const r = () => rnd();
  const rint = (n) => Math.floor(n * r());
  const rarr = (arr) => arr[Math.floor(r() * arr.length)];
  for (let i = 0; i < 1 + r() * 10; i++) {
    const cube = {
      geometry: {
        type: "BoxGeometry",
        args: [1, 1, 1],
      },
      pos: {
        // Position
        x: (-0.5 + r() * 1) * u,
        y: i,
        z: (-0.5 + r() * 1) * u,
      },
      rot: {
        // Rotation
        x: 0,
        y: -0.5 + r() * 1,
        z: 0,
      },
      scale: {
        // Scale
        x: 1,
        y: 1,
        z: 1,
      },
      lines: true, // Display color segments (like wireframe, but faces not triangles)
      hatch: true, // Fill with white texture
      full: false, // Fill with color texture (in the anaverse, black)
    };

    figures.push(cube);
  }

  features.Name = "Cube " + r();

  return { figures, features };
};

export { genererFigures };
