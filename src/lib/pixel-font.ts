/**
 * Fonte de pixels 5×7 para a grade de contribuições da home (Release 0.10):
 * a grade do GitHub tem 7 linhas, então cada letra ocupa as 7 e 5 colunas.
 * Cada letra é uma lista de 7 linhas; "#" acende o quadrado.
 */
const GLYPHS: Record<string, string[]> = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  C: [".###.", "#...#", "#....", "#....", "#....", "#...#", ".###."],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  J: ["..###", "...#.", "...#.", "...#.", "...#.", "#..#.", ".##.."],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
  X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
};

export const GRID_COLUMNS = 53;
export const GRID_ROWS = 7;

/**
 * Desenha uma palavra centralizada numa grade de 53×7 (semanas × dias).
 * Devolve uma matriz [coluna][linha] com `true` onde a letra acende.
 * Letras com 1 coluna de espaço; até 9 letras cabem (9×5 + 8 = 53).
 */
export function renderWord(word: string): boolean[][] {
  const letters = [...word.toUpperCase()].filter((c) => GLYPHS[c]);
  const width = letters.length * 6 - 1;
  const offset = Math.max(0, Math.floor((GRID_COLUMNS - width) / 2));
  const grid = Array.from({ length: GRID_COLUMNS }, () =>
    Array<boolean>(GRID_ROWS).fill(false)
  );
  letters.forEach((letter, li) => {
    GLYPHS[letter].forEach((row, y) => {
      [...row].forEach((cell, x) => {
        const col = offset + li * 6 + x;
        if (cell === "#" && col < GRID_COLUMNS) grid[col][y] = true;
      });
    });
  });
  return grid;
}
