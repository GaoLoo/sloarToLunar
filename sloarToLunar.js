export class Calendar {
  constructor() {
    this._lunarYearArr = [
      0x0b557, // 1949
      0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
      0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
      0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
      0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
      0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
      0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
      0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
      0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
      0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
      0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
      0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
      0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
      0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
      0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
      0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
      0x0d520, // 2100
    ];
    this._lunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    this._lunarDay = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'];
    this._tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    this._diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    this.sloarToLunar = this._sloarToLunar;
  }

  // eslint-disable-next-line class-methods-use-this
  _hasLeapMonth(ly) {
    // 获取16进制的最后1位，需要用到&与运算符
    // eslint-disable-next-line no-bitwise
    if (ly & 0xf) {
      // eslint-disable-next-line no-bitwise
      return ly & 0xf;
    }
    return false;
  }

  // 公历转农历函数
  _sloarToLunar(sy, sm, sd) {
    sm -= 1;
    let daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) + 1;
    let ly; let lm; let
      ld;
    for (let j = 0; j < this._lunarYearArr.length; j++) {
      daySpan -= this._lunarYearDays(this._lunarYearArr[j]);
      if (daySpan <= 0) {
        ly = 1949 + j;
        daySpan += this._lunarYearDays(this._lunarYearArr[j]);
        break;
      }
    }
    for (let k = 0; k < this._lunarYearMonths(this._lunarYearArr[ly - 1949]).length; k++) {
      daySpan -= this._lunarYearMonths(this._lunarYearArr[ly - 1949])[k];
      if (daySpan <= 0) {
        if (this._hasLeapMonth(this._lunarYearArr[ly - 1949]) && this._hasLeapMonth(this._lunarYearArr[ly - 1949]) <= k) {
          if (this._hasLeapMonth(this._lunarYearArr[ly - 1949]) < k) {
            lm = k;
          } else if (this._hasLeapMonth(this._lunarYearArr[ly - 1949]) === k) {
            lm = `闰${k}`;
          } else {
            lm = k + 1;
          }
        } else {
          lm = k + 1;
        }
        daySpan += this._lunarYearMonths(this._lunarYearArr[ly - 1949])[k];
        break;
      }
    }

    ld = daySpan;

    if (this._hasLeapMonth(this._lunarYearArr[ly - 1949]) && (typeof (lm) === 'string' && lm.indexOf('闰') > -1)) {
      lm = `闰${this._lunarMonth[/\d/.exec(lm) - 1]}月`;
    } else {
      lm = `${this._lunarMonth[lm - 1]}月`;
    }

    ly = `${this._get_tianGan(ly) + this._get_diZhi(ly)}年`;

    if (ld < 11) {
      ld = `${this._lunarDay[10]}${this._lunarDay[ld - 1]}`;
    } else if (ld > 10 && ld < 20) {
      ld = `${this._lunarDay[9]}${this._lunarDay[ld - 11]}`;
    } else if (ld === 20) {
      ld = `${this._lunarDay[1]}${this._lunarDay[9]}`;
    } else if (ld > 20 && ld < 30) {
      ld = `${this._lunarDay[11]}${this._lunarDay[ld - 21]}`;
    } else if (ld === 30) {
      ld = `${this._lunarDay[2]}${this._lunarDay[9]}`;
    }

    console.log(ly, lm, ld);

    return {
      lunarYear: ly,
      lunarMonth: lm,
      lunarDay: ld,
    };
  }

  _leapMonthDays(ly) {
    if (this._hasLeapMonth(ly)) {
      // eslint-disable-next-line no-bitwise
      return (ly & 0xf0000) ? 30 : 29;
    }
    return 0;
  }

  _lunarYearMonths(ly) {
    const monthArr = [];
    // eslint-disable-next-line no-bitwise
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      // eslint-disable-next-line no-bitwise
      monthArr.push((ly & i) ? 30 : 29);
    }
    if (this._hasLeapMonth(ly)) {
      monthArr.splice(this._hasLeapMonth(ly), 0, this._leapMonthDays(ly));
    }

    return monthArr;
  }

  _lunarYearDays(ly) {
    let totalDays = 0;
    // eslint-disable-next-line no-bitwise
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      // eslint-disable-next-line no-bitwise
      const monthDays = (ly & i) ? 30 : 29;
      totalDays += monthDays;
    }
    if (this._hasLeapMonth(ly)) {
      totalDays += this._leapMonthDays(ly);
    }

    return totalDays;
  }

  _get_diZhi(ly) {
    let _diZhiKey = (ly - 3) % 12;
    if (_diZhiKey === 0) _diZhiKey = 12;
    return this._diZhi[_diZhiKey - 1];
  }

  _get_tianGan(ly) {
    let _tianGanKey = (ly - 3) % 10;
    if (_tianGanKey === 0) _tianGanKey = 10;
    return this._tianGan[_tianGanKey - 1];
  }
}
export default new Calendar();
