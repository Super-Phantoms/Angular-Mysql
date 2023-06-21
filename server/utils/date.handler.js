function getLastDayOfMonth(year, month) {
    // Create a new Date object with the next month's first day
    const nextMonth = new Date(year, month + 1, 1);
  
    // Subtract one day from the next month's first day to get the last day of the given month
    const lastDay = new Date(nextMonth.getTime() - 1);
  
    // Return the date component of the last day
    return lastDay.getDate();
}

module.exports = {
    getLastDayOfMonth
}