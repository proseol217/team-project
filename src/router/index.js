// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Read from '@/components/Read.vue'
import Create from '@/components/Create.vue'
import Detail from '@/components/Detail.vue'
import Board from '@/components/Board.vue'
import HelloWorld from '@/components/HelloWorld.vue'

// routes 정의 : URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑정보를 정의
const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },

  {
    path: '/read',
    name: 'Read',
    component: Read
  },

  {
    path: '/board/free/create/:contentId?',
    name: 'Create',
    component: Create
  },
  {
    path: '/board/free/detail/:contentId',
    name: 'Detail',
    component: Detail,
    props: route => ({ contentId: parseInt(route.params.contentId) }), // contentId를 props로 전달
  },
  {
    path: '/board/free',
    name: 'Board',
    component: Board
  },
 
 
]
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router