import MomentUtils from '@date-io/moment';

class MomentUTCUtils extends MomentUtils {
  format(value, formatString) {
    return this.moment.utc(value).format(formatString);
  }

  parse(value, format) {
    if (value === '') {
      return null;
    }

    return this.moment.utc(value, format, true);
  }

  date(value) {
    if (value === null) {
      return null;
    }

    const moment = this.moment.utc(value);
    moment.locale(this.locale);

    return moment;
  }
}

export default MomentUTCUtils;