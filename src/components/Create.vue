<template>
    <div class="create">
      <form @submit.prevent="createPost">
        <div class="form-group">
          <label for="title">제목</label>
          <input 
            type="text" 
            id="title" 
            v-model="title" 
            placeholder="제목을 작성해주세요." 
            required
          />
        </div>
  
        <div class="form-group">
          <label for="content">내용</label>
          <textarea 
            id="content" 
            v-model="context" 
            placeholder="불쾌감, 혐오감 등을 유발할 수 있는 글을 삼가해주세요." 
            rows="6" 
            required
          ></textarea>
        </div>
  
        <div class="form-actions">
          <button type="submit" class="create-button" :disabled="!isModified">
            {{ updateMode ? '수정' : '작성' }}
          </button>
          <router-link 
            :to="updateMode ? `/board/free/detail/${this.$route.params.contentId}` : '/board/free'"class="cancel-link">
            취소
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import data from "@/data";
  
  export default {
    name: "Create",
    props: {
      contentId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        title: "", 
        context: "", 
        updateObject: null,
        updateMode: this.$route.params.contentId > 0 ? true : false,
        initialTitle: "", // 제목 초기 값
        initialContext: "", // 내용 초기 값
      };
    },
    created() {
      if (this.updateMode) {
        const contentId = Number(this.$route.params.contentId);
        this.updateObject = data.Content.find(item => item.content_id === contentId);
        if (this.updateObject) {
          this.title = this.updateObject.title;
          this.context = this.updateObject.context;
          this.initialTitle = this.title;
          this.initialContext = this.context;
        }
      }
    },
    computed: {
      // 제목이나 내용이 수정되었을 때만 버튼 활성화
      isModified() {
        return this.title !== this.initialTitle || this.context !== this.initialContext;
      }
    },
    methods: {
      createPost() {
        if (!this.title || !this.context) {
          alert("제목과 내용을 모두 입력하세요.");
          return;
        }

        if (this.updateMode) {
          this.updateObject.title = this.title;
          this.updateObject.context = this.context;
          this.updateObject.updated_at = this.formatDate(new Date());
          this.$router.push(`/board/free/detail/${this.updateObject.content_id}`);
        } else {
          const newPost = {
            content_id: this.generateContentId(),
            user_id: 1, // 임시 설정(로그인 기능 생기면 바뀔 예정)
            title: this.title,
            context: this.context,
            created_at: this.formatDate(new Date()), // db 연동하면 now 함수 사용 예정
            updated_at: null,
          };
          data.Content.push(newPost);
          this.$router.push("/board/free");
        }
      },

      generateContentId() {
        const maxId = data.Content.reduce((max, item) => Math.max(max, item.content_id), 0);
        return maxId + 1;
      },

      formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    },
  };
  </script>
  
  <style scoped>
  .create {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 100vh;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  textarea {
    resize: vertical;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  
  .create-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.3s;
  }
  
  .create-button:hover {
    background-color: #0056b3;
  }
  
  .create-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .cancel-link {
    text-decoration: none;
    padding: 6px 12px;
    background-color: #6c757d;
    color: white;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: background-color 0.3s;
  }
  
  .cancel-link:hover {
    background-color: #5a6268;
  }
  </style>
  