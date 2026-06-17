
<template>
  <nav class="NavBar">
    <img class="NavBar__background" :src="navBackground" alt="" aria-hidden="true" />

    <div class="NavBar__inner">
      <router-link to="/" class="NavBar__brand" aria-label="竹语嘉艺首页">
        <img class="NavBar__logo" :src="navLogo" alt="竹语嘉艺" draggable="false" />
      </router-link>

      <ul class="NavBar__list">
        <li v-for="item in navItems" :key="item.to" class="NavBar__item">
          <router-link :to="item.to" class="NavBar__link" :aria-label="item.label">
            <img
              class="NavBar__label NavBar__label--default"
              :src="item.defaultImage"
              :alt="item.label"
              draggable="false"
            />
            <img
              class="NavBar__label NavBar__label--hover"
              :src="item.hoverImage"
              alt=""
              aria-hidden="true"
              draggable="false"
            />
          </router-link>
        </li>
      </ul>

      <div class="NavBar__spacer" aria-hidden="true"></div>
    </div>
  </nav>
</template>

<script setup>
import navLogo from '@/assets/navbar/logo.png'
import navBackground from '@/assets/navbar/backgound.png'

import title1 from '@/assets/navbar/title_1.png'
import title1Hover from '@/assets/navbar/title_1_1.png'

import title2 from '@/assets/navbar/title_2.png'
import title2Hover from '@/assets/navbar/title_2_1.png'

import title3 from '@/assets/navbar/title_3.png'
import title3Hover from '@/assets/navbar/title_3_1.png'

import title4 from '@/assets/navbar/title_4.png'
import title4Hover from '@/assets/navbar/titie_4_1.png'

const navItems = [
  {
    to: '/history',
    label: '竹史溯源',
    defaultImage: title1,
    hoverImage: title1Hover,
  },
  {
    to: '/lab',
    label: '匠心承艺',
    defaultImage: title2,
    hoverImage: title2Hover,
  },
  {
    to: '/',
    label: '竹刻新境',
    defaultImage: title3,
    hoverImage: title3Hover,
  },
  {
    to: '/show',
    label: '刻韵鉴藏',
    defaultImage: title4,
    hoverImage: title4Hover,
  },
]
</script>

<style scoped>
.NavBar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 76px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}


.NavBar__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}


.NavBar__overlay {
  background: linear-gradient(180deg, rgba(10, 12, 10, 0.84), rgba(10, 12, 10, 0.66));
}

.NavBar__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 200px 1fr 140px;
  align-items: center;
  column-gap: 24px;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.NavBar__brand,
.NavBar__spacer {
  width: 140px;
}

.NavBar__brand {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
}

.NavBar__logo {
  display: block;
  height: 50px;
  width: auto;
  transition: transform 0.22s ease;
}

.NavBar__list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.NavBar__item {
  display: flex;
  align-items: center;
}

.NavBar__link {
  position: relative;
  display: block;
  width: 84px;
  height: 34px;
  text-decoration: none;
}

.NavBar__label {
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  width: 100%;
  height: auto;
  transform: translateY(-50%);
  transition: opacity 0.18s ease;
}

.NavBar__label--default {
  opacity: 1;
}

.NavBar__label--hover {
  opacity: 0;
}

.NavBar__brand:hover .NavBar__logo,
.NavBar__brand:focus-visible .NavBar__logo {
  transform: translateY(-1px);
}

.NavBar__link:hover .NavBar__label--default,
.NavBar__link:focus-visible .NavBar__label--default {
  opacity: 0;
}

.NavBar__link:hover .NavBar__label--hover,
.NavBar__link:focus-visible .NavBar__label--hover {
  opacity: 1;
}

.NavBar__brand:focus-visible,
.NavBar__link:focus-visible {
  outline: 2px solid rgba(114, 181, 90, 0.92);
  outline-offset: 6px;
  border-radius: 8px;
}
</style>
