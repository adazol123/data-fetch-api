import {format, register }from 'timeago.js'

const TimeAgoFormat = ( { date }) => {
    const localeFunc = (number, index, totalSec) => {
        return [
            ['just now', 'right now'],
            ['%s seconds ago', '%s seconds ago'],
            ['1 minute ago', '1 minute ago'],
            ['%s minutes ago', '%s minutes ago'],
            ['1 hour ago', '1 hour ago'],
            ['%s hours ago', '%s hours ago'],
            ['1 day ago', '1 day ago'],
            ['%s days ago', '%s days ago'],
            ['1 week ago', '1 week ago'],
            ['%s weeks ago', '%s weeks ago'],
            ['1 month ago', '1 month ago'],
            ['%s months ago', '%s months ago'],
            ['1 year ago', '1 year ago'],
            ['%s years ago', '%s years ago']
          ][index];
    }

    register('custom-locale', localeFunc);
    return (
        <span>
            {format(date, 'custom-locale')}
        </span>
    )
}

export default TimeAgoFormat
