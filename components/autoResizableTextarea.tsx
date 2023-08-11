import { ForwardedRef, TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textareaRef?: ForwardedRef<HTMLTextAreaElement>; // ref 객체를 전달
  textareaOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // onChange를 내부적으로 사용하므로 매핑해서 써야됨
}

// 자동으로 높이가 조절되는 textarea
// 최소 높이를 지정하려면 min-height 속성 추가
function AutoResizableTextarea({ textareaRef, textareaOnChange, ...props }: Props) {
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // scrollHeight을 구하기 전 줄바꿈 공백을 없애기 위해 높이를 초기화한다
    event.target.style.height = '0px';
    const { borderTopWidth, borderBottomWidth } = getComputedStyle(event.target);
    const { scrollHeight } = event.target;
    // height 늘리기
    const newHeight = scrollHeight + parseInt(borderTopWidth) + parseInt(borderBottomWidth);
    event.target.style.height = `${newHeight}px`;
    if (textareaOnChange) {
      textareaOnChange(event);
    }
  };

  return <textarea ref={textareaRef} onChange={handleTextareaChange} {...props}></textarea>;
}

export default AutoResizableTextarea;
