import Schedule from './schedule/controller';

const schedule = new Schedule();

schedule.classrooms.add({
  name: 'Blue whale',
  count: 25,
  description: ''
});
schedule.schools.add({
  name: '1-SCHOOL',
  count: 12
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
  schools: ['1-SCHOOL'],
  teacher: 'John',
  classroom: 'Blue whale',
  dateFrom: '2017-04-02T00:00',
  dateTo: '2017-04-02T02:00',
});

schedule.lectures.add({
  name: 'Lecture 3',
  schools: ['1-SCHOOL'],
  teacher: 'John',
  classroom: 'Blue whale',
  dateFrom: '2017-04-02T20:00',
  dateTo: '2017-04-02T21:00',
});
const date = {
  from: '2017-02-02T00:00',
  to: '2017-04-02T12:00'
};

console.dir(schedule.lectures.findByDate(date, '1-SCHOOL'));
