class Lecture {

  constructor(options) {
    if (!(options instanceof Object)) {
      return;
    }

    ({
      name: this.name,
      schools: this.schools,
      teacher: this.teacher,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      classroom: this.classroom,
    } = options);
  }
}

export default Lecture;
