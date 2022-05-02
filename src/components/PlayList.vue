<template>
  <div class="root">
    <div class="header">
      <img v-bind:src="url" alt="" style="width: 240px; float: left; margin-top: 40px">
      <div style="float: left; margin-left: 40px; margin-top: 60px">
        <p style="font-size: 80px;">歌单名称</p>
        <p style="float: left"> 简介</p>
      </div>
    </div>
    <div class="control">
      <n-button text style="font-size: 70px;float: left; margin-top: 25px; margin-left: 1%">
        <n-icon>
          <CaretForwardCircleOutline/>
        </n-icon>
      </n-button>

      <n-button text style="font-size: 45px;float: left; margin-top: 40px; margin-left: 30px">
        <n-icon color="">
          <Heart28Regular/>
        </n-icon>
      </n-button>
    </div>
    <div class="table">
      <n-data-table
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :bordered="false"
      />
    </div>
  </div>
</template>

<script>
import {NButton, useMessage} from "naive-ui";
import {CaretForwardCircleOutline} from "@vicons/ionicons5";
import {Heart28Regular} from '@vicons/fluent'
import {h, defineComponent} from "vue";

export default defineComponent({
  name: "PlayList",
  components: {
    CaretForwardCircleOutline,
    Heart28Regular,
  },
  setup() {
    const message = useMessage();
    return {
      url: "https://dailymix-images.scdn.co/v2/img/ab67616d0000b27351cca9834691e3db727c76a5/1/zh/large",
      data,
      columns: createColumns({
        play(row) {
          message.info(`Play ${row.title}`);
        }
      }),
      pagination: false
    }
  }
});
const createColumns = ({play}) => {
  return [
    {
      title: "#",
      key: "no"
    },
    {
      title: "Title",
      key: "title"
    },
    {
      title: "time",
      key: "length"
    },
    {
      title: "Action",
      key: "actions",
      render(row) {
        return h(NButton, {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => play(row)
        }, {default: () => "Play"});
      }
    }
  ];
};

const data = [
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
  {no: 12, title: "Champagne Supernova", length: "7:27"},
];
</script>

<style scoped>
* {
  line-height: 0;
}

.header {
  width: 100%;
  height: 280px;
}

.control {
  width: 100%;
  height: 120px;
}

</style>
