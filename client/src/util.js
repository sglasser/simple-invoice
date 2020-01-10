import moment from 'moment';

export function getYears () {
  let years = [];
  const currentYear = moment().get('year');
  years.push(currentYear)
  for(let i = 1; i < 5; i++) {
      years.push(currentYear - i);
  }
  return years;
}