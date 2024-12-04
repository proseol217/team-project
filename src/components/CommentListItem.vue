<template>
    <div class="comment-list-item">
      <!-- 상단: 이름, 시간, 기능 버튼들 -->
      <div class="comment-header">
        <div class="info">
          <span class="user-name">{{ name }}</span>
        </div>
        <div class="comment-actions">
          <span class="comment-date">{{ comment.created_at }}</span>
          <span class="divider">|</span>
          <span class="action-link update-link" @click="handleUpdate">수정</span>
          <span class="divider">|</span>
          <span class="action-link delete-link" @click="handleDelete">삭제</span>
          <span class="divider">|</span>
          <span class="action-link reply-link" @click="toggleReplyToComment">답글</span>
        </div>
      </div>
      <!-- 하단: 댓글 내용 -->
      <div class="comment-body">
        <p>{{ comment.context }}</p>
      </div>
    </div>
  
    <!-- 답글 입력란을 위한 컴포넌트 -->
    <template v-if="replyToComment">      
      <CommentCreate :parentComment="comment" :contentId="comment.content_id" :commentId="comment.comment_id" 
      :isSubComment="true" :toggleReplyToComment ="toggleReplyToComment" :reloadSubComment="reloadSubComment" />
    </template>
  
    <!-- 하위 댓글 리스트 -->
    <template v-if="subCommentList.length > 0">      
      <div class="comment-list-item-subcomment-list" :key="item.subComment_id" v-for="item in subCommentList">               
        <div class="comment-header">          
          <div class="info">           
            <span class="reply-icon">⮬</span>
            <span class="user-name">{{ item.user_name }}</span>
          </div>
          <div class="comment-actions">
            <span class="comment-date">{{ item.created_at }}</span>
            <span class="divider">|</span>
            <span class="action-link update-link" @click="handleUpdate">수정</span>
            <span class="divider">|</span>
            <span class="action-link delete-link" @click="handleDelete">삭제</span>
            <span class="divider">|</span>
            <span class="action-link reply-link" @click="toggleReplyToComment">답글</span>
          </div>
        </div>
        <div class="comment-body">
          <p>{{ item.context }}</p>
        </div>     
      </div>
    </template>
  </template>
  
  <script>
    import data from '@/data';
    import CommentCreate from './CommentCreate.vue';
  
    export default {
      name: "CommentListItem",
      props: {
        comment: {
          type: Object,
          required: true,
        },
      },
      components: {
        CommentCreate
      },
      data() {
        return {
          name: data.User.filter(item => item.user_id === this.comment.user_id)[0].name,
          subCommentList: data.SubComment.filter(item => item.comment_id === this.comment.comment_id).map(subCommentItem => ({
            ...subCommentItem,
            user_name: data.User.filter(item => item.user_id === subCommentItem.user_id)[0].name
          })),
          replyToComment: false, // 답글을 입력할지 여부를 결정하는 상태
        };
      },
      methods: {       
        reloadSubComment() {
          this.subCommentList = data.SubComment.filter(
            item => item.comment_id === this.comment.comment_id
          ).map(subCommentItem => ({
            ...subCommentItem,
            user_name: data.User.filter(item => item.user_id === subCommentItem.user_id)[0].name
          })
          )
        },
        toggleReplyToComment() {
          this.replyToComment = !this.replyToComment; // 답글 입력을 토글
        },
        editComment() {
          console.log("수정 기능 클릭");
        },
        deleteComment() {
          console.log("삭제 기능 클릭");
        },
      },
    };
  </script>
  
  <style scoped>
/* 전체 댓글 항목 */
.comment-list-item {
  border: 1px solid #9b9b9b;  
  margin-bottom: 5px;
  background-color: #fdfdfd;
}

/* 댓글 정보 영역 */
.comment-header {
  display: flex;
  justify-content: space-between; /* 좌우로 배치 */
  align-items: center;
  border-bottom: 1px dashed #9b9b9b;
  padding: 3px;
  background-color: #e2e2e2;
}

/* 사용자 이름 */
.user-name {
    font-size: 1rem;
}

/* 댓글 작업 (날짜 및 액션 링크) */
.comment-actions {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #555;
}

/* 구분선 */
.divider {
  margin: 0 5px;
  color: #acacac;
}

/* 텍스트 링크 스타일 */
.action-link {
  cursor: pointer;
  color: #555;
  text-decoration: none; /* 기본 밑줄 제거 */
  transition: color 0.3s, border-bottom 0.3s;
}

.action-link:hover {
  text-decoration: underline; /* 마우스 올릴 때 밑줄 */
  color: #555;
}

/* 댓글 날짜 */
.comment-date {
  font-size: 0.875rem;
  color: #555;
}

/* 댓글 본문 스타일 */
.comment-body {
  margin-top: 5px;
  padding: 2px;  
  border-radius: 4px;  
  white-space: pre-wrap;
  word-wrap: break-word;  
}



/* 답글 부분 */
.comment-list-item-subcomment-list {
  border: 1px solid #9b9b9b;
  margin-bottom: 5px;
  background-color: #fdfdfd;
  margin-left: 20px;
}

/* 답글 아이콘 스타일 */
.reply-icon {
    float: left;
  color: #777;
  font-size: 1.2rem;
  
}
</style>