import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(advancedFormat);

export default dayjs;
