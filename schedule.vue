<template>
  <div class="schedule">
      <div class="schedule-bar">
        <span :style="{right:scheduleBarBtnRight}" class="schedule-status-end">{{statusText[2]}}</span>
        <div :style="{left:scheduleBarBtnLeft}" class="schedule-bar-rate">{{statusText[0]}}</div>
        <div :style="{left:scheduleBarBtnLeft}"  class="schedule-bar-btn">{{status}}</div>
      </div>
      <div class="day-label-content">
          <div class="day-label" v-for="(item,index) in daysArray" :key="index">
            <a><span>{{item.key}}</span><span v-if="showNongli">{{nongliFormat(item.nongli)}}</span></a>
          </div>
      </div>
  </div>
</template>
<script>
import sloarToLunar from './sloarToLunar';

const oneDayTimes = 3600 * 1000 * 24;
const nowTime = new Date().getTime();
export default {
  name: 'new-year-activity-quiz-schedule',

  props: {
    statusText: {
      type: Array,
      default: () => (['未开始', '进行中', '已结束']),
    },
    scheduleWidth: {
      type: Number,
      default: 1000,
    },
    startTime: Number,
    endTime: Number,
    showNongli: {
      type: Boolean,
      default: false,
    },
    nongliFormat: {
      type: Function,
      default: item => (item),
    },
    timeFormat: {
      type: String,
      default: 'YYYY-MM-DD',
    },
  },
  computed: {
    days() {
      const times = this.endTime - this.startTime;
      return Math.ceil(times / oneDayTimes) + 1;
    },
    scheduleBarBtnRight() {
      if (!this.daysArray.length) return 0;
      const daysLen = this.daysArray.length;
      for (let i = 0; daysLen > i; i++) {
        const item = this.daysArray[i];
        if (item.time[0] < nowTime && nowTime < item.time[1]) {
          const right = 1000 - (i / daysLen) * this.scheduleWidth;
          return `${right}px`;
        }
      }
      if (this.endTime < nowTime) {
        return 0;
      }
      return `${this.scheduleWidth - 156}px`;
    },
    scheduleBarBtnLeft() {
      if (!this.daysArray.length) return 0;
      const daysLen = this.daysArray.length;
      for (let i = 0; daysLen > i; i++) {
        const item = this.daysArray[i];
        if (item.time[0] < nowTime && nowTime < item.time[1]) {
          const left = (i / daysLen) * this.scheduleWidth;
          return `${left}px`;
        }
      }
      if (this.endTime < nowTime) {
        return `${this.scheduleWidth - 156}px`;
      }
      return 0;
    },
    status() {
      if (this.startTime > nowTime) {
        return this.statusText[0];
      }
      if (this.startTime < nowTime && nowTime < this.endTime) {
        return this.statusText[1];
      }
      if (nowTime > this.endTime) {
        return this.statusText[2];
      }
      return '';
    },
    daysArray() {
      const dayArr = [];
      for (let i = 0; i < this.days; i++) {
        dayArr.push({
          key: moment(this.startTime).add(i, 'days').format(this.timeFormat),
          time: [this.startTime + oneDayTimes * i, this.startTime + oneDayTimes * (i + 1) - 1], // array = [一天的开始时间，一天的结束时间 ]
          nongli: sloarToLunar.sloarToLunar(this.startTime + oneDayTimes * i),
          value: this.startTime + oneDayTimes * i,
        });
      }
      return dayArr;
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(schedule) {
  background-color: transparent;
  width: 100%;

  .schedule-bar {
    position: relative;
    width: 100%;
    height: 20px;
    border-radius: 10px;
    background-color: #7b0400;
  }

  .schedule-bar-rate {
    z-index: 2;
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
    left: 0;
    height: 20px;
    border-radius: 10px;
    background-color: #a71f24;
    font-size: 14px;
    color: #feca64;
    text-indent: 78px;
  }

  .schedule-bar-btn {
    background: url(../assets/schedule.png) no-repeat center center;
    background-size: 156px 29px;
    width: 156px;
    height: 29px;
    text-align: center;
    line-height: 29px;
    font-size: 14px;
    color: #8d0501;
    z-index: 3;
    position: absolute;
    top: -4.5px;
    right: 0;
    left: 0;
  }

  .schedule-status-end {
    position: absolute;
    left: 0;
    text-align: center;
    font-size: 14px;
    color: #feca64;
  }

  .day-label-content {
    display: flex;
    margin-top: 22px;

    .day-label {
      padding-bottom: 3px;
      text-align: center;
      font-size: 14px;
      color: #feca64;
      flex: 1;
    }
  }
}
</style>
