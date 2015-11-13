'use strict';
import {EOL} from 'os';
import newlineRegex from 'newline-regex';
import ngModHasDep from 'ng-mod-has-dep';

/**
 * Adds dependency to fileContents
 * @param {String} fileContents - contents to add dependenc to
 * @param {String} dependency - dependency to add
 * @return {String} - file contents with dependency added
 */
module.exports = function (fileContents, dependency) {
  // find line to add new dependency
  let lines = fileContents.split(newlineRegex)
    , angularDefinitionOpenLine = -1
    , angularDefinitionCloseLine = -1
    , i, numOfSpaces;

  if (ngModHasDep(fileContents, dependency)) {
    return fileContents;
  }

  lines.forEach((line, lineIndex) => {
    // find line with angular.module('*', [
    if (angularDefinitionOpenLine < 0 && line.indexOf('.module') > -1) {
      angularDefinitionOpenLine = lineIndex;
    }

    // find line with closing ]);
    if (angularDefinitionOpenLine > -1 && angularDefinitionCloseLine < 0 && line.indexOf(']') > -1) {
      angularDefinitionCloseLine = lineIndex;
    }
  });

  // if there is a previous dependency
  // remove new line and add a comma to the previous depdendency
  // slice at the last quote to remove the varying line endings
  if (angularDefinitionCloseLine > angularDefinitionOpenLine + 1) {
    lines[angularDefinitionCloseLine - 1] =
      lines[angularDefinitionCloseLine - 1].slice(0, lines[angularDefinitionCloseLine - 1].lastIndexOf(`'`));
    lines[angularDefinitionCloseLine - 1] = lines[angularDefinitionCloseLine - 1] + `',`;
  }

  numOfSpaces = lines[angularDefinitionCloseLine].substring(0, lines[angularDefinitionCloseLine].search(/[^ ]/)).length;

  dependency = `'${dependency}'`;

  for (i = 0; i < numOfSpaces + 2; i++) {
    dependency = ' ' + dependency;
  }

  // insert new line and dependency
  lines.splice(angularDefinitionCloseLine, 0, dependency);

  return lines.join(EOL);
};
