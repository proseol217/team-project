<template>
    <div>
        <table>
            <tr>
                <td>이름</td>
                <td>제목</td>
                <td>내용</td>                   
            </tr>
            <tr :key="i" v-for="(value,i) in data" @click="detail(i)">
                <td>{{ value.writer }}</td>
                <td>{{ value.title }}</td>
                <td>{{ value.content }}</td>                   
            </tr>            
        </table>
        <button @click="write">글쓰기</button>
    </div>
</template>

<script>
import data from '@/data'

export default {
   name: 'DataRead',
   data(){
    return {
    data: data
    }
   },
   methods: {
    write() {
        this.$router.push({
            path: 'create'
        })
      },

      detail(index) {
    this.$router.push({
        name: 'Detail',
        params:{
            contentId: index
        }
         })
      }  
    
   },
   
}
</script>
