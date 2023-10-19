/**
 * @desc Parse sort query param and return object value
 * @param sort sort query param, e.g: "name:asc,age:desc"
 * @returns formated sort type, e.g: { name: 'asc', age: 'desc' }
 */
export const parseSort = (sort: any) => {
  if (sort === undefined) {
    return undefined;
  }

  const option: any = {};

  sort
    .toString()
    .split(',')
    .forEach((item) => {
      const [field, direction] = item.split(':');
      const [a, b] = field.split('.');

      if (a === 'locusMembers' && b) {
        if (option.locusMembers) {
          option.locusMembers[b] = direction;
        } else {
          option.locusMembers = { [b]: direction };
        }
      } else {
        option[field] = direction;
      }
    });

  return option;
};

/**
 * Validate number
 * @param value value
 * @returns numbered value or undefined
 */
export const validateNumber = (value: any) => {
  if (value === undefined) {
    return undefined;
  }

  if (isNaN(Number(value))) {
    return undefined;
  }

  return Number(value);
};

/**
 * Validate value
 * @param value value
 * @returns string value or undefined
 */
export const validateString = (value: any) => {
  if (value === undefined) {
    return value;
  }

  return value.toString();
};
