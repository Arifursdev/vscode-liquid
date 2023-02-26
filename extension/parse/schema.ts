import { Char, Complete, SchemaSectionTag, Token } from 'types';
import { CompletionItem, CompletionItemKind } from 'vscode';
import { kind, mdSchema } from 'parse/helpers';

/**
 * Get Schema Block Types
 *
 * Schema block type completions
 */
export function getSchemaBlockTypeCompletions (schema: SchemaSectionTag, type: string) {

  return schema.blocks.map(block => ({
    label: block.type,
    documentation: block.name,
    kind: CompletionItemKind.TypeParameter,
    preselect: true,
    insertText: type === 'string' ? `"${block.type}"` : block.type
  }));

}

/**
 * Get Schema Settings
 *
 * Schema settings completions
 */
export function getSchemaSettingsCompletions (schema: SchemaSectionTag) {

  const items: CompletionItem[] = [];

  for (const setting of schema.settings) {

    if (setting.id === undefined) continue;

    items.push({
      label: setting.id,
      insertText: setting.id,
      detail: `${setting.type} (settings)`,
      preselect: true,
      documentation: mdSchema(setting as any),
      kind: kind(setting.type)
    });

  }

  return items;
}

/**
 * Get Schema Block Settings
 *
 * Schema blocks completions
 */
export function getSchemaBlockSettingsCompletions (schema: SchemaSectionTag, type: string) {

  const block = schema.blocks.find(block => block.type === type);
  const item: CompletionItem[] = [];

  if (!('settings' in block)) return item;

  for (const setting of block.settings) {

    if (setting.id === undefined) continue;

    item.push({
      label: setting.id,
      insertText: setting.id,
      detail: `${setting.type} (${type})`,
      preselect: true,
      documentation: mdSchema(setting as any),
      kind: kind(setting.type)
    });

  }

  return item;

}

/**
 * Get Section Completions
 *
 * Generates completion items to provided on Liquid tokens
 */
export function getSectionCompletions (
  schema: Complete.ISchema,
  prop: Token,
  type?: string
) {

  if (!schema) return null;

  const parsed = schema.parse();

  if (prop === Token.SchemaSettings && 'settings' in parsed) {
    return getSchemaSettingsCompletions(parsed);
  }

  if ('blocks' in parsed) {

    if (prop === Token.SchemaBlockType) {
      return getSchemaBlockTypeCompletions(parsed, type);
    }

    if (prop === Token.SchemaBlock) {
      return getSchemaBlockSettingsCompletions(parsed, type);
    }
  }

  return null;

}

/**
 * Get Section Scope
 *
 * Obtains regional based scope, based on the last
 * known schema block type
 */
export function getSectionScope (content: string, offset: number) {

  const string = content.slice(0, offset);
  const match = string.match(/\bcase\b\s+\bblock\.type|block\.type\s*==\s*[^"']/g);

  if (match === null) return null;

  const type = match.pop();
  const last = string.lastIndexOf(type) + type.length;

  if (type.startsWith('case')) {

    const cond = string.lastIndexOf('when', offset) + 4;
    const when = string.slice(cond).trimStart();

    return (when.charCodeAt(0) !== Char.DQO && when.charCodeAt(0) !== Char.SQO)
      ? null
      : when.slice(1, when.indexOf(when[0], 1));

  }

  return string.slice(last + 1, string.indexOf(type[type.length - 1], last) - 1);

}