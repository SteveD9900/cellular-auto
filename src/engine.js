// (world: boolean[][]) => boolean[][]
export const next = (world) => {
  const rows = world.length;
  const cols = world[0].length;

  const nestedArray = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => false)
  );
  nestedArray.forEach((row, y) =>
    row.forEach(
      function(col, x) {
        var number = 0;
        var x_start = x >= 1 ? x - 1 : 0;
        var y_start = y >= 1 ? y - 1 : 0;
        var x_len = x == 0 || x == cols - 1 ? 1 : 2;
        var y_len = y == 0 || y == rows - 1 ? 1 : 2;
        for(var i = 0; i <= x_len; i++) {
          for(var j = 0; j <= y_len; j++) {
            if (i + x_start == x && j + y_start == y) continue;
            if (world[j + y_start][i + x_start] == true) {
              number++;
            }
          }
        }

        if ((number == 3 || number == 2) && world[y][x]== true) {
          row[x] = true;
        } else if (number == 3 && !row[x]) {
          row[x] = true;
        }
    })
  );
  return nestedArray;
};
// (pattern: string) => boolean[][]
export const parse = (pattern) => {
  if (!pattern) return [];
  var worldArr = pattern.split("\n").map(function(e) {
    return e.split("").map(x => Boolean(x !== "."));
  });
  worldArr.splice(-1);
  return worldArr;
};
