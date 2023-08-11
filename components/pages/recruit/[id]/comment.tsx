import AutoResizableTextarea from '@/components/autoResizableTextarea';
import Hr from '@/components/hr';
import { CommentType } from '@/query/recruit/useRecruitCommentsQuery';
import { useUserQuery } from '@/query/user/useUserQuery';
import useAlert from '@/recoil/alert/useAlert';
import { cls } from '@/utils/cls';
import { useRef, useState } from 'react';

type Props = {
  comment: CommentType;
  isChild: boolean;
  fetchEditComment: (commentId: number, content: string, onSuccess: () => void) => void;
  fetchNewComment: (parentId: number, content: string, onSuccess: () => void) => void;
  fetchDeleteComment: (commentId: number) => void;
};

const Avatar = () => <div className=' w-60 h-60 bg-gray_60 rounded-full shrink-0'></div>;

export default function Comment({ comment, isChild, fetchEditComment, fetchNewComment, fetchDeleteComment }: Props) {
  const { user } = useUserQuery();
  const { showAlert } = useAlert();
  const [isEditing, setIsEditing] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const editCommentRef = useRef<HTMLTextAreaElement>(null);
  const newChildCommentRef = useRef<HTMLTextAreaElement>(null);

  // 삭제된 댓글인지
  const isDeleted = !comment.writerId;

  // 숨기기/n개의 답글/답글 달기 텍스트
  const childrenBtnText = showChildren
    ? '숨기기'
    : comment.children.length
    ? `${comment.children.length}개의 답글`
    : '답글 달기';

  // 답글 수정 버튼 클릭
  function handleClickEditBtn() {
    const content = editCommentRef.current?.value.trim() ?? '';
    if (!content.length) return;
    fetchEditComment(comment.id, content, () => {
      if (editCommentRef.current) {
        editCommentRef.current.value = '';
        setIsEditing(false);
      }
    });
  }

  // 답글 생성 버튼 클릭
  function handleClickNewChildCommentBtn() {
    const content = newChildCommentRef.current?.value.trim() ?? '';
    if (!content.length) return;
    fetchNewComment(comment.id, content, () => {
      if (newChildCommentRef.current) {
        newChildCommentRef.current.value = '';
      }
    });
  }

  // 댓글/답글 삭제 버튼 클릭
  function handleClickDeleteCommentBtn() {
    showAlert({
      alertViewTitle: '댓글 삭제',
      alertViewDesc: '댓글을 정말로 삭제하시겠습니까?',
      alertActions: [
        { title: '취소', style: 'destructive', handler: null },
        { title: '확인', style: 'primary', handler: () => fetchDeleteComment(comment.id) },
      ],
    });
  }

  return (
    <article>
      <div className='flex justify-between items-center mb-30'>
        <div className='flex gap-12 items-center'>
          <Avatar />
          <div className='flex flex-col gap-5'>
            <span className='text-18 text-black font-semibold'>{comment.writerNickname ?? '알 수 없음'}</span>
            <span className='text-8 text-gray_70 font-semibold'>{comment.createDate}</span>
          </div>
        </div>

        {/* 수정/삭제 버튼 */}
        {user?.memberId === comment.writerId && !isEditing && (
          <div className='flex items-center gap-10 text-14 text-black'>
            <button onClick={() => setIsEditing(true)}>수정</button>
            <button onClick={handleClickDeleteCommentBtn}>삭제</button>
          </div>
        )}
      </div>

      {/* 댓글/답글 수정 */}
      {isEditing && (
        <>
          <AutoResizableTextarea
            textareaRef={editCommentRef}
            defaultValue={comment.content}
            className='w-full min-h-100 mb-20 p-14 bg-white border-1 border-[#D9D9D9] rounded-14 text-16 outline-primary'
          ></AutoResizableTextarea>
          <div className='flex justify-end gap-10 mb-30'>
            <button
              onClick={() => setIsEditing(false)}
              className={cls(
                'py-8 px-14 text-primary text-14 font-normal rounded-12',
                isChild ? 'hover:bg-gray_50' : 'hover:bg-gray',
              )}
            >
              취소
            </button>
            <button
              onClick={handleClickEditBtn}
              className='py-8 px-14 bg-primary text-white text-14 font-normal rounded-12'
            >
              {isChild ? '답글 수정' : '댓글 수정'}
            </button>
          </div>
        </>
      )}

      {/* 댓글 */}
      {!isEditing && (
        <div className={cls('font-medium text-16 text-black mb-30', isDeleted ? 'italic' : '')}>
          {isDeleted ? '삭제된 댓글입니다' : comment.content}
        </div>
      )}
      {!isChild && (
        <button onClick={() => setShowChildren((prev) => !prev)} className=' text-14 text-primary'>
          {childrenBtnText}
        </button>
      )}

      {/* 답글들 */}
      {showChildren && (
        <div className='mt-30 p-30 bg-gray rounded-8'>
          {comment.children.map((comment) => (
            <div key={comment.id}>
              <Comment
                comment={comment}
                isChild
                fetchEditComment={fetchEditComment}
                fetchNewComment={fetchNewComment}
                fetchDeleteComment={fetchDeleteComment}
              ></Comment>
              <Hr className='mb-30' />
            </div>
          ))}

          {/* 답글 달기 */}
          <AutoResizableTextarea
            textareaRef={newChildCommentRef}
            spellCheck={false}
            className='w-full min-h-100 mb-20 p-14 bg-white border-1 border-[#D9D9D9] rounded-14 text-16 outline-primary'
          />
          <div className='flex justify-end gap-10'>
            <button
              onClick={() => setShowChildren(false)}
              className='py-8 px-14 text-primary text-14 font-normal rounded-12 hover:bg-gray_50'
            >
              취소
            </button>
            <button
              onClick={handleClickNewChildCommentBtn}
              className='py-8 px-14 bg-primary text-white text-14 font-normal rounded-12'
            >
              답글 작성
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
