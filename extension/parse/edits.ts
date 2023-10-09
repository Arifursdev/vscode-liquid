import {
  Position,
  Range,
  SnippetString,
  TextEdit
} from 'vscode';

/**
 * Insert Tag Delimiters
 *
 * Returns a text edit for inserting a Liquid tag type token.
 * For example:
 *
 * ```liquid
 *
 * {% # User types in percent character %}
 *
 * %
 *
 * {% # User selects the tag and upon resolving %}
 *
 * {% tag %}
 *
 * ```
 */
export function insertTag (position: Position) {

  return [
    TextEdit.insert(new Position(position.line, position.character - 1), '{')
  ];

}

/**
 * Insert Space
 *
 * Inserts a single whitespace character before the applied completion
 */
export function insertSpace (position: Position) {

  return [
    TextEdit.insert(position, ' ')
  ];

}

/**
 * Insert Translate Filter
 *
 * Inserts a translate filter to locale object tags
 */
export function insertTranslate (position: Position, token: string): (prop: string) => {
  insertText: SnippetString,
  range: {
    inserting: Range;
    replacing: Range;
  }
} {

  return (label: string) => {

    if (!/\s*\|\s*t:?/.test(token)) {

      const begin = token.search(/['"]/);
      const quote = token[begin];

      return {
        insertText: new SnippetString(`${label}$1${quote} | t$0 `),
        range: {
          replacing: new Range(position, position),
          inserting: new Range(position, new Position(position.line, position.character + 1))
        }
      };
    }

    return {
      insertText: new SnippetString(`${label}`),
      range: null
    };

  };

}
