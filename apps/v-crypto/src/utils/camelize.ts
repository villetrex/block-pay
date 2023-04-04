import camelCase from 'lodash.camelcase';
import transform from 'lodash.transform';

export const convertObjectKeysToCamelCase = (obj: Record<string, any>) => {
  return transform(
    obj,
    (acc, value, key, target) => {
      const camelKey = Array.isArray(target) ? key : camelCase(key);
      if (value === null) {
        return acc;
      } else if (Array.isArray(value)) {
        acc[camelKey] = value.map(convertObjectKeysToCamelCase);
      } else if (typeof value === 'object') {
        acc[camelKey] = convertObjectKeysToCamelCase(value);
      } else {
        acc[camelKey] = value;
      }
    },
    {} as Record<string, any>,
  );
};
