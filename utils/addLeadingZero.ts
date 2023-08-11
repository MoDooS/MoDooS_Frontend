// 주어진 숫자가 10보다 작은 경우 앞에 0을 붙여 문자열로 반환합니다.
// 1 -> 01
// 10 -> 10
export function addLeadingZero(number: number | string) {
  return `${Number(number) < 10 ? '0' : ''}${number}`;
}
