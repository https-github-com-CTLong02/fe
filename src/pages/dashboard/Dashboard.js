import { Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
import PieChart from 'highcharts-react-official';
import Highchart from 'highcharts';
import styles from './Dashboard.module.scss';
import BookApi from '~/api/BookApi';
import { useEffect, useState } from 'react';
import BorrowingApi from '~/api/BorrowingApi';
import bookHelper from '~/utils/bookHelper';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import dateToString, { dateToHasTimePrev, dateWithQuarter, dateWithYear, dateTo } from '~/utils/dateToString';
import './Dashboard.css';
function DashBoard() {
    const [history, setHistory] = useState();
    const [title, setTitle] = useState('Tất cả');
    const [option, setOption] = useState(0);
    const [books, setBooks] = useState({
        curriculum: 0,
        gradutionThesis: 0,
        referenceBook: 0,
        magazine: 0,
        scienceTopic: 0,
    });
    const [booksByType, setBooksByType] = useState({
        curriculum: 0,
        gradutionThesis: 0,
        referenceBook: 0,
        magazine: 0,
        scienceTopic: 0,
    });
    const option1 = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            style: {
                'font-family': ' Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
            },
            height: 200,
        },
        title: {
            text: null,
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        colors: ['#2C78BE', '#FA9124', '#2CBE89', '#E13853', '#ccc'],
        legend: {
            verticalAlign: 'middle',
            layout: 'vertical',
            align: 'right',
            enabled: true,
            useHTML: true,
            itemMarginBottom: 8,
            labelFormatter: function () {
                return this.name + '<span>' + this.y + '</span>';
            },
            itemStyle: {
                color: '#3f4254',
                fontSize: '12px',
            },
            title: {
                style: {
                    'font-family': ' Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
                },
            },
        },
        series: [
            {
                color: '#fff',
                colorByPoint: true,

                data: [
                    {
                        name: 'Giáo trình',
                        y: booksByType.curriculum,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Đồ án tốt nghiệp',
                        y: booksByType.gradutionThesis,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Sách tham khảo',
                        y: booksByType.referenceBook,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Tạp chí',
                        y: booksByType.magazine,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Đề tài khoa học',
                        y: booksByType.scienceTopic,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                ],
            },
        ],
    };
    const option2 = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            style: {
                'font-family': ' Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
            },
            height: 200,
        },
        title: {
            text: null,
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        colors: ['#2C78BE', '#FA9124', '#2CBE89', '#E13853', '#ccc'],
        legend: {
            verticalAlign: 'middle',
            layout: 'vertical',
            align: 'right',
            enabled: true,
            useHTML: true,
            itemMarginBottom: 8,
            labelFormatter: function () {
                return this.name + '<span>' + this.y + '</span>';
            },
            itemStyle: {
                color: '#3f4254',
                fontSize: '12px',
                fontWeight: 500,
            },
            title: {
                style: {
                    'font-family': ' Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
                },
            },
        },
        series: [
            {
                color: '#fff',
                colorByPoint: true,

                data: [
                    {
                        name: 'Giáo trình',
                        y: books.curriculum,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Đồ án tốt nghiệp',
                        y: books.gradutionThesis,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Sách tham khảo',
                        y: books.referenceBook,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Tạp chí',
                        y: books.magazine,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                    {
                        name: 'Đề tài khoa học',
                        y: books.scienceTopic,
                        dataLabels: {
                            enabled: true,
                            distance: -20,
                            format: '{point.percentage:.1f}%',
                        },
                    },
                ],
            },
        ],
    };
    const options3 = {
        chart: {
            type: 'spline',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height: 458,
            scrollablePlotArea: {
                scrollPositionX: 1,
            },
        },
        title: {
            text: null,
        },
        yAxis: {},
        colors: ['#2CBE89', '#E13853', '#2C78BE'],
        xAxis: {
            categories: history
                ? history.map((item) => {
                      return item.time;
                  })
                : [],
            labels: {
                step: 1,
                rotation: history?.length > 10 ? 315 : 0,
                align: history?.length > 10 ? 'right' : 'center',
            },
        },

        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                color: '#3f4254',
                fontSize: '12px',
                fontWeight: 500,
            },
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                },
            },
        },

        series: [
            {
                name: 'Mượn',
                data: history
                    ? history.map((ele) => {
                          return ele.borrowedBooks;
                      })
                    : [],
                marker: {
                    symbol: 'circlec',
                },
            },
            {
                name: 'Hết hạn',
                data: history
                    ? history.map((ele) => {
                          return ele.expiredBooks;
                      })
                    : [],
                marker: {
                    symbol: 'circle',
                },
            },
            {
                name: 'Trả',
                data: history
                    ? history.map((ele) => {
                          return ele.returnedBooks;
                      })
                    : [],
                marker: {
                    symbol: 'circle',
                },
            },
        ],

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 768,
                    },
                    chartOptions: {
                        xAxis: {
                            labels: {
                                step: 2,
                            },
                        },
                    },
                },
            ],
        },
    };
    useEffect(() => {
        BookApi.getBooks().then((res) => {
            setBooksByType({
                curriculum: res.data.filter((book) => {
                    return book.type.toLowerCase() === 'giáo trình';
                }).length,
                gradutionThesis: res.data.filter((book) => {
                    return book.type.toLowerCase() === 'đồ án tốt nghiệp';
                }).length,
                referenceBook: res.data.filter((book) => {
                    return book.type.toLowerCase() === 'sách tham khảo';
                }).length,
                magazine: res.data.filter((book) => {
                    return book.type.toLowerCase() === 'tạp chí';
                }).length,
                scienceTopic: res.data.filter((book) => {
                    return book.type.toLowerCase() === 'đề tài khoa học';
                }).length,
            });
        });
    }, []);
    useEffect(() => {
        BookApi.getBooks().then((res) => {
            setBooks({
                curriculum: res.data
                    .filter((book) => {
                        return book.type.toLowerCase() === 'giáo trình';
                    })
                    .reduce((acc, current) => {
                        return acc + current.remaining;
                    }, 0),
                gradutionThesis: res.data
                    .filter((book) => {
                        return book.type.toLowerCase() === 'đồ án tốt nghiệp';
                    })
                    .reduce((acc, current) => {
                        return acc + current.remaining;
                    }, 0),
                referenceBook: res.data
                    .filter((book) => {
                        return book.type.toLowerCase() === 'sách tham khảo';
                    })
                    .reduce((acc, current) => {
                        return acc + current.remaining;
                    }, 0),
                magazine: res.data
                    .filter((book) => {
                        return book.type.toLowerCase() === 'tạp chí';
                    })
                    .reduce((acc, current) => {
                        return acc + current.remaining;
                    }, 0),
                scienceTopic: res.data
                    .filter((book) => {
                        return book.type.toLowerCase() === 'đề tài khoa học';
                    })
                    .reduce((acc, current) => {
                        return acc + current.remaining;
                    }, 0),
            });
        });
    }, []);
    const dateVNToGlobal = (s) => {
        const date = new Date();
        date.setFullYear(s.slice(6, 10));
        date.setMonth(s.slice(3, 5) - 1);
        date.setDate(s.slice(0, 2));
        return date;
    };
    useEffect(() => {
        let begin = '';
        let end = '';
        switch (option) {
            case 0:
                setTitle('Tất cả');
                begin = 0;
                end = dateTo(dateToHasTimePrev(Date.now()));
                break;
            case 1:
                setTitle('Hôm nay');
                begin = dateTo(dateToHasTimePrev(Date.now()));
                end = dateTo(dateToHasTimePrev(Date.now()));
                break;
            case 2:
                setTitle('Hôm qua');
                begin = dateTo(dateToHasTimePrev(Date.now(), 1));
                end = dateTo(dateToHasTimePrev(Date.now()));
                break;
            case 3:
                setTitle(
                    `${dateToString(dateToHasTimePrev(Date.now(), 6))} - ${dateToString(
                        dateToHasTimePrev(Date.now()),
                    )}`,
                );
                begin = dateTo(dateToHasTimePrev(Date.now(), 6));
                end = dateTo(dateToHasTimePrev(Date.now()));
                break;
            case 4:
                setTitle(
                    `${dateToString(dateToHasTimePrev(Date.now(), 14))} - ${dateToString(
                        dateToHasTimePrev(Date.now()),
                    )}`,
                );
                begin = dateTo(dateToHasTimePrev(Date.now(), 14));
                end = dateTo(dateToHasTimePrev(Date.now()));
                break;
            case 5:
                setTitle(
                    `${dateToString(dateToHasTimePrev(Date.now(), 29))} - ${dateToString(
                        dateToHasTimePrev(Date.now()),
                    )}`,
                );
                begin = dateTo(dateToHasTimePrev(Date.now(), 29));
                end = dateTo(dateToHasTimePrev(Date.now()));
                break;
            case 6:
                setTitle(
                    `${dateToString(dateWithQuarter(Date.now(), 1).dateBegin)} - ${dateToString(
                        dateWithQuarter(Date.now(), 1).dateEnd,
                    )}`,
                );
                begin = dateTo(dateWithQuarter(Date.now(), 1).dateBegin);
                end = dateTo(dateWithQuarter(Date.now(), 1).dateEnd);
                break;
            case 7:
                setTitle(
                    `${dateToString(dateWithQuarter(Date.now(), 2).dateBegin)} - ${dateToString(
                        dateWithQuarter(Date.now(), 2).dateEnd,
                    )}`,
                );
                begin = dateTo(dateWithQuarter(Date.now(), 2).dateBegin);
                end = dateTo(dateWithQuarter(Date.now(), 2).dateEnd);
                break;
            case 8:
                setTitle(
                    `${dateToString(dateWithQuarter(Date.now(), 3).dateBegin)} - ${dateToString(
                        dateWithQuarter(Date.now(), 3).dateEnd,
                    )}`,
                );
                begin = dateTo(dateWithQuarter(Date.now(), 3).dateBegin);
                end = dateTo(dateWithQuarter(Date.now(), 3).dateEnd);
                break;
            case 9:
                setTitle(
                    `${dateToString(dateWithQuarter(Date.now(), 4).dateBegin)} - ${dateToString(
                        dateWithQuarter(Date.now(), 4).dateEnd,
                    )}`,
                );
                begin = dateTo(dateWithQuarter(Date.now(), 4).dateBegin);
                end = dateTo(dateWithQuarter(Date.now(), 4).dateEnd);
                break;
            case 10:
                setTitle(
                    `${dateToString(dateWithYear(Date.now()).dateBegin)} - ${dateToString(
                        dateWithYear(Date.now()).dateEnd,
                    )}`,
                );
                begin = dateTo(dateWithYear(Date.now()).dateBegin);
                end = dateTo(dateWithYear(Date.now()).dateEnd);
                break;
        }
        BorrowingApi.listBorrowing()
            .then((res) => {
                const arr = bookHelper.countBookByDate(begin, end, res.data);
                arr.sort((a, b) => {
                    const timeA = dateVNToGlobal(a.time);
                    const timeB = dateVNToGlobal(b.time);
                    return timeA - timeB;
                });
                setHistory([...arr]);
            })
            .catch((err) => console.log(err));
    }, [option]);
    return (
        <div className={styles.dashboard}>
            <div className="container-xl p-4">
                <Row>
                    <Col lg={4} className="mt-3">
                        <div className="mx-3 p-3 bg-white">
                            <p className="fs-5 fw-bold">Thống kê loại sách</p>
                            <PieChart highcharts={Highchart} options={option1}></PieChart>
                        </div>
                        <div className="mx-3 p-3 mt-3 bg-white">
                            <p className="fs-5 fw-bold">Thống kê số sách theo loại sách</p>
                            <div>
                                <PieChart highcharts={Highchart} options={option2}></PieChart>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} className="mt-3">
                        <div className="mx-3 p-3 h-100 bg-white">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="fs-5 fw-bold">Thống kê sách mượn,trả và hết hạn theo ngày</p>
                                <div className={styles.options}>
                                    <Dropdown>
                                        <Dropdown.Toggle as={'div'} className={styles.toggle}>
                                            <FontAwesomeIcon
                                                icon={faCalendarDay}
                                                style={{ fontSize: '1.4rem' }}
                                            ></FontAwesomeIcon>
                                            <span style={{ marginLeft: '10px' }}>Thời gian</span> : <span>{title}</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            as={'div'}
                                            className={clsx(styles.menuOption, 'border-0 shadow-lg')}
                                        >
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 0 })}
                                                onClick={() => setOption(0)}
                                            >
                                                Tất cả
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 1 })}
                                                onClick={() => setOption(1)}
                                            >
                                                Hôm nay
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 2 })}
                                                onClick={() => setOption(2)}
                                            >
                                                Hôm qua
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 3 })}
                                                onClick={() => setOption(3)}
                                            >
                                                7 ngày gần đây
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 4 })}
                                                onClick={() => setOption(4)}
                                            >
                                                15 ngày gần đây
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 5 })}
                                                onClick={() => setOption(5)}
                                            >
                                                30 ngày gần đây
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 6 })}
                                                onClick={() => setOption(6)}
                                            >
                                                Quý I
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 7 })}
                                                onClick={() => setOption(7)}
                                            >
                                                Quý II
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 8 })}
                                                onClick={() => setOption(8)}
                                            >
                                                Quý III
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 9 })}
                                                onClick={() => setOption(9)}
                                            >
                                                Quý IV
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as={'div'}
                                                className={clsx(styles.itemOption, { [styles.active]: option === 10 })}
                                                onClick={() => setOption(10)}
                                            >
                                                Năm nay
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <PieChart highcharts={Highchart} options={options3}></PieChart>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DashBoard;
