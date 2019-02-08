'use strict';

/** 
 * @returns {(Object|Array)}
 * @param {string} input
 */
const parse = (input) => {
  const str = input
    .trim()
    .replace(/\n/gi, '');

  const tokens = {
    'null': null,
    'false': false,
    'true': true,
  };

  const regexs = {
    obj: /^\{(?:"(\S+)":(\S+))+\}$/
  };

  const parseObj = (str) => {
    const contents = str.match(regexs.obj);

  };

  const parseArray = (str) => {

  };

  const parseOther = (str) => {

  };

  parseObj(str);

};
