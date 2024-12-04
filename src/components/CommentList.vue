<template>
<div :key="item.comment_id" v-for="item in comments">
    <CommentListItem :comment="item" />
</div>
<div>
    <CommentCreate :contentId="contentId" :reloadComment="reloadComment"/>
</div>
</template>

<script>
    import data from '@/data';
    import CommentListItem from './CommentListItem.vue';
    import CommentCreate from './CommentCreate.vue';

    export default{
        name: 'CommentList',
        components: {
            CommentListItem,
            CommentCreate
        },
        props: {
            contentId: Number,
        },
        data(){
            return{
                comments: data.Comment.filter(item => item.content_id === this.contentId)
            }
        },
        methods: {
            reloadComment() {
                this.comments = data.Comment.filter(item => item.content_id === this.contentId)
            }
        },
    }

</script>