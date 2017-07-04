import Scheme from '../../validator.scheme/controller';

class ClassroomScheme extends Scheme {

  valid(data) {
    if (!(data instanceof Object)) {
      console.error(`classroom data ${data} is not an Object`);
      return;
    }

    if (typeof data.name !== 'string') {
      console.error(`classroom name ${data.name} is not a String`);
      return;
    }

    if (typeof data.count !== 'number') {
      console.error(`classroom count ${data.count} is not a Number`);
      return;
    }

    return true;
  }
}

export default ClassroomScheme;
