import React, { useRef } from 'react';
import Comment from './comment';
import { useMutation, useQueryClient } from 'react-query';
import { postEditRecruitComment } from '@/apis/editRecruitComment';
import { postNewChildRecruitComment } from '@/apis/newChildRecruitComment';
import { deleteRecruitComment } from '@/apis/deleteRecruitComment';
import { postNewRecruitComment } from '@/apis/newRecruitComment';
import { RECRUIT_COMMENTS_QUERY_KEY, useRecruitCommentsQuery } from '@/hooks/queries/recruit/useRecruitCommentsQuery';
import Hr from '@/components/hr';
import AutoResizableTextarea from '@/components/autoResizableTextarea';

type Props = {
  recruitId: string;
};

const Avatar = () => <div className=' w-60 h-60 bg-gray_60 rounded-full shrink-0'></div>;

export default function Comments({ recruitId }: Props) {
  const queryClient = useQueryClient();
  const { comments } = useRecruitCommentsQuery(recruitId);
  const commentMutation = useMutation(postNewRecruitComment);
  const editCommentMutation = useMutation(postEditRecruitComment);
  const newChildCommentMutation = useMutation(postNewChildRecruitComment);
  const deleteCommentMutation = useMutation(deleteRecruitComment);
  const commentTextarea = useRef<HTMLTextAreaElement>(null);

  // 댓글 등록 버튼 클릭
  function handleClickNewCommentBtn() {
    if (!commentTextarea.current) return;
    const content = commentTextarea.current.value.trim();
    if (!content.length) return;
    commentMutation.mutate(
      { recruitId, content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(RECRUIT_COMMENTS_QUERY_KEY);
          commentTextarea.current!.value = '';
        },
      },
    );
  }

  // 댓글/답글 수정
  function fetchEditComment(commentId: number, content: string, onSuccess: () => void) {
    editCommentMutation.mutate(
      { commentId, content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(RECRUIT_COMMENTS_QUERY_KEY);
          onSuccess();
        },
      },
    );
  }

  // 답글 생성
  function fetchNewComment(parentId: number, content: string, onSuccess: () => void) {
    newChildCommentMutation.mutate(
      { recruitId, parentId, content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(RECRUIT_COMMENTS_QUERY_KEY);
          onSuccess();
        },
      },
    );
  }

  // 댓글/답글 삭제
  function fetchDeleteComment(commentId: number) {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries(RECRUIT_COMMENTS_QUERY_KEY);
      },
    });
  }
  return (
    <section className='pt-50 flex flex-col gap-30'>
      {/* 댓글 쓰기 */}
      <h5 className=' font-semibold text-20 mb-30'>{`댓글 ${comments ? comments.length : 0}개`}</h5>
      <div className='flex gap-12 mb-20'>
        <Avatar />
        <AutoResizableTextarea
          textareaOnChange={(e) => console.log(e.target.value)}
          textareaRef={commentTextarea}
          spellCheck={false}
          className='w-full min-h-100 p-14 pb-20 bg-white border-1 border-[#D9D9D9] rounded-14 text-16 outline-primary'
        />
      </div>
      <div className='flex justify-end'>
        <button
          onClick={handleClickNewCommentBtn}
          className='py-8 px-14 bg-primary text-white text-14 font-normal rounded-12'
        >
          댓글 등록
        </button>
      </div>
      {comments &&
        comments
          .sort((a, b) => b.id - a.id) // TODO: 날짜순으로 변경
          .map((comment) => (
            <div key={comment.id}>
              <Comment
                comment={comment}
                isChild={false}
                fetchEditComment={fetchEditComment}
                fetchNewComment={fetchNewComment}
                fetchDeleteComment={fetchDeleteComment}
              />
              <Hr className='mt-30' />
            </div>
          ))}
    </section>
  );
}
