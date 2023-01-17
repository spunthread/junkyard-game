const crypto = require("crypto");

function genSeq(count, limit) {
  const arr = Array(count - 1)
    .fill(0)
    .map((_) => crypto.randomInt(1, limit))
    .concat(0, limit)
    .sort((a, b) => a - b);

  const ans = [];

  for (let i = 1; i < arr.length; i++) {
    ans.push(arr[i] - arr[i - 1]);
  }

  return ans.sort((a, b) => a - b);
}

// console.log(`[${genSeq(3, 75)}]`);

// console.log(`[${genSeq(10, 210)}]`);

console.log(`[${genSeq(10, 100).map((v) => v / 100)}]`);
