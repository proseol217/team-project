<template>
  <div class="detail">
    <div class="button-group">
      <router-link to="/board/free" class="action-button back-link">목록</router-link>
      <button class="action-button update-button" @click="updateContent">수정</button>
      <button class="action-button delete-button" @click="confirmDelete">삭제</button> 
    </div>
    <section class="post-info">
      <div class="title">{{ post.title }}</div> 
      <div class="details">
        <span><strong>작성자:</strong> {{ post.user_name }}</span>
        <span><strong>작성일:</strong> {{ post.created_at }}</span>
        <span v-if="post.updated_at"><strong>수정일:</strong> {{ post.updated_at }}</span>
      </div>
    </section>
    <section class="post-content">
      <h2>글 내용</h2>
      <div class="content">
        <p>{{ post.context }}</p>
      </div>
    </section>
    <section class="comments">
      <h2>댓글</h2>
      <p>댓글 기능은 곧 추가될 예정입니다.</p>
    </section>
  </div>
</template>

<script>
import data from '@/data';

export default {
  name: 'Detail',
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      post: {}, // 게시글 데이터를 저장
      originalPost: {}, // 원본 게시글 데이터 (수정 후 원본 비교용)
    };
  },
  created() {
    this.fetchPost(this.contentId); 
  },
  methods: {
    fetchPost(contentId) {
      const foundPost = data.Content.find(item => item.content_id === contentId);
      if (foundPost) {
        const user = data.User.find(userItem => userItem.user_id === foundPost.user_id);
        this.post = {
          ...foundPost,
          user_name: user ? user.name : '알 수 없음',
        };
        this.originalPost = { ...this.post }; 
      } else {
        console.error('게시글을 찾을 수 없습니다:', contentId);
      }
    },
    confirmDelete() {
      const confirmDelete = window.confirm('정말로 게시글을 삭제하시겠습니까? \n삭제된 게시글은 복구할 수 없습니다.');
      if (confirmDelete) {
        this.deleteData();
      }
    },
    deleteData() {
      const content_index = data.Content.findIndex(item => item.content_id === this.contentId);
      if (content_index !== -1) {
        data.Content.splice(content_index, 1); 
        this.$router.push('/board/free');
      } else {
        console.error('삭제할 게시글을 찾을 수 없습니다:', this.contentId);
      }
    },
    updateContent() {
      const contentIndex = data.Content.findIndex(item => item.content_id === this.contentId);
      if (contentIndex !== -1) {
        this.$router.push(`/board/free/create/${this.contentId}`);
      }
    },
    
    saveUpdatedContent(updatedPost) {
      const contentIndex = data.Content.findIndex(item => item.content_id === this.contentId);
      if (contentIndex !== -1) {
       
        if (updatedPost.title !== this.originalPost.title || updatedPost.context !== this.originalPost.context) {
          data.Content[contentIndex] = {
            ...updatedPost,
            updated_at: this.formatDate(new Date()), 
          };
        }
      }
      this.$router.push(`/board/free/detail/${updatedPost.content_id}`);
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  },
};
</script>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9f6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100vh; 
  overflow-y: auto;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 20px; 
}
.action-button {
  padding: 6px 12px;  
  font-size: 0.875rem; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.action-button:hover {
  opacity: 0.9;
}
.action-button:focus {
  outline: none;
}
.back-link {
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
}
.back-link:hover {
  background-color: #0056b3;
}
.update-button {
  background-color: #6c757d;
  color: #fff;
}
.update-button:hover {
  background-color: #5a6268;
}
.delete-button {
  background-color: #dc3545;
  color: #fff;
}
.delete-button:hover {
  background-color: #c82333;
}


.post-info {
  margin-bottom: 20px;
}
.post-info .title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  border-top: 1px solid #9b9b9b;
  border-bottom: 1px solid #9b9b9b;
  background-color: #d8d8d8;
}
.post-info .details {
  font-size: 1rem;
  color: #555;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}
.post-info .details span {
  margin-right: 10px;
}

.post-content {
  margin-bottom: 20px;
}
.post-content h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.post-content .content {
  white-space: pre-wrap;
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}


.comments {
  margin-top: 20px;
}
.comments h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.comments p {
  font-style: italic;
  color: #666;
}
</style>
