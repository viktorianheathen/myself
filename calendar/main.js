class Day extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (<li className="day">
                    {this.props.start > this.props.index ?
                        <div className="dayInner beforeMonth" data-events={this.props.eventsCounter != 0 ? true : false} data-i={this.props.index}>
                            <div class="dayTitle">
                                {this.props.index < 7 && <span className="weekday">{this.props.weekDay},</span>} <span>{this.props.dayNumber}</span>
                            </div>
                            <div className="dayEvents">
                                Прошлый месяц
                            </div>
                        </div>
                        :
                        <div className="dayInner" data-events={this.props.eventsCounter != 0 ? true : false}>
                            <div class="dayTitle">
                                {this.props.index < 7 && <span className="weekday">{this.props.weekDay},</span>} <span>{this.props.dayNumber}</span>
                            </div>
                            {
                                this.props.eventsDay.length !=0 &&
                                <div className="dayEvents">
                                    <ul className="dayEvents__list">
                                        {
                                            this.props.eventsDay.map(function(thEvent) {
                                                return (
                                                    <li className="dayEvents__item">
                                                        <div className="eventTitle">{thEvent.name}</div>
                                                        <div className="eventDesc">
                                                            {thEvent.desc}
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                    }
                </li>
                )
            }
}

class Body extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            days: this.props.days,
            start: this.props.start,
            beforeDays: this.props.beforeDays
        }
    }
    render(){
        return (
            <div className="calendarBody">
                <div className="calendarContainer">
                    <div className="calendarTodayMonth">
                        <div className="calendarTodayMonth__label">{this.props.month} {this.props.year}</div>
                    </div>
                    <ul className="dayList" cellpadding="0" cellspacing="0">
                        {
                            this.state.days.map((item, i) => {
                                return <Day key={i} start={this.state.start} dayNumber={this.state.start > i ? this.state.beforeDays + i : item.number - this.state.start} index={i} weekDay={item.weekDay} eventsDay={item.events} eventsCounter={item.eventsCount}/>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

class Header extends React.Component {
    render(){
        return (
            <div className="calendarHeader">
                <div className="calendarContainer">
                    <div className="calendarHeaderInner">
                        <div className="calendarBtnSet">
                            <button type="button" class="calendarBlueBtn">Добавить</button>
                            <button type="button" class="calendarBlueBtn">Обновить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props){
        super(props)
        var nowDate = new Date(2014,7,14),
            today = nowDate.getDate(),
            currentMonth = nowDate.getMonth(),
            currentYear = nowDate.getFullYear(),
            temp = new Date(currentYear, currentMonth+1, 0),
            thMouthFirst = new Date(currentYear, currentMonth, 0).getDay() + 1,
            thMFirsWeekday = thMouthFirst - 1,
            daysCount = temp.getDate(),
            daysArr = [],
            weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            transMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayCounter = 0,
            beforeDays = new Date(currentYear, currentMonth, 0).getDate(),
            beforeDaysLast = beforeDays - thMFirsWeekday + 1;

            console.log(beforeDays);

            for(var i = 1; i <= daysCount + thMFirsWeekday; i++)
                {
                    if(i % 7 == 0)
                    {
                        dayCounter = 0;
                    }
                    else
                    {
                        dayCounter++;
                    }
                    var weekday = weekDays[dayCounter];
                    if(i % 5 == 0)
                    {
                        var el = {
                            eventsCount: 1,
                            events: [
                                {
                                    name: 'Выпить',
                                    desc: 'Выпить с поцанами в пятницу'
                                }
                            ],
                            number: i,
                            weekDay: weekday
                        };
                    }
                    else
                    {
                        var el = {
                            eventsCount: 0,
                            events: [],
                            number: i,
                            weekDay: weekday
                        };
                    }

                    daysArr.push(el);

                }

            this.state = {
                days: daysArr,
                start: thMFirsWeekday,
                daysBefore: beforeDaysLast,
                thisMonth: transMonths[currentMonth],
                thisYear: currentYear
            }

    }
    render(){
        return (
            <div className="calendar">
                <Header />
                <Body beforeDays={this.state.daysBefore} days={this.state.days} start={this.state.start} month={this.state.thisMonth} year={this.state.thisYear}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('App'));
