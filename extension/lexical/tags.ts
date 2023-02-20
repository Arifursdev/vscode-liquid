import { entries, keys } from '../utils';
import { basename, join } from 'node:path';
import { Filter, Tags, IObject, Type, Types, liquid, IProperty, $ } from '@liquify/specs';
import * as md from '../completions/helpers/markdown';
import { path } from 'rambdax';
import {
  CompletionItemKind,
  CompletionItem,
  SnippetString,
  CompletionItemTag,
  Position,
  Range,
  TextEdit,
  Uri
} from 'vscode';
import { SettingsData } from 'types';

/**
 * Get Logical Completions
 *
 * Generates the logical conditional based completion
 * items used within control type tokens.
 */
export function getOperatorCompletions (items: CompletionItem[]): CompletionItem[] {

  return items;

}

/**
 * Set Object Type
 *
 * Sets the object completion item kind symbol.
 * This is also used for filtering completions so
 * otherwise invalid items don't show up at certain entries.
 */
export function getItemKind (type: any): CompletionItemKind {

  if (type === Type.constant) {
    return CompletionItemKind.Constant;
  }

  if (type === Type.array) {
    return CompletionItemKind.Field;
  }

  if (type === Type.object) {
    return CompletionItemKind.Module;
  }

  // @ts-ignore
  if (type === Type.data) return CompletionItemKind.Value;

};

export function getDetailName (type: Types.Basic | Type) {

  if (type === Type.array) return 'array';
  else if (type === Type.boolean) return 'boolean';
  else if (type === Type.number) return 'number';
  else if (type === Type.string) return 'start';
  else if (type === Type.object) return 'object';
  else if (type === Type.unknown) return 'unknown';

  return 'any';
}

/**
 * Get Schema Completions
 *
 * Generates the completion items for the `{% schema %}` code block
 * region. The items and cherry picked from the JSON Language Service
 * parsed JSON content.
 */
export function getSchemaCompletions (
  slice: number,
  line: number,
  character: number,
  items: CompletionItem[]
): CompletionItem[] {

  return items.map(({
    label,
    documentation,
    textEdit,
    kind
  }: CompletionItem & { documentation: { value: string } }) => {

    const range = {
      inserting: new Range(
        new Position(line, character),
        new Position(line, textEdit.range.end.character)
      ),
      replacing: new Range(
        new Position(line, character),
        new Position(line, textEdit.range.end.character)
      )
    };

    return {
      label,
      kind,
      insertText: new SnippetString(textEdit.newText.slice(slice)),
      documentation: md.string(documentation.value),
      range
    };

  });

}

/**
 * Get File Completions
 *
 * Generates file names of snippets when referencing them via
 * `{% render %}` type tags.
 */
export function getFileCompletions (files: Set<Uri>): CompletionItem[] {

  return Array.from(files).map((file): CompletionItem => {

    const { fsPath } = file;
    const label = basename(fsPath, '.liquid');
    const location = fsPath.split('/');
    const filename = location.pop();
    const dirname = location.pop();

    return {
      label,
      kind: CompletionItemKind.File,
      insertText: new SnippetString(label),
      preselect: true,
      detail: join(dirname, filename),
      documentation: md.string(`[${label}.liquid](${file.fsPath})`)
    };

  });

}

export function getLocaleSchemaSetting (key: string) {

  const locale: any = null;

  if ($.liquid.data.store.has('locales_schema')) {
    return path(key.slice(2), $.liquid.data.store.get('locales_schema'));
  }

  return locale || key;
}

/**
 * Get Settings Completions
 *
 * Generates the `settings_data.json` completions following the
 * `settings.*` object.
 */
export function getSettingsCompletions (uri: string, data: SettingsData[]) {

  const items = [];
  const reference = `[${basename(uri)}](${uri})`;
  const location = uri.split('/');
  const filename = location.pop();
  const objects:{ [prop: string]: IProperty } = {};
  const locale = $.liquid.data.store.get('locales_schema');

  for (const setting of data) {

    if (setting.name === 'theme_info') continue;
    if (setting.name.startsWith('t:settings_schema.')) {

      const prop = setting.name.slice(18, setting.name.indexOf('.', 18));

      objects[prop] = <IProperty>{
        global: true,
        scope: 'settings',
        type: 'object',
        summary: `${prop} (${filename})`,
        description: [
          `**Setting**: \`${prop}\`\n\n`,
          `${setting.settings.length} available fields\n\n`,
          `${reference}`
        ].join(''),
        properties: {}
      };

      for (const type of setting.settings) {
        if (type.id) {

          const label = type.label.startsWith('t:')
            ? path(type.label.slice(2), locale) || type.label
            : type.label;

          objects[prop].properties[type.id] = <IProperty>{
            type: type.type,
            summary: `${type.type} (default: ${type.default})`,
            scope: 'settings',
            description: [
              label ? `**${label}**\n\n` : '',
              type.info ? path(type.info.slice(2), locale) + '\n\n' || '' : '',
              reference
            ].join('')
          };
        }
      }

    } else {

      objects[setting.name] = <IProperty>{
        global: true,
        type: 'object',
        scope: 'settings',
        summary: `${setting.name} (${filename})`,
        description: `${setting.settings.length} available fields\n\n${reference}`,
        properties: {}
      };

      for (const type of setting.settings) {
        if (type.id) {

          const label = type.label.startsWith('t:')
            ? path(type.label.slice(2), locale) || type.label
            : type.label;

          const info = type.info.startsWith('t:')
            ? path(type.info.slice(2), locale) || type.label
            : type.info;

          objects[setting.name].properties[type.id] = <IProperty>{
            type: type.type,
            summary: `${type.type} (${type.default})`,
            scope: 'settings',
            description: [
              `**Label**: ${label}\n\n`,
              type.info ? info + '\n\n' : '',
              reference
            ].join('')
          };

        }
      }
    }
  }

  liquid.shopify.objects.settings.properties = objects;

  return liquid.shopify.objects;
};

/**
 * Get Locale Completions
 *
 * Generates starting property completions for Shopify locales.
 * Locales are `key > value` objects. This function will prepare
 * the entires for traversal by exposing keys of the locale file.
 */
export function getLocaleCompletions (
  uri: string,
  items: { [key: string]: object },
  additionalTextEdits: TextEdit[] = []
): CompletionItem[] {

  const reference = `[${basename(uri)}](${uri})`;
  const location = uri.split('/');
  const filename = location.pop();
  const dirname = location.pop();
  const detail = join(dirname, filename);

  return entries(items).map(([ label, props ]): CompletionItem => {

    const object = typeof props === 'object';
    const value = object
      ? keys(props).length
      : typeof props[label] === 'object'
        ? keys(props[label]).length : props;

    const documentation = object
      ? md.lines(`**${label}**`, `${value} available fields`, reference)
      : md.lines(`**${label}**`, `*\`${value}\`*`, reference);

    return {
      label,
      kind: CompletionItemKind.Module,
      detail,
      insertText: new SnippetString(label),
      additionalTextEdits,
      documentation
    };

  });
};

/**
 * Get Object Completions
 *
 * Generates the object completions to be used. This logic is
 * partially lifted from the specs. It's a temporary solution
 * as this is handled in Liquify.
 */
export function getObjectCompletions (items: IObject): CompletionItem[] {

  return entries(items).map(([ label, object ]: [ string, IObject]): CompletionItem => {

    return {
      label,
      tags: object.deprecated
        ? [ CompletionItemTag.Deprecated ]
        : [],
      detail: getDetailName(object.type),
      kind: object.const
        ? CompletionItemKind.Constant
        : getItemKind(object.type),
      documentation: md.string(object.description)
    };

  });
};

/**
 * Get Filter Completions
 *
 * Generates the Filter completions to be used. This logic is
 * partially lifted from the specs. It's a temporary solution
 * as this is handled in Liquify.
 */
export function getFilterCompletions (items: Filter): CompletionItem[] {

  return entries(items).map(([
    label,
    {
      description,
      deprecated = false,
      reference = null,
      snippet
    }
  ]): CompletionItem => {

    const insertText = new SnippetString(snippet || label);

    return {
      label,
      kind: CompletionItemKind.Value,
      tags: deprecated ? [ CompletionItemTag.Deprecated ] : [],
      insertText,
      preselect: true,
      documentation: md.string(description, reference)
    };
  });
}

/**
 * Get Tag Completions
 *
 * Generates the tag completions to be used. This tag completions
 * are generated at runtime and the `items` parameter expects a Liquid
 * specification reference structure.
 */
export function getTagCompletions (items: Tags): CompletionItem[] {

  return entries(items).map(([
    label,
    {
      description,
      reference,
      deprecated = false,
      singleton = false,
      snippet = '$1'
    }
  ]): CompletionItem => {

    const insertText = label === 'else'
      ? new SnippetString(` ${label} %}$0`)
      : label === 'liquid'
        ? new SnippetString(` ${label} ${snippet} %}$0`)
        : singleton
          ? new SnippetString(` ${label} ${snippet} %}$0`)
          : new SnippetString(` ${label} ${snippet} %} $0 {% end${label} %}`);

    return {
      label,
      kind: CompletionItemKind.Keyword,
      tags: deprecated ? [ CompletionItemTag.Deprecated ] : [],
      insertText,
      preselect: true,
      documentation: md.string(description, reference)
    };

  });

}
