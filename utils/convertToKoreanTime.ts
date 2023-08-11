export default function convertToKoreanTime(num: number): string {
  if (num === 0) {
    return '오전 0시';
  }

  if (num >= 1 && num <= 11) {
    return `오전 ${num}시`;
  }

  if (num === 12) {
    return '오후 12시';
  }

  if (num >= 13 && num <= 23) {
    return `오후 ${num - 12}시`;
  }
  return '잘못된 입력입니다.';
}
