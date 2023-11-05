<template>
  <div id="home-box">
    <a-typography>
      <a-typography-title style="font-family: 'FirstWorld';">
        FuXuan Collection
      </a-typography-title>

      <a-typography-text>
        星穹铁道成就管理工具（绝赞开发中）
      </a-typography-text>
      <a-divider />
    </a-typography>

    <div class="link-box">
      <a class="friend-link" href="https://github.com/ChangeSuger/fuxuan-collection">
        <a-card class="friend-card" :bordered="false" hoverable>
          <template #title>
            <icon-github :size="35"/>
          </template>
          <template #extra>
            项目仓库
          </template>

          本工具已在 GitHub 以 MIT 协议完全开源
        </a-card>
      </a>
      <a class="friend-link" href="https://github.com/ChangeSuger/fuxuan-collection/issues">
        <a-card class="friend-card" :bordered="false" hoverable>
          <template #title>
            <icon-message :size="35"/>
          </template>
          <template #extra>
            反馈问题
          </template>

          不论是问反馈题还是功能建议都非常欢迎
        </a-card>
      </a>
      <a class="friend-link" href="https://github.com/ChangeSuger/fuxuan-collection/blob/main/CONTRIBUTING.md">
        <a-card class="friend-card" :bordered="false" hoverable>
          <template #title>
            <icon-code :size="35"/>
          </template>
          <template #extra>
            贡献指南
          </template>

          期待您的贡献，一起让工具更加完善
        </a-card>
      </a>

    </div>
  </div>
</template>

<script setup lang="ts">
import { IconGithub, IconMessage, IconCode } from '@arco-design/web-vue/es/icon';
</script>

<style lang="scss">
#home-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  padding: 20px;
  padding-top: 0px;

  .link-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    a.friend-link {
      width: 32%;

      .friend-card {
        width: 100%;
        border-radius: 10px;
        background-color: var(--color-fill-2);
        transition-property: all;

        &:hover {
          transform: translateY(-4px);
        }

        .arco-card-header {
          height: 60px;

          .arco-card-header-extra {
            font-size: 24px;
          }
        }

        .arco-card-body {
          font-size: 18px;
        }
      }
    }
  }
}
</style>