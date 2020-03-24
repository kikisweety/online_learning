<template>
  <div class="headBox">
    <div class="head">
      <div class="list_item">
        <div class="logo">
          <img src="../assets/logo.png" alt class="logoImg" />
          <h1 class="logoTitle">在线课堂</h1>
        </div>
        <ul class="menu_list">
          <li>首页</li>
          <li>课堂</li>
          <li>题库</li>
          <li>商城</li>
        </ul>
        <div class="login">注册/登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head"
};
</script>

<style scoped>
.headBox {
  width: 100%;
  height: 80px;
}
.head {
  width: 64%;
  height: 100%;
  margin: 0 auto;
}
.list_item {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.logo {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
}
.logoImg {
  width: 45px;
  margin-right: 8px;
}
.logoTitle {
  color: #1f9dff;
}
.menu_list {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 18px;
  color: #515a6e;
}
.menu_list > li {
  padding: 30px;
}
.login {
  position: absolute;
  right: 0px;
}
</style>