const createEmployeeRecord = (employeeData) => {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = (employeeData) => {
    return employeeData.map(data => createEmployeeRecord(data));
};

const createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

const createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

const hoursWorkedOnDate = function(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date).hour;
    const timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
};

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

const allWagesFor = function() {
    const eligibleDates = this.timeInEvents.map(function(e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0);

    return payable
};

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
};

const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(total, record) {
        return total + allWagesFor.call(record);
    }, 0);
};
