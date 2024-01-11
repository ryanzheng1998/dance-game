export function cosineDistance(a: number[], b: number[]): number {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i++) {
    // is this right?
    const aResult = a[i] ?? Infinity
    const bResult = b[i] ?? Infinity

    dotProduct += aResult * bResult
    normA += aResult * aResult
    normB += bResult * bResult
  }
  return 1 - dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}
