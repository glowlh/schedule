class School {

  constructor(options) {
    if (!(options instanceof Object)) {
      return;
    }

    this.name = options.name;
    this.count = options.count;
  }
}

export default School;
