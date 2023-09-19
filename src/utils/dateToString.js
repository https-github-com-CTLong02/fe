const dateToString = (dateTime) => {
    let newDateTimeToString = '';
    const date = new Date(dateTime);
    newDateTimeToString = `/${date.getFullYear()}`;

    if (date.getMonth() + 1 < 10) {
        newDateTimeToString = `/0${date.getMonth() + 1}`.concat(newDateTimeToString);
    } else {
        newDateTimeToString = `/${date.getMonth() + 1}`.concat(newDateTimeToString);
    }
    if (date.getDate() < 10) {
        newDateTimeToString = `0${date.getDate()}`.concat(newDateTimeToString);
    } else {
        newDateTimeToString = `${date.getDate()}`.concat(newDateTimeToString);
    }
    return newDateTimeToString;
};

const dateTo = (dateTime) => {
    let newDateTimeToString = '';
    const date = new Date(dateTime);
    if (date.getDate() < 10) {
        newDateTimeToString = `-0${date.getDate()}`;
    } else {
        newDateTimeToString = `-${date.getDate()}`;
    }
    if (date.getMonth() + 1 < 10) {
        newDateTimeToString = `-0${date.getMonth() + 1}`.concat(newDateTimeToString);
    } else {
        newDateTimeToString = `-${date.getMonth() + 1}`.concat(newDateTimeToString);
    }
    newDateTimeToString = `${date.getFullYear()}`.concat(newDateTimeToString);
    return newDateTimeToString;
};

const dateToHasTimePrev = (dateTime, daysprev = 0) => {
    const date = new Date(dateTime);
    date.setDate(date.getDate() - daysprev);
    return date;
};

const dateWithQuarter = (dateTime, quarter) => {
    const dateBegin = new Date(dateTime);
    const dateEnd = new Date(dateTime);
    if (quarter === 1) {
        dateBegin.setMonth(0);
        dateBegin.setDate(1);
        dateEnd.setMonth(2);
        dateEnd.setDate(31);
    } else if (quarter === 2) {
        dateBegin.setMonth(3);
        dateBegin.setDate(1);
        dateEnd.setMonth(5);
        dateEnd.setDate(30);
    } else if (quarter === 3) {
        dateBegin.setMonth(6);
        dateBegin.setDate(1);
        dateEnd.setMonth(8);
        dateEnd.setDate(30);
    } else if (quarter === 4) {
        dateBegin.setMonth(9);
        dateBegin.setDate(1);
        dateEnd.setMonth(11);
        dateEnd.setDate(31);
    }
    return {
        dateBegin,
        dateEnd,
    };
};
const dateWithYear = (dateTime) => {
    const dateBegin = new Date(dateTime);
    const dateEnd = new Date(dateTime);
    dateBegin.setMonth(0);
    dateBegin.setDate(1);
    dateEnd.setMonth(11);
    dateEnd.setDate(31);
    return {
        dateBegin,
        dateEnd,
    };
};

export { dateTo, dateToHasTimePrev, dateWithQuarter, dateWithYear };
export default dateToString;
