<pre><code><strong>🩸 <i>LIQUIFY ~ INFORMATION ON THE FUTURE RELEASE</i></strong>
<p>
<i>For quite some time users of this extension have been waiting for the next release
(Liquify). Liquify will supersede this extension and facilitate advanced features and
capabilities. Liquify is a big project which I began developing in 2020. This extension
will continue to be maintained and progressively transition to Liquify.</i>
</p>
   <a href="https://github.com/panoply/vscode-liquid/issues/56"><i>Liquify and the future of this extension</i></a>
   <a href="https://github.com/panoply/vscode-liquid/projects/6"><i>Project Overview and what to expect</i></a>
   <a href="https://discord.gg/eUNEsxMuWt"><i>Join the Discord and collaborate on the project</i></a>

</code></pre>

<hr>

[![install](https://img.shields.io/badge/vscode-install-blue.svg?style=popout-square)](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid) &nbsp; ![](https://img.shields.io/visual-studio-marketplace/v/sissel.shopify-liquid.svg?style=popout-square) &nbsp; ![install](https://vsmarketplacebadge.apphb.com/downloads-short/sissel.shopify-liquid.svg?style=popout-square)

<img src="https://raw.githubusercontent.com/panoply/vscode-shopify-liquid/master/images/banner.gif"  atl="Liquid Logo"  width="100%">

# Liquid <small style="color:#999;">(VS Code)</small>

A visual studio code extension for the [Liquid](https://shopify.github.io/liquid/) template language. Includes syntax highlighting support, snippet auto-completion, auto formatting (code beautification), validations and more! Respects VS Codes native Intellisense features and provides hover capabilities + various other essentials.

### Key Features

- Syntax support for Liquid in CSS, SCSS, JavaScript, Markdown and more!
- Auto formatting and beautification using [Prettify](https://github.com/panoply/prettify).
- Snippet auto-completion for Liquid tags, filters and more!
- Supports Shopify [Section](https://help.shopify.com/en/themes/development/sections) code blocks.
- Integrated JSON Schema stores that provide IntelliSense capabilities in Shopify Theme files.
- Preserves VSCode HTML IntelliSense capabilities in `.liquid` markup files.

### Showcase

![showcase](https://github.com/panoply/vscode-shopify-liquid/blob/master/images/showcase.gif?raw=true)

# Table of Contents

- [Quickstart](#quickstart)
  - [Upgrading v2.3 to 3.0](#updating-v230-to-v300)
- [Commands](#commands)
- [Workspace Settings](#workspace-settings)
- [Syntax Support](#syntax-support)
  - [Supported Languages](#supported-languages)
  - [Grammar Injections](#grammar-injections)
  - [HTML Validations](#html-validations)
  - [Markdown Codeblock](#markdown-codeblock)
- [Formatting](#formatting)
  - [Prettify](#prettify)
  - [Key Binding](#key-binding)
  - [Status Bar](#key-binding)
- [Configuration](#configuration)
  - [Using .liquidrc rule file](#using-liquidrc-rule-file)
  - [Using the workspace setting option](#using-the-workspace-setting-option)
  - [Using package.json prettify](#status-bar-button)
- [Snippets](#snippets)
- [Contributing](#contributing)
  - [Requirements](#requirements)
  - [Support](#support)
- [Changelog](#changelog)

# Quickstart

After installing this extension run the `Liquid: Generate .liquidrc File` command to create a `.liquidrc` configuration file in your projects root directory. This file will be used to configure the formatting style and control various other capabilities provided by the extension. Refer to the [Formatting](#formatting) and [Rules](#rules) section for additional information and customization options.

### Updating v2.3 to v3.0

Users who were upgraded to version 3.0.0 will need to align their configurations. As of 3.0 the `.liquidrc` configuration file structure provided in 2.4 is not supported. Both the `ignore` tags and `associate` tags formatting options are deprecated and will have no effect.

Take a look at the [changelog](/changelog.md) and [release notes](/release-notes.md).

# Commands

Below are the available commands exposed to the vscode command palette (`cmd + shift + p`)

| Command                    | Description                          |
| -------------------------- | ------------------------------------ |
| Liquid: Format File        | _Formats the current file_           |
| Liquid: Format Selection   | _Formats the selected code_          |
| Liquid: Enable Formatting  | _Enable Prettify formatting_         |
| Liquid: Disable Formatting | _Disable Prettify formatting_        |
| Liquid: Enable Extension   | _Enable the extension_               |
| Liquid: Disable Extension  | _Disable the extension_              |
| Liquid: Restart Extension  | _Restart the extension_              |
| Liquid: Generate .liquidrc | _Generate a `.liquidrc` config file_ |

# Workspace Settings

The extension provides various workspace settings. Most the available options can be controlled within a `.liquidrc` configuration file. Take a look at the [configuration](#configuration) section for information and other setting options.

```jsonc
{
  // Disable the extended features of the extension
  "liquid.enable": true,
  // Validate shopify schema tag blocks
  "liquid.validate.schema": true,
  // Validate shopify layout JSON files
  "liquid.validate.layouts": true,
  // Control completion capabilities of shopify layout JSON files
  "liquid.completion.layouts": true,
  // Control hover capabilities of shopify layout JSON files
  "liquid.hover.layouts": true,
  // Controls whether formatting is enabled or disabled
  "liquid.format.enable": true,
  // Glob paths to exclude from formatting
  "liquid.format.ignore": [],
  // Word wrap limit, defaults to the vscode wordWrapColumn
  "liquid.format.wrap": 0,
  // indentation level, defaults to the vscode tabSize
  "liquid.format.indentSize": 2,
  // Whether or not documents end with newline, defaults to the vscode renderFinalNewline
  "liquid.format.endNewLine": false,
  // If a blank new line should be forced above comments
  "liquid.format.commentIndent": false,
  // The maximum number of consecutive empty lines to retain
  "liquid.format.preserveLine": 3,
  // Prevent comment reformatting due to option wrap
  "liquid.format.preserveComment": false,
  // Use Windows (CRLF) format, Unix (LF) format is the default.
   "liquid.format.crlf": false,
  // HTML, Liquid + HTML code style
  "liquid.format.markup": {
    // Automatically attempts to correct some sloppiness in code
    "correct": false,
    // Control the casing of attributes.
    "attributeCasing": "preserve",
    // Alphanumerically sort HTML attributes from A to Z.
    "attributeSort": false,
    // Sort attributes according to this list, requires attributeSort  to be true
    "attributeSortList": [],
    // Strip extraneous spacing from Liquid delimiters
    "delimiterSpacing": false,
    // Whether comments should always start at position 0 or indented to code
    "commentNewline":  false,
    // Force leading attributes onto a newline when using wrap
    "forceLeadAttribute": false,
    // Will force indentation upon content
    "forceIndent": false,
    // Whether attributes should be indented each onto their own line
    "forceAttribute": false,
    // If text in the provided document code should be preserved
    "preserveText": true,
    // self-closing tags end will end with ' />' instead of '/>'
    "selfCloseSpace": false,
    // Whether attributes should be preserved
    "preserveAttributes": false,
    // Quotation character conversion
    "quoteConvert": "none",
  },
  // JavaScript, TypeScript code style
  "liquid.format.script": {},
  // CSS/SCSS code style
  "liquid.format.style": {},
  // JSON code style
  "liquid.format.json": {},
  }
}
```

# Syntax Support

Liquid syntax highlighting support within HTML, JSON and YAML languages are applied using vscode's injection grammar feature. Grammar injections allow intelliSense capabilities provided by vscode to persist and work without interruption despite containing Liquid code. Liquid syntax contained in JavaScript, TypeScript, CSS/SCSS, JSON and other supported languages require an `.liquid` extension suffix be applied to file names (eg: _js.liquid_, _css.liquid_ etc).

> Alternatively, you can use the vscode [file associations](https://code.visualstudio.com/docs/languages/identifiers).

### Supported Languages

| Language Identifier | Supported Extensions | Grammar Scope        | Grammar Injection |
| ------------------- | -------------------- | -------------------- | ----------------- |
| HTML                | .liquid _or_ .html   | text.html.derivative | ✓                 |
| JSON                | .json                | source.json          | ✓                 |
| Yaml                | .yaml                | source.yaml          | ✓                 |
| Liquid              | .liquid              | source.liquid        | 𐄂                 |
| Liquid Markdown     | .md.liquid           | text.html.markdown   | 𐄂                 |
| Liquid CSS          | .css.liquid          | source.css           | 𐄂                 |
| Liquid SCSS         | .scss.liquid         | source.scss          | 𐄂                 |
| Liquid JavaScript   | .js.liquid           | source.ts            | 𐄂                 |
| Liquid TypeScript   | .ts.liquid           | source.ts            | 𐄂                 |

### Grammar Injections

In previous versions of this extension, the applied injections would cause otherwise valid syntax to be invalidated in the many languages being extended. As of version 3.0 the vast majority of those issues were fixed and no interference outside of Liquid contained structures will apply highlighting.

**Please Note** If you choose `Liquid` as a language then HTML intelliSense features will not work. In order for HTML intelliSense features to persist, you should choose `HTML` as a language. This applies to all grammars applying injections.

### HTML Validations

If your `<style>` and `<script>` HTML tags contain Liquid syntax consider disabling HTML Validations. This will to prevent VS Code from validating these tags and throwing errors:

```json
{
  "html.validate.scripts": false,
  "html.validate.styles": false
}
```

### Markdown Codeblock

Embedded code blocks regions are supported in markdown (_.md_) files:

````md
```liquid
{% # highlighting will be applied for Liquid %}
```
````

<img src="https://raw.githubusercontent.com/panoply/vscode-shopify-liquid/master/images/sass-javascript.png"  atl="Liquid SCSS and Liquid JavaScript"  width="100%">

# Formatting

Formatting can be enabled/disabled via the command palette and will respect native vscode settings like `editor.formatOnSave` and `defaultFormatter`. When Liquid formatting is **enabled** the extension will format HTML, JSON and all suffixed `*.liquid` files supported by [Prettify](https://github.com/panoply/prettify). You can **disabled** beautification at any time, define a set of directories and/or files to exclude from handling or leverage `@prettify-ignore` inline ignore comments. Formatting options to control code output can be provided within a `.liquidrc` file or alternatively you can use the workspace setting options.

### Prettify

[Prettify](https://github.com/panoply/prettify) is used to facilitate formatting capabilities. Prettify is built atop of the late but powerful Sparser lexing algorithm and has since been adapted for refined usage by this extension and will be used in the future Liquify release. It exposes a granular set of beautification rules and supports Liquid code contained in markup, script and style languages. I actively maintain Prettify and though the is in its infancy stages the ambition is to eventually have the tool be a competitive alternative to Prettier in this specific nexus with the goal of eliminating "opinionated" conventions at the formatting level.

Take a look at Prettify [playground](https://liquify.dev/prettify).

### Key Binding

For folks who prefer formatting via key-binding can trigger full document beautification using:

```bash
cmd  + L  # mac
ctrl + L  # windows
```

_You can configure a different key-binding via `editor.action.formatDocument` keyboard shortcuts menu in vscode._

### Status Bar

When the extension is enabled and a supported file is open and active in your editor a toggle/status button will appear in the bottom right hand side of the VSCode status bar. The toggle button will allow you to enable/disable formatting programmatically, inform upon ignored files and will notify you when the parser encounters any code errors.

<!-- prettier-ignore -->
| Status  | Command | Action |
|:--|:--|:--|
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-enabled.png?raw=true"  width="50px"> | **Enabled** | _Clicking this status bar in this state will disable formatting_ |
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-disabled.png?raw=true"  width="50px"> | **Disabled** |  _Clicking the status bar item in this state will enable formatting_ |
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-ignored.png?raw=true"  width="50px"> | **Ignoring**  | _Clicking the status bar item removes the file from ignore list and enables formatting_
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-error.png?raw=true"  width="50px"> | **Errors**  | _Click the status bar item in this state opens the output panel for error information_

> When extended features have been disabled (ie: `liquid.enable` is `false`) then the status bar will not be displayed and formatting will not applied.

# Configuration

Below is the default configuration used by the extension. You can Generate this file using the `Liquid: Generate .liquidrc File` command and a file in the root of your project will be created. Alternatively you can use the `"liquid.format.rules"` option in your workspace or user settings.

### Using the workspace setting option

Rules can also be applied in your User or Workspace settings using the `liquid.format.*` configuration option. Please note that if a `.liquidrc` is present in your projects root it will run precedence over rules defined in workspace settings. Again, it's recommended you use a `.liquidrc` file for setting custom rules.

### Using .liquidrc rule file

Including a `.liquidrc` file in the root of your projects workspace is the **recommended approach** for defining a custom set of formatting code style rules and editor specific options. This approach allows you to easily control options to best fit your project.

> The `.liquidrc` file will be an essential requirement in Liquify (the future release) and the point of control for the Liquify parser, Language Server and the multiple features it provides.

<strong>Supported Files</strong><br>

Currently, the extension only supports 2 JSON (with comments) file types.

- `.liquidrc`
- `.liquidrc.json`

<strong>Option Defaults</strong><br>

Below is the defaults configuration applied when using a `.liquidrc` file.

```jsonc
{
  "completions": {
    "schema": true,
    "layouts": false,
    "settings": true,
    "locales": true
  },
  "validate": {
    "schema": true,
    "layouts": true,
    "settings": true,
    "locales": false
  },
  "format": {
    "ignore": [],
    "crlf": false,
    "commentIndent": true,
    "endNewline": false,
    "indentChar": " ",
    "indentSize": 2,
    "preserveComment": false,
    "preserveLine": 2,
    "wrap": 0,
    "markup": {
      "correct": false,
      "commentNewline": false,
      "attributeCasing": "preserve",
      "attributeValues": "preserve",
      "attributeSort": false,
      "attributeSortList": [],
      "forceAttribute": false,
      "forceLeadAttribute": false,
      "forceIndent": false,
      "preserveText": false,
      "preserveAttributes": false,
      "selfCloseSpace": false,
      "quoteConvert": "none"
    },
    "style": {
      "correct": false,
      "classPadding": false,
      "noLeadZero": false,
      "sortSelectors": false,
      "sortProperties": false
    },
    "script": {
      "correct": false,
      "braceNewline": false,
      "bracePadding": false,
      "braceStyle": "none",
      "braceAllman": false,
      "caseSpace": false,
      "inlineReturn": true,
      "elseNewline": false,
      "endComma": "never",
      "arrayFormat": "default",
      "objectIndent": "default",
      "functionNameSpace": false,
      "functionSpace": false,
      "styleGuide": "none",
      "ternaryLine": false,
      "methodChain": 4,
      "neverFlatten": false,
      "noCaseIndent": false,
      "noSemicolon": false,
      "quoteConvert": "none"
    },
    "json": {
      "arrayFormat": "default",
      "braceAllman": false,
      "bracePadding": false,
      "objectIndent": "default"
    }
  }
}
```

> Don't get too married to the schema structures as they are likely to change when the extension is superseded.

# Snippets

Liquid snippets are supported in this extension. The Filter and Tag snippets included were originally forked from [vscode-liquid-snippets](https://github.com/killalau/vscode-liquid-snippets). The reason for forking this extension is to avoid conflicts due to the extension dependency it relies on, however additionally the extension includes over 50+ snippet helpers for both Jekyll and Shopify development.

<br>

<img src="https://raw.githubusercontent.com/panoply/vscode-shopify-liquid/master/images/schema-snippets.png"  atl="Shopify Schema Snippets"  width="100%">

# Contributing

TODO

### Requirements

### Support

**PayPal**: [Donate](https://www.paypal.me/paynicos)<br>
**BTC**: `35wa8ChA5XvzfFAn5pMiWHWg251xDqxT51`

# Changelog

Refer to the [Changelog](https://github.com/panoply/vscode-liquid/blob/master/CHANGELOG.md) for each per-version update and/or fixes.

<br>

Currently made with 🖤 by Nikolas Savvidis
