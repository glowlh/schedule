import Schedule from './schedule/store/controller';

const schedule = new Schedule();

schedule.classrooms.add({
  name: 'Blue whale',
  count: 50,
  description: 'Amazing!'
});

schedule.schools.add({
  name: '1-SCHOOL',
  count: 15,
});

schedule.schools.add({
  name: '2-SCHOOL',
  count: 20,
});

schedule.teachers.add({
  name: 'John',
  description: 'super teacher'
});

schedule.lectures.add({
  name: 'Lecture 1',
  schools: ['1-SCHOOL'],
  teacher: 'John',
  classroom: 'Blue whale',
  dateFrom: '2017-04-02T11:00',
  dateTo: '2017-04-02T12:00',
});

schedule.lectures.add({
  name: 'Lecture 2',
  schools: ['2-SCHOOL'],
  teacher: 'John',
  classroom: 'Blue whale',
  dateFrom: '2017-04-02T00:00',
  dateTo: '2017-06-02T02:00',
});

schedule.lectures.add({
  name: 'Lecture 3',
  schools: ['1-SCHOOL'],
  teacher: 'John',
  classroom: 'Blue whale',
  dateFrom: '2017-04-02T20:00',
  dateTo: '2017-05-02T21:00',
});

const date = {
  from: '2010-02-02T00:00',
  to: '2020-04-02T12:00'
};

// console.dir(schedule.lectures.findByDate(date, '1-SCHOOL'));
