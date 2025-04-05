function matrixChainOrder(dimensions) {
    const n = dimensions.length - 1;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    const split = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let len = 2; len <= n; len++) {
      for (let i = 0; i <= n - len; i++) {
        let j = i + len - 1;
        dp[i][j] = Infinity;
  
        for (let k = i; k < j; k++) {
          const cost = dp[i][k] + dp[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
          if (cost < dp[i][j]) {
            dp[i][j] = cost;
            split[i][j] = k;
          }
        }
      }
    }
  
    function buildOptimalParens(i, j) {
      if (i === j) return `A${i + 1}`;
      const k = split[i][j];
      return `(${buildOptimalParens(i, k)} x ${buildOptimalParens(k + 1, j)})`;
    }
  
    return {
      minCost: dp[0][n - 1],
      dpTable: dp,
      splitTable: split,
      optimalOrder: buildOptimalParens(0, n - 1)
    };
  }
  
  module.exports = matrixChainOrder;
  