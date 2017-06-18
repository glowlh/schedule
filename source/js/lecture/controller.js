class Lecture {

  constructor(options) {
    if (!(options instanceof Object)) {
      return;
    }

    ({
      name: this.name,
      schools: this.schools,
      teacher: this.teacher,
      classroom: this.classroom,
    } = options);

    this.dateFrom = new Date(options.dateFrom);
    this.dateTo = new Date(options.dateTo);
  }
}

export default Lecture;
