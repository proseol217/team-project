<template>
  <div class="comment-create" ref="CommentCreate">
    <h3 class="comment-title">댓글 작성</h3>
    <textarea
      v-model="context"
      class="comment-textarea"
      placeholder="댓글을 입력하세요..."
      @input="adjustTextareaHeight"
      @focus="showSubmitButton = true"
      ref="textarea"
    ></textarea>
    <div class="comment-actions" v-show="showSubmitButton">
      <button class="submit-button" @click="handleSubmit">작성</button>
    </div>
  </div>
</template>

<script>
import data from '@/data';

export default {
  name: 'CommentCreate',
  props: {
    contentId: Number,
    commentId: Number,
    isSubComment: Boolean,
    reloadComment: Function,
    reloadSubComment: Function,
    toggleReplyToComment: Function,
  },
  data() {
    return {
      name: '설유빈',
      context: "",
      showSubmitButton: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.isSubComment) {
        this.submitSubComment();
      } else {
        this.submitComment();
      }
    },
    submitComment() {
      if (!this.context.trim()) {
        alert("댓글 내용을 입력하세요!");
        return;
      }
      data.Comment.push({
        comment_id: data.Comment[data.Comment.length - 1].comment_id + 1,
        content_id: this.contentId,
        user_id: 1,
        context: this.context,
        created_at: this.formatDate(new Date()),
        updated_at: null,
      });
      this.reloadComment();
      this.context = "";
      this.resetTextareaHeight();
    },
    submitSubComment() {
      if (!this.context.trim()) {
        alert("댓글 내용을 입력하세요!");
        return;
      }
      if (!this.commentId) {
        console.error("commentId가 누락되었습니다!");
        return;
      }
      data.SubComment.push({
        subcomment_id: data.SubComment[data.SubComment.length - 1].subcomment_id + 1,
        comment_id: this.commentId,
        user_id: 1,
        context: this.context,
        created_at: this.formatDate(new Date()),
        updated_at: null,
      });
      this.reloadSubComment();
      this.toggleReplyToComment();
      this.context = "";
      this.resetTextareaHeight();
    },
    adjustTextareaHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    resetTextareaHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto";
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    handleClickOutside(event) {
      const CommentCreateElement = this.$refs.CommentCreate;
      // 참조가 null인지 확인한 후 contains 호출
      if (CommentCreateElement && !CommentCreateElement.contains(event.target)) {
        this.hideSubmitButton(); // 외부 클릭 시 버튼 숨기기
      }
    },
    hideSubmitButton() {
      if (!this.context.trim()) {
        this.showSubmitButton = false;
      }
    },
  },
  mounted() {
    // 전역 클릭 이벤트 추가
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    // 전역 클릭 이벤트 제거
    document.removeEventListener("click", this.handleClickOutside);
  },  
};
</script>

<style scoped>
/* 댓글 작성 영역 */
.comment-create {
  border: 1px solid #9b9b9b;    
  border-radius: 4px;
  background-color: #fdfdfd;
}

/* 댓글 작성 타이틀 */
.comment-title {
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 5px;
  border-bottom: 1px solid #9b9b9b;
  padding: 5px;
  color: #8b8b8b;
}

/* 텍스트 에리어 */
.comment-textarea {
  width: 100%;
  height: 50px;
  padding: 5px;
  font-size: 0.7rem; 
  border: none;
  resize: none; 
  overflow: hidden;
}

.comment-textarea:focus {
  outline: none;
  border-color: #006eff;
 
}

/* 댓글 작성 버튼 */
.comment-actions {
  padding: 5px;
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.6rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:focus {
  outline: none;
}
</style>