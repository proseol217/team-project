<template>
	<header class="header">
	  <!-- 네비게이션 바 -->
	  <nav class="navbar">
		<div class="navbar-left">
		  <!-- 네비게이션 로고 -->
		  <div class="navbar-logo">
			<a href="/">로고</a>
		  </div>
  
		  <!-- 네비게이션 메뉴 리스트 -->
		  <ul class="navbar-menu">
			<li>
			  <a href="#" @click.prevent="navigateToHome" :class="{ active: currentPath === '/' }">홈</a>
			</li>
			<li @mouseover="toggleDropdown(true)" @mouseleave="toggleDropdown(false)">
			  <a href="#" :class="{ active: currentPath === '#dropdown' }" >드롭다운</a>
			  <ul v-if="isDropdownActive" class="dropdown-menu">
				<li><a href="#sub1" @click="setCurrentPath('#sub1')">서브 메뉴 1</a></li>
				<li><a href="#sub2" @click="setCurrentPath('#sub2')">서브 메뉴 2</a></li>
				<li><a href="#sub3" @click="setCurrentPath('#sub3')">서브 메뉴 3</a></li>
			  </ul>
			</li>
			<li>
			  <a href="#" @click.prevent="navigateToBoard" :class="{ active: currentPath === '/board/free' }">게시판</a>
			</li>
			<li>
			  <a href="#contact" :class="{ active: currentPath === '#contact' }" @click="setCurrentPath('#contact')">임시2</a>
			</li>
		  </ul>
		</div>
  
		<!-- 검색창 -->
		<div class="navbar-right">
		  <input type="text" class="search-input" placeholder="Search..." />
		</div>
	  </nav>
	</header>
</template>
  
<script>
export default {
	data() {
	  return {
		currentPath: '/', // 기본 경로를 '/'로 설정
		isDropdownActive: false, // 드롭다운 활성화 상태
	  };
	},
	methods: {
	  setCurrentPath(path) {
		this.currentPath = path; // currentPath 업데이트
	  },
	  toggleDropdown(isActive) {
		this.isDropdownActive = isActive;
	  },
	  navigateToHome() {
		this.currentPath = '/'; // 홈으로 이동 시 currentPath 업데이트
		this.$router.push('/'); // 메인 화면으로 이동
	  },
	  navigateToBoard() {
		this.currentPath = '/board/free'; // 보드로 이동 시 currentPath 업데이트
		this.$router.push('/board/free'); // /board/free 경로로 이동
	  },
	},
};
</script>
  
<style scoped>
.header {
	background-color: #f0f0f0;
}
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 20px;
	background-color: #d3f1f3;
	border-bottom: 1px solid #dcdcdc;
}

/* 왼쪽 로고와 메뉴 관련 */
.navbar-left {
	display: flex;
	align-items: center;
}
.navbar-logo a {
	color: #333;
	text-decoration: none;
	font-size: 1.2rem;
	margin-right: 20px;
}

/* 네비게이션 메뉴 스타일 */
.navbar-menu {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}
.navbar-menu li {
	position: relative; /* 드롭다운 메뉴를 위해 상대 위치 지정 */
	margin-right: 10px; 
}
.navbar-menu li a {
	color: #888; 
	padding: 5px 10px;
	text-decoration: none;
	font-size: 1rem;
	transition: color 0.3s; /* 부드러운 전환 효과 */
}
.navbar-menu li a:hover {
	color: #333; /* 마우스를 올렸을 때 진한 색으로 */
}
.navbar-menu li a.active {
	color: #000; /* 현재 위치한 곳은 진한 색으로 표시 */
}

/* 드롭다운 메뉴 스타일 */
.dropdown-menu {
	display: block; /* 드롭다운 메뉴 표시 */
	position: absolute; /* 드롭다운 위치 설정 */
	background-color: #fff; /* 드롭다운 배경색 */
	border: 1px solid #dcdcdc;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	z-index: 1000; /* 위에 표시되도록 */
	list-style: none;
	margin: 0;
	padding: 0;
	width: 150px; /* 드롭다운 너비 설정 */
}
.dropdown-menu li {
	margin: 0; /* 드롭다운 항목 간의 간격 없음 */
}
.dropdown-menu li a {
	padding: 10px; /* 드롭다운 항목 패딩 */
	display: block; /* 드롭다운 항목 전체 클릭 가능 */
}
.dropdown-menu li a:hover {
	background-color: #f0f0f0; /* 호버 시 배경색 변경 */
}

/* 오른쪽 검색창 */
.navbar-right {
	display: flex;
	align-items: center;
}
.search-input {
	padding: 5px 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 0.9rem;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
	/* 모바일에서도 메뉴를 수평 정렬 */
	.navbar-menu {
	  /* 추가 스타일 필요 없음 */
	}

	.navbar-right {
	  /* 모바일에서도 검색창을 유지하고, 메뉴와 동일하게 정렬 */
	  margin-left: auto; /* 오른쪽에 정렬 */
	}
}
</style>
