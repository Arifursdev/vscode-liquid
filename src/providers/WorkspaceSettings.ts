/* eslint-disable no-unused-vars */

import { workspace, ConfigurationTarget } from 'vscode';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { has, isNil, difference } from 'rambdax';
import prettify from '@liquify/prettify';
import parseJSON from 'parse-json';
import anymatch from 'anymatch';
import { OutputChannel } from 'providers/OutputChannel';
import { Setting, Config, Workspace } from 'types';
import * as u from 'utils';
import { Status } from 'providers/StatusBarItem';

export class WorkspaceSettings extends OutputChannel {

  /**
   * Formatting Disposals
   *
   * Disposes of the formatHandler and resets it reference
   * to `undefined` only when the handler is defined.
   */
  public dispose () {

    if (this.formatHandler) {
      this.formatHandler.dispose();
      this.formatHandler = undefined;
      this.formatIgnore.clear();
      this.formatRegister.clear();
    } else {
      this.formatIgnore.clear();
      this.formatRegister.clear();
    }

  }

  /**
   * Get Ignores
   *
   * Retrives the ignored files from the `liquid.format.ignore` or `ignore`
   * property values. When configuration is updated the `ignore` state
   * reference is updated and output is sent informing upon changes.
   */
  public getIgnores (rules: string[]) {

    const current = this.ignoreList;

    if (u.isArray(rules)) {

      if (this.isReady && rules.length > 0) {

        if (current.length > 0) {
          for (const remove of difference(current, rules)) {
            this.info('Ignore path removed: ' + remove);
          }
        }

        for (const added of difference(rules, current)) {
          this.info('Ignore path created: ' + added);
        }

      }

      this.ignoreList = rules;

      if (rules.length === 0) {

        for (const remove of difference(current, rules)) {
          this.info('Ignore path removed: ' + remove);
        }

        this.ignoreMatch = null;

      } else {

        this.ignoreMatch = anymatch(this.ignoreList);
      }

    }
  }

  /**
   * Get Workspace Target
   *
   * Returns the workspace/user target to use and augments
   * the `target` state reference. Returns the workspace property
   * name to use when inspecting with the `workspace.getConfiguration()`
   * method to check/update in~language settings.
   */
  public getTarget () {

    const liquid = workspace.getConfiguration('liquid');

    this.configTarget = liquid.has('settings.target')
      ? liquid.get('settings.target') === 'workspace'
        ? ConfigurationTarget.Workspace
        : ConfigurationTarget.Global
      : ConfigurationTarget.Workspace;

    if (this.configTarget === ConfigurationTarget.Global) {
      this.warn('Consider using "workspace" instead of "user" setting target');
      return 'globalValue';
    }

    return 'workspaceValue';

  }

  /**
   * Get Languages
   *
   * Augments the `languages` object and aligns language values
   * using `sissel.shopify-liquid` in~language `editor.defaultFormatter`.
   */
  public getLanguages () {

    const target = this.getTarget();

    for (const id in this.languages) {
      if (u.isDefaultFormatter(`[${id}]`, target) && this.languages[id] === false) {
        this.languages[id] = true;
        this.selector.active.push({ language: id, scheme: 'file' });
        this.info('Prettify was made the default formatter of ' + id);
      }
    }

  };

  /**
   * Get Settings
   *
   * Shortcut handler for checking workspace settings to determine
   * the current formatting status and options. Optionally accepts
   * a `config` enum parameter which can be used to re-assignment
   * before passing to `getWorkspace()` for checks.
   *
   * > **Note:** This function will re-assign Prettify options when
   * config type is `Config.Workspace` and formatting is enabled.
   */
  public getSettings (config?: Config) {

    if (u.isNumber(config)) this.configMethod = config;

    const canFormat = this.canFormat;
    const settings = this.getWorkspace();

    if (this.canFormat === false) {
      this.status.disable();
      this.info('Disabled formatting');
    } else if ((this.canFormat !== canFormat) || (this.status.state === Status.Disabled && this.canFormat)) {
      this.status.enable();
      this.info('Enabled formatting');
    }

    if (this.canFormat && this.configMethod === Config.Workspace) {
      prettify.options(this.prettifyRules);
    }

    return settings;

  }

  /**
   * Get Workspace
   *
   * Walks over the editor settings and determines the configuration defined.
   * Returns an enum that informs upon state of the editors options
   */
  public getWorkspace () {

    const liquid = workspace.getConfiguration('liquid');
    const engine = liquid.get<Workspace.Engine>('engine');
    const completions = liquid.get<Workspace.Completion>('completion');
    const validate = liquid.get<Workspace.Validate>('validate');
    const hovers = liquid.get<Workspace.Hover>('hover');
    const target = liquid.get<Workspace.Target>('settings.target');
    const format = liquid.get<Workspace.Format>('format');
    const baseUrl = liquid.get<string>('config.baseUrl');
    const rules = liquid.get('rules');

    if (u.isBoolean(format) || u.isObject(rules)) {

      if (this.deprecatedConfig) {
        this.error('Deprecated settings are still existent in workspace');
      }

      return Setting.DeprecatedWorkspaceSettings;

    }

    // No configuration defined for the extension
    if (
      isNil(target) &&
      isNil(format) &&
      isNil(baseUrl) &&
      isNil(engine) &&
      isNil(completions) &&
      isNil(validate) &&
      isNil(hovers)
    ) return Setting.WorkspaceUndefined;

    if (u.isString(engine) && this.engine !== engine) this.engine = engine;

    /* -------------------------------------------- */
    /* COMPLETIONS                                  */
    /* -------------------------------------------- */

    if (u.isObject(completions)) {

      if (has('tags', completions)) {
        this.canComplete.tags = completions.tags;
        if (completions.tags) {
          this.info('Completions are enabled for: tags');
        } else {
          this.info('Completions are disabled for: tags');
        }
      }

      if (has('filters', completions)) {
        this.canComplete.filters = completions.filters;
        if (completions.filters) {
          this.info('Completions are enabled for: filters');
        } else {
          this.info('Completions are disabled for: filters');
        }
      }

      if (has('logical', completions)) {
        this.canComplete.logical = completions.logical;
        if (completions.logical) {
          this.info('Completions are enabled for: logicals');
        } else {
          this.info('Completions are disabled for: logicals');
        }
      }

      if (has('objects', completions)) {
        if (this.engine === 'shopify') {
          this.canComplete.objects = completions.objects;
          if (completions.objects) {
            this.info('Completions are enabled for: objects');
          } else {
            this.info('Completions are disabled for: objects');
          }
        } else {
          if (completions.objects) {
            this.warn('Completion for objects will not work in Liquid Standard');
          }
        }
      }

      if (has('section', completions)) {
        if (this.engine === 'shopify') {
          this.canComplete.section = completions.section;
          if (completions.section) {
            this.info('Completions are enabled for: sections');
          } else {
            this.info('Completions are disabled for: sections');
          }
        } else {
          if (completions.section) {
            this.warn('Completion for sections will not work in Liquid Standard');
          }
        }
      }

      if (has('schema', completions)) {
        if (this.engine === 'shopify') {
          this.canComplete.schema = completions.schema;
          if (completions.schema) {
            this.info('Completions are enabled for: {% schema %}');
          } else {
            this.info('Completions are disabled for: {% schema %}');
          }
        } else {
          if (validate.schema) {
            this.warn('Completion for {% schema %} will not work in Liquid Standard');
          }
        }
      }

    }

    /* -------------------------------------------- */
    /* VALIDATIONS                                  */
    /* -------------------------------------------- */

    if (u.isObject(validate)) {
      if (has('schema', validate)) {
        if (this.engine === 'shopify') {
          this.canValidate.schema = validate.schema;
          if (validate.schema) {
            this.info('Validations are enabled for: {% schema %}');
          } else {
            this.info('Validations are disabled for: {% schema %}');
          }
        } else {
          if (validate.schema) {
            this.warn('Validations for {% schema %} will not work in Liquid Standard');
          }
        }
      }
    }

    /* -------------------------------------------- */
    /* HOVERS                                       */
    /* -------------------------------------------- */

    if (u.isObject(hovers)) {

      if (has('tags', hovers)) {
        this.canHover.tags = hovers.tags;
        if (completions.tags) {
          this.info('Hovers are enabled for: tags');
        } else {
          this.info('Hovers are disabled for: tags');
        }
      }

      if (has('filters', hovers)) {
        this.canHover.filters = hovers.filters;
        if (completions.filters) {
          this.info('Hovers are enabled for: filters');
        } else {
          this.info('Hovers are disabled for: filters');
        }
      }

      if (has('schema', hovers)) {
        if (this.engine === 'shopify') {
          this.canComplete.schema = hovers.schema;
          if (hovers.schema) {
            this.info('Hovers are enabled for: {% schema %}');
          } else {
            this.info('Hovers are disabled for: {% schema %}');
          }
        } else {
          if (hovers.schema) {
            this.warn('Hovers for {% schema %} will not work in Liquid Standard');
          }
        }
      }

    }

    /* -------------------------------------------- */
    /* BASE URL                                     */
    /* -------------------------------------------- */

    if (u.isString(baseUrl)) {
      const newRoot = join(this.rootPath, baseUrl);
      if (newRoot !== this.rootPath && existsSync(newRoot)) {
        this.baseUrl = baseUrl;
        this.rootPath = newRoot;
      }
    } else if (isNil(baseUrl) && u.isString(this.baseUrl)) {
      this.baseUrl = null;
      this.rootPath = this.fsPath;
    }

    /* -------------------------------------------- */
    /* FORMAT                                       */
    /* -------------------------------------------- */

    if (u.isObject(format)) {

      let def: boolean = this.configMethod === Config.Workspace;
      let opt: Setting = Setting.WorkspaceUndefined;

      // If first run, we will assert editor settings is being used
      if (isNaN(this.configMethod)) {
        this.configMethod = Config.Workspace;
        def = true;
      }

      if (has('ignore', format)) {
        this.getIgnores(format.ignore);
        opt = Setting.WorkspaceDefined;
      } else if (def) {
        this.getIgnores([]);
      }

      // lets determine if formatting is enabled or not
      if (has('enable', format) && u.isBoolean(format.enable)) {
        this.canFormat = format.enable;
        opt = Setting.WorkspaceDefined;
      }

      // if we are using editor settings lets apply prettify rules
      if (def) this.prettifyRules = u.rulesNormalize(format);

      if (this.deprecatedConfig && opt === Setting.WorkspaceUndefined) {
        this.deprecatedConfig = false;
        this.languageDispose();
      }

      return opt;

    }

    return Setting.WorkspaceUndefined;

  };

  /**
   * Get Package JSON
   *
   * Checks for the existence of a `package.json` files
   * and then looks for a _prettify_ property. When detected
   * the extension will use the rules provided to the property.
   */
  public async getPackage () {

    this.packagePath = join(this.rootPath, 'package.json');

    const path = await u.pathExists(this.packagePath);
    if (!path) return Setting.PackageJsonUndefined;

    try {

      const read = await readFile(this.packagePath);
      const pkg = parseJSON(read.toString());

      if (!has('prettify', pkg)) return Setting.PrettifyFieldUndefined;

      if (!u.isObject(pkg.prettify)) {

        this.error('Invalid configuration type provided in package.json', [
          'The "prettify" field expects an {} (object) type to be provided but instead recieved',
          `${typeof pkg.prettify} type which is invalid. You need to use the right configuration.`
        ]);

        return Setting.PrettifyFieldInvalid;
      }

      if (has('ignore', pkg.prettify)) {
        this.getIgnores(pkg.prettify.ignore);
      } else if (this.configMethod === Config.Package) {
        this.getIgnores([]);
      }

      this.configMethod = Config.Package;
      this.prettifyRules = u.rulesNormalize(pkg.prettify);

      if (this.canFormat === null) this.canFormat = true;

      return Setting.PrettifyFieldDefined;

    } catch (e) {
      this.catch('The package.json file could not be parsed', e);
    }

    return Setting.PackageJsonError;

  };

  /**
   * Get Liquidrc
   *
   * Checks for the existence of a `.liquirc` file and parses it.
   * Determines the _type_ of file and reasons with it accordingly.
   * When a `liquidrc` file is detected then it will run precedence over
   * all over configuration options.
   *
   * Returns a number based value which indicated what occured in the parse:
   */
  public async getLiquidrc () {

    if (isNil(this.liquidrcPath)) {

      const path = await u.hasLiquidrc(this.rootPath);
      if (!path) return Setting.LiquidrcUndefined;

      this.configMethod = Config.Liquidrc;
      this.liquidrcPath = path;

    } else {
      const exists = await u.pathExists(this.liquidrcPath);
      if (!exists) return Setting.LiquidrcUndefined;
    }

    try {

      const read = await readFile(this.liquidrcPath, { encoding: 'utf8' });
      const rules = u.jsonc(read);

      if (!u.isObject(rules)) {

        this.error('Invalid configuration type provided in .liquidrc', [
          'The .liquirc file expects an {} (object) type to be provided but instead recieved',
          `${typeof rules} type which is invalid. You can generate a .liquidrc file via the command palette`
        ]);

        return Setting.LiquidrcInvalidRules;
      }

      if (u.hasDeprecatedSettings(rules)) {
        this.canFormat = false;
        this.status.error('Your .liquidrc file is using a deperecated configuration');
        this.error('Deprecated configuration provided in .liquidrc file', [
          'You are now using v3.0.0 of the Liquid extension and the old configuration is no longer',
          'supported. You need to fix and align with the new configuration.'
        ]);

        return Setting.DeprecatedLiquidrc;
      }

      if (has('ignore', rules)) {
        this.getIgnores(rules.ignore);
      } else if (this.ignoreList.length > 0) {
        this.getIgnores([]);
      }

      this.prettifyRules = u.rulesNormalize(rules);

      if (this.canFormat === null) this.canFormat = true;

      return Setting.LiquidrcDefined;

    } catch (e) {
      this.catch('The .liquidrc configuration file could not be parsed', e);
    }

    return Setting.LiquidrcError;

  };

}
