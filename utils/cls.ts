// tailwind css 클래스 네임들을 합치는 함수
export function cls(...classnames: string[]) {
  return classnames.join(' ');
}
