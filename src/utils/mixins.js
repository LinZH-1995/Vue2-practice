import moment from 'moment'

export const dateFromNowFilter = {
  filters: {
    dateFromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '--'
    }
  }
}