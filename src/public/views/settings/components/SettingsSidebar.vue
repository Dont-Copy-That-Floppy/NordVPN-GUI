<template>
  <aside class="settings-sidebar">
    <ul>
      <li v-for="item in routes" :key="item.route">
        <a
          href="#"
          @click.prevent="$emit('navigate', item)"
          :class="{ active: item.route === active }"
        >
          {{ item.name }}
          <span v-if="item.alert" class="alert-dot">!</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup>
defineProps(['routes'])
defineEmits(['navigate'])

const active = window.location.pathname // optionally update if syncing w/ real route
</script>

<style scoped>
.settings-sidebar {
  width: 240px;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 12px 0;
}
a {
  text-decoration: none;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a.active {
  font-weight: bold;
  color: #007bff;
}
.alert-dot {
  background: red;
  color: white;
  font-size: 10px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  margin-left: 6px;
}
</style>
