<template>
  <div id="home-box">
    <a-typography>
      <a-typography-title style="font-family: 'FirstWorld';">
        FuXuan Archive
      </a-typography-title>

      <a-typography-text>
        星穹铁道成就管理工具（已停止更新，截至 2.5 版本）
      </a-typography-text>

      <a-divider />

      <a-typography-paragraph>
        由于长时间没有找到新的数据源，本项目已停止更新😭。
      </a-typography-paragraph>

      <a-typography-paragraph>
        仍在寻找成就管理工具的开拓者们可以尝试使用官方提供的
        <a-link href="https://act.mihoyo.com/sr/event/cultivation-tool/index.html#/tools/achievement">成就管理工具</a-link>
        ，不仅完全平替本工具，还能直接同步游戏内的成就完成情况，简直不要太好用。
      </a-typography-paragraph>
    </a-typography>

    <div class="link-box flex-horizontal">
      <a class="friend-link" target="_blank" href="https://github.com/ChangeSuger/fuxuan-archive">
        <a-card class="friend-card fill-width rounded-medium" :bordered="false" hoverable>
          <template #title>
            <icon-github :size="35"/>
          </template>
          <template #extra>
            项目仓库
          </template>

          本工具已在 GitHub 以 MIT 协议完全开源
        </a-card>
      </a>
      <a class="friend-link" target="_blank" href="https://github.com/ChangeSuger/fuxuan-archive/issues">
        <a-card class="friend-card fill-width rounded-medium" :bordered="false" hoverable>
          <template #title>
            <icon-message :size="35"/>
          </template>
          <template #extra>
            反馈问题
          </template>

          不论是问题反馈还是功能建议都非常欢迎
        </a-card>
      </a>
      <a class="friend-link" target="_blank" href="https://github.com/ChangeSuger/fuxuan-archive/blob/main/CONTRIBUTING.md">
        <a-card class="friend-card fill-width rounded-medium" :bordered="false" hoverable>
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  padding: 20px;
  padding-top: 0px;

  .link-box {
    justify-content: space-around;

    a.friend-link {
      width: 32%;

      .friend-card {
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