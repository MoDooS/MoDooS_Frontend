type StringNumber = string | number;

export default function findMostCommonElement(arr: StringNumber[]) {
  if (arr.length === 0) return null;

  const counts: { [key: StringNumber]: number } = {};
  let maxCount = 0;
  let mostCommonElement = null;

  for (const element of arr) {
    counts[element] = (counts[element] || 0) + 1;
    if (counts[element] > maxCount) {
      maxCount = counts[element];
      mostCommonElement = element;
    }
  }

  return mostCommonElement;
}
