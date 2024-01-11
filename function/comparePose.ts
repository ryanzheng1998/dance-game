import { cosineDistance } from './cosineDistance'

export function comparePoses(
  pose1: [number, number, number][],
  pose2: [number, number, number][]
): number {
  // Convert pose1 and pose2 to 2D arrays (ignoring z-coordinate if present)
  const newPose1 = pose1.map((p) => [p[0], p[1]] as [number, number])
  const newPose2 = pose2.map((p) => [p[0], p[1]] as [number, number])

  // Define the joint pairs for both arms and legs
  const jointIndex: [number, number][] = [
    [11, 13],
    [13, 15],
    [12, 14],
    [14, 16], // Arm joints
    [23, 25],
    [25, 27],
    [24, 26],
    [26, 28], // Leg joints
  ]

  let distance = 0

  // Calculate the cumulative cosine distance for all joint pairs
  jointIndex.forEach(([i, j]) => {
    const newPose1I = newPose1[i] ?? [Infinity, Infinity]
    const newPose1J = newPose1[j] ?? [Infinity, Infinity]
    const newPose2I = newPose2[i] ?? [Infinity, Infinity]
    const newPose2J = newPose2[j] ?? [Infinity, Infinity]

    const vector1 = [newPose1I[0] - newPose1J[0], newPose1I[1] - newPose1J[1]]
    const vector2 = [newPose2I[0] - newPose2J[0], newPose2I[1] - newPose2J[1]]
    distance += cosineDistance(vector1, vector2)
  })

  // Average the distance and calculate similarity score
  distance /= jointIndex.length
  const similarity = 2 - distance

  return similarity * 50
}
