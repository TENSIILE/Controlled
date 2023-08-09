import { deepEqual } from './deep-equal';

/**@internal */
export const getDiffProperties = <T extends { [key in keyof T]: unknown }>(leftObj: T, rightObj: T) => {
  const newObjProperties = Object.keys(rightObj);

  const newProperties = newObjProperties.filter(
    prop => !deepEqual(leftObj[prop as keyof T], rightObj[prop as keyof T]),
  );

  return newProperties.reduce((acc, prop) => ({ ...acc, [prop]: rightObj[prop as keyof T] }), {});
};
