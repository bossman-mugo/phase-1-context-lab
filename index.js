function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],

      hoursWorkedOnDate: function(date) {
        const timeInEvent = this.timeInEvents.find((event) => event.date === date);
        const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

        if (!timeInEvent || !timeOutEvent) {
          return 0;
        }

        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

        return hoursWorked;
      },
    };
  }

  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }

  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date
    };
    this.timeInEvents.push(timeInEvent);
    return this;
  }

  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }

  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

    if (!timeInEvent || !timeInEvent.hour || !timeOutEvent || !timeOutEvent.hour ) {
      return 0;
    }

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked;
  }

  function wagesEarnedOnDate(date) {
    const hoursWorked = this.hoursWorkedOnDate(date);
    const payOwed = hoursWorked * this.payPerHour;

    return payOwed;
  }

  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }

  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPay, employee) => totalPay + wagesEarnedOnDate.call(employee), 0);
  }







/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

