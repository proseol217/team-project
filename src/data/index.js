export default {
    User: [
      {
        user_id: 1,
        name: '설유빈',
        created_at: '2024-10-11 11:42:11'
      },
      {
        user_id: 2,
        name: '유제상',
        created_at: '2024-10-13 11:35:18'
      },
      {
        user_id: 3,
        name: '홍길동',
        created_at: '2024-10-08 10:53:25'
      },
    ],
    Content: [
      {
        content_id: 3,
        user_id: 1,
        title: '테스트 글 2',
        context: '해당 글은 임시 작성된 내용입니다.',
        created_at: '2024-10-08 13:11:42',
        updated_at: null
      },
      {
        content_id: 2,
        user_id: 3,
        title: '테스트 글 1',
        context: '커뮤니티 이용 중 매너와 에티켓을 지켜주세요.',
        created_at: '2024-10-07 13:11:42',
        updated_at: null
      },
      {
        content_id: 1,
        user_id: 2,
        title: '공지사항',
        context: '공지사항 기능 확인을 위해 작성된 글입니다.',
        created_at: '2024-10-01 13:11:42',
        updated_at: null
      }
    ],
    Comment: [
      {
        comment_id: 1,
        user_id: 1,
        content_id: 3,
        context: '댓글1',
        created_at: '2024-10-11 14:11:11',
        updated_at: null
      },
      {
        comment_id: 2,
        user_id: 3,
        content_id: 3,
        context: '댓글2',
        created_at: '2024-10-12 16:16:11',
        updated_at: null
      },
      {
        comment_id: 3,
        user_id: 2,
        content_id: 1,
        context: '댓글3',
        created_at: '2024-10-12 15:25:11',
        updated_at: null
      }
    ],
    SubComment: [
      {
        subcomment_id: 1,
        comment_id: 3,
        user_id: 1,
        context: '답글1',
        created_at: '2024-10-12 16:22:11',
        updated_at: null
      }
    ]
  }