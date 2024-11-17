<template>
  <div>
    <table class="board-table">
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>등록일</th>
          <th>글쓴이</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.content_id" @click="goToDetail(item.content_id)">
          <td>{{ item.content_id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.created_at }}</td>
          <td>{{ item.user_name }}</td>
        </tr>
      </tbody>
    </table>
    <div>
    <button class="action-button write-button" @click="gotoCreate">글 작성</button>
    </div>
  </div>
</template>

<script>
import data from '@/data'


export default {
  name: 'Board',
  data() {
    let items = data.Content.sort((a, b) => {
  return b.content_id - a.content_id
});
items = items.map(contentItem => {
  return {
    ...contentItem,
    user_name: data.User.find(userItem => userItem.user_id === contentItem.user_id).name
  }
});
    return {
      items: items
    }
  },
  methods: {
    goToDetail(contentId) {      
      this.$router.push(`/board/free/detail/${contentId}`);
    },
    gotoCreate(){
      this.$router.push({
        path: '/board/free/create'
      })
      },
  }
}
</script>

<style scoped>
.board-table {
  width: 100%;
  border-collapse: collapse;
}

.board-table th, .board-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.board-table th {
  background-color: #f2f2f2;
}

.board-table tr:hover {
  background-color: #f1f1f1; 
  cursor: pointer; 
}

.action-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}
.action-button:hover {
  opacity: 0.9;
}
.action-button:focus {
  outline: none;
}

.write-button {
  background-color: #007bff;
  color: #fff;
}
.write-button:hover {
  background-color: #0056b3;
}
</style>
