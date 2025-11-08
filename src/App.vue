<script setup lang="ts"></script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Items</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  padding: 20px;
}

nav {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-active {
  color: #35495e;
}
</style>
