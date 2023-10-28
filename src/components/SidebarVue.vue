<template>
  <div id="sidebar">
    <ul>
      <li class="firstli">
        <router-link to="/">
          <div class="contenticon">
            <i class="fa-solid fa-house icon"></i>
          </div>
          <span> Home </span>
        </router-link>
      </li>
      <li>
        <router-link to="product">
          <div class="contenticon">
            <i class="fa-solid fa-cart-shopping icon"></i>
          </div>
          <span>Products</span>
        </router-link>
      </li>
      <li>
        <router-link to="matrix">
          <div class="contenticon">
            <i class="fa-solid fa-calculator icon"></i>
          </div>
          <span>Matrix </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#sidebar {
  z-index: 0;
  position: fixed;
  width: 250px;
  height: 100%;
  overflow-y: auto;
  background: white;
  box-shadow:
    0 2px 5px 0 rgb(0 0 0 / 5%),
    0 2px 10px 0 rgb(0 0 0 / 5%);
}
#sidebar span {
  color: #4b5563;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  display: block;
  margin-left: 5px;
  margin-right: 5px;
}
a {
  text-decoration: none;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 25px;
  padding-left: 25px;
  display: flex;
  align-items: center;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
a:hover {
  background: rgba(59, 113, 202, 0.05);
  border-radius: 5px;
}
.router-link-exact-active {
  background: rgba(59, 113, 202, 0.05);
  border-radius: 5px;
}
.icon {
  margin-right: 1rem;
  color: #9fa6b2;
}
.contenticon {
  display: flex;
  width: 33px;
}
.firstli {
  margin-top: 5px;
}
</style>
