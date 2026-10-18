/**
 * Gera as variantes AVIF/WebP das fotos a partir dos originais em
 * `assets-src/` (doc 12 §2). Execução: `npm run assets:images`.
 * As variantes geradas são commitadas; o CI não roda este script.
 */
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

// Compressão fixa no código (doc 12 §2): AVIF 55, WebP 78.
const AVIF = { quality: 55 };
const WEBP = { quality: 78 };

const IMAGES = [
  {
    // Foto pessoal (doc 05 §7): recorte quadrado no rosto, usado no hero da
    // home e no avatar do painel de perfil. 320 cobre o hero em 2×; 96, o
    // avatar de 44px em 2×.
    src: "assets-src/site/site-foto.jpg",
    out: "public/images/site/site-foto",
    crop: { left: 67, top: 200, width: 660, height: 660 },
    widths: [96, 320],
  },
];

for (const image of IMAGES) {
  await mkdir(dirname(image.out), { recursive: true });
  for (const width of image.widths) {
    // Sem metadados na saída (padrão do sharp): nada de EXIF/GPS publicado.
    const base = sharp(image.src).extract(image.crop).resize(width);
    for (const [ext, encode] of [
      ["avif", (s) => s.avif(AVIF)],
      ["webp", (s) => s.webp(WEBP)],
    ]) {
      const file = `${image.out}-${width}.${ext}`;
      const { size } = await encode(base.clone()).toFile(file);
      console.log(`${file}  ${(size / 1024).toFixed(1)} KB`);
    }
  }
}
