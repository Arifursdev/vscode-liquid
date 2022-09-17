<h2 align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid">
  <img src="https://img.shields.io/badge/vscode-install-blue.svg?style=popout-square">
</a>
&nbsp;
<a href="https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid">
  <img src="https://img.shields.io/visual-studio-marketplace/v/sissel.shopify-liquid.svg?style=popout-square">
</a>
&nbsp;
<a href="https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid">
  <img src="https://img.shields.io/visual-studio-marketplace/i/sissel.shopify-liquid?style=flat-square">
</a>
&nbsp;
<a href="https://github.com/panoply/prettify">
  <img src="https://img.shields.io/npm/v/@liquify/prettify?style=popout-square&color=hotpink&label=%F0%9F%8E%80%20prettify%20%20">
</a>
&nbsp;
</h2>

<pre><code><strong>🩸 <i>LIQUIFY ~ INFORMATION ON THE FUTURE RELEASE</i></strong>
<p>
<i>For quite some time users of this extension have been waiting for the next release
(Liquify). Liquify will supersede this extension and facilitate advanced features and
capabilities. Liquify is a big project which I began developing in 2020. This extension
will continue to be maintained and progressively transition to Liquify.</i>
</p>
  → <a href="https://github.com/panoply/vscode-liquid/issues/56"><i>Liquify and the future of this extension</i></a>
  → <a href="https://github.com/panoply/vscode-liquid/projects/6"><i>Project Overview and what to expect</i></a>
  → <a href="https://discord.gg/eUNEsxMuWt"><i>Join the Discord and collaborate on the project</i></a>

</code></pre>

<img src="https://raw.githubusercontent.com/panoply/vscode-liquid/v3.0.0/images/banner.png"  atl="Liquid Logo"  width="100%">

# Liquid <small style="color:#999;">(vscode)</small>

A vscode extension for the [Liquid](https://shopify.github.io/liquid/) template language. Includes syntax highlighting support, snippet auto-completion, formatting (code beautification), validations and respects HTML Intellisense features.

### Key Features

- Syntax support for Liquid in CSS, SCSS, JavaScript, Markdown and more!
- Formatting and beautification support using [Prettify](https://github.com/panoply/prettify).
- Snippet auto-completion for Liquid tags, filters and more!
- Supports Shopify [Section](https://help.shopify.com/en/themes/development/sections) code blocks.
- Integrated Schema stores that provide IntelliSense capabilities within Shopify JSON files.
- Preserves VSCode HTML IntelliSense capabilities in `.liquid` markup files.

### Showcase

![showcase](https://github.com/panoply/vscode-shopify-liquid/blob/master/images/showcase.gif?raw=true)

# Table of Contents

- [Updating v3.0](#upgrading-v30)
- [Commands](#commands)
- [Workspace Settings](#workspace-settings)
- [Syntax Support](#syntax-support)
  - [Supported Languages](#supported-languages)
  - [Grammar Injections](#grammar-injections)
  - [HTML Validations](#html-validations)
  - [Markdown Codeblock](#markdown-codeblock)
- [Formatting](#formatting)
  - [Prettify](#prettify)
  - [Setting Default Formatter](#setting-default-formatter)
  - [Status Bar](#key-binding)
  - [Ignoring Code and/or Files](#ignoring-code-andor-files)
- [Configuration](#configuration)
  - [Using .liquidrc rule file](#using-liquidrc-rule-file)
  - [Using the workspace setting option](#using-the-workspace-setting-option)
  - [Using package.json prettify](#status-bar-button)
- [Snippets](#snippets)
- [Contributing](#contributing)
  - [Requirements](#requirements)
  - [Support](#support)
- [Changelog](#changelog)

### Updating to v3.0.0

Users who were upgraded to version **3.0.0** will need to align their configurations. The options defined in **v2.3.0** `.liquidrc` files are no longer supported or valid. The validations will inform about the changes but take a look at the release notes for a complete overview.

- [Release Notes](/release-notes.md)
- [Changelog](/changelog.md)

### Continue using v2.3.0 (not recommended)

If you do not wish to upgrade then you can continue using the old version. Search for the extension "liquid" in vscode (`cmd + shift + x`) and press gear icon in the bottom right corner. Select "Install Another Version" and then select **2.3.0**.

- [v2.3.0 Readme](https://github.com/panoply/vscode-liquid/tree/v2.3.0)

# Commands

Below are the available commands exposed to the vscode command palette (`cmd + shift + p`)

| Command                                  | Description                                          |
| ---------------------------------------- | ---------------------------------------------------- |
| Liquid: Enable Extension                 | _Enable the extension_                               |
| Liquid: Disable Extension                | _Disable the extension_                              |
| Liquid: Format File                      | _Formats the current file_                           |
| Liquid: Format Selection                 | _Formats the selected code_                          |
| Liquid: Enable Formatting                | _Enable Prettify formatting_                         |
| Liquid: Disable Formatting               | _Disable Prettify formatting_                        |
| Liquid: Restart Extension                | _Restart the extension and clear cache_              |
| Liquid: Generate .liquidrc (defaults)    | _Generate a `.liquidrc` file with default rules_     |
| Liquid: Generate .liquidrc (recommended) | _Generate a `.liquidrc` file with recommended rules_ |

# Workspace Settings

The extension provides various workspace/user settings. The `liquid.format` options can be controlled using a `.liquidrc` configuration file or alternatively you define format option on the `prettify` field of a node `package.json` file. Take a look at the [configuration](#configuration) section for information and other setting options. By default, it is assumed you are using workspace/user settings.

```jsonc
{
  // Disable the extended features of the extension
  "liquid.enable": true,
  // Validate shopify schema tag blocks
  "liquid.validate.shopifySchemaTag": true,
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

### Enable/Disable Extended Capabilities

The extension provides an option for disabling extended capabilities. The `liquid.enable` workspace/user option can be used to disable the extension from initializing in environments or projects where you may no desire its usage. When the `liquid.enable` setting is set to `false` it will disable the following features:

- Formatting
- File Association
- JSON Validations
- Status Bar Item

# Syntax Support

Liquid syntax highlighting support within HTML and JSON languages are applied using vscode injection grammars. Grammar injections allow intelliSense capabilities provided by vscode to persist and work without interruption. Liquid syntax contained in JavaScript, CSS, SCSS, YAML and other supported languages require an `.liquid` extension suffix be applied to file names (eg: _.css_ → _.css.liquid_ etc).

_If the required `.liquid` suffix is problematic then use [file associations](https://code.visualstudio.com/docs/languages/identifiers) and point extensions to the language names._

### Supported Languages

| Language Identifier | Language Alias    | Supported Extension | Grammar Injection |
| ------------------- | ----------------- | ------------------- | ----------------- |
| html                | HTML              | .liquid             | ✓                 |
| json                | JSON              | .json               | ✓                 |
| liquid              | Liquid            | .liquid             | 𐄂                 |
| liquid-json         | Liquid JSON       | .json.liquid        | 𐄂                 |
| liquid-yaml         | Liquid Yaml       | .yaml.liquid        | 𐄂                 |
| liquid-markdown     | Liquid Markdown   | .md.liquid          | 𐄂                 |
| liquid-css          | Liquid CSS        | .css.liquid         | 𐄂                 |
| liquid-scss         | Liquid SCSS       | .scss.liquid        | 𐄂                 |
| liquid-javascript   | Liquid JavaScript | .js.liquid          | 𐄂                 |

### Grammar Injections

In order to preserve vscode intellisense capabilities both the HTML and JSON languages have Liquid grammars injected into them. The grammar injection will allow Liquid code to be highlighted and treated as if its syntax was a part of the language it is implemented within. When a file using a `.liquid` extension the **intended behavior** is to associate it to HTML as the Liquid grammars are injected into HTML grammars.

_Changing the language to Liquid from HTML will disable HTML intellisense capabilities._

### HTML Validations

When your `<style>` and `<script>` HTML tags contain Liquid syntax vscode will complain about invalid code. You should consider disabling HTML script and style validations when working with Liquid. Disabling validations in these embedded code regions will to prevent VSCode from validating and throwing errors.

```json
{
  "html.validate.scripts": false,
  "html.validate.styles": false
}
```

### Markdown Codeblock

Liquid markdown embedded code block regions are supported in `.md` files.

````md
```liquid
{% comment %} Liquid code {% endcomment %}
```
````

<img src="https://raw.githubusercontent.com/panoply/vscode-shopify-liquid/master/images/sass-javascript.png"  atl="Liquid SCSS and Liquid JavaScript"  width="100%">

# Formatting

Formatting can be enabled/disabled via the command palette and will respect `editor.formatOnSave`. When Liquid formatting is **enabled** the extension will format Liquid, JSON and all suffixed `*.liquid` files supported by [Prettify](https://github.com/panoply/prettify). You can **disable** beautification by clicking the 💧 emoji icon in the status bar or exclude directories/files from handling using the `format.ignore` setting. Formatting options for controlling code output style can be provided within a .liquidrc file, within a package.json `prettify` field or alternatively you can use the workspace setting options.

### 🎀 Prettify

[Prettify](https://github.com/panoply/prettify) is used to facilitate formatting capabilities by the extension. Prettify is built atop of the late but powerful Sparser lexing algorithm and has since been adapted for refined usage with Liquid. Prettify exposes a granular set of rules and supports Liquid beautification in markup, script and style languages. I actively maintain Prettify and though in its infancy stages the ambition is to eventually have the tool become a competitive alternative to Prettier and eliminate "opinionated" conventions.

- [Repository](https://github.com/panoply/prettify)
- [Playground](https://liquify.dev/prettify)

### Setting Default Formatter

In some situations you may have already configured another extension to handle beautification and it might prevent vscode from forwarding documents to the extension and Prettify. Depending on your preferences, you may need to explicitly define a `defaultFormatter` in your vscode workspace/user settings.

_Be sure to select only the languages which you wish to have formatted by Prettify. If you don't want Prettify to handle formatting then set the option `liquid.format.enable` to `false`._

```jsonc
{
  // Enables formatting of .liquid files
  "[liquid]": {
    "editor.defaultFormatter": "sissel.shopify-liquid"
  },
  // Enables formatting of all .json files
  "[json]": {
    "editor.defaultFormatter": "sissel.shopify-liquid"
  },
  // Enables formatting of all .jsonc files
  "[jsonc]": {
    "editor.defaultFormatter": "sissel.shopify-liquid"
  },
  // Enables formatting of all .js.liquid files
  "[liquid-javascript]": {
    "editor.defaultFormatter": "sissel.shopify-liquid"
  },
  // Enables formatting of all .css.liquid files
  "[liquid-css]": {
    "editor.defaultFormatter": "sissel.shopify-liquid"
  },
  // Enables formatting of all .scss.liquid files
  "[liquid-scss]": {
    "editor.defaultFormatter": "sissel.shopify-liquid"
  },
  // Enables formatting of all .json.liquid files
  "[liquid-json]": {
    "editor.defaultFormatter": "sissel.shopify-liquid"
  }
}
```

### Status Bar

When the extension is enabled and a supported file is open in the editor the toggle/status button will appear in the bottom right hand side of the VSCode status bar. The toggle button will allow you to enable/disable formatting programmatically, inform upon ignored files and will notify you when the parser encounters any code errors.

_When extended features have been disabled (ie: `liquid.enable` is `false`) then the status bar will not be displayed and formatting will not applied._

<!-- prettier-ignore -->
| Status  | Command | Action |
|:--|:--|:--|
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-enabled.png?raw=true"  width="50px"> | **Enabled** | _Clicking the status bar item in this state will disable formatting_ |
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-disabled.png?raw=true"  width="50px"> | **Disabled** |  _Clicking the status bar item in this state will enable formatting_ |
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-ignored.png?raw=true"  width="50px"> | **Ignoring**  | _Clicking the status bar item in this state removes the file from ignore list_
| <img  src="https://github.com/panoply/vscode-liquid/blob/v3.0.0/images/status-error.png?raw=true"  width="50px"> | **Errors**  | _Clicking the status bar item in this state opens the output panel_

### Ignoring Code and/or Files

You can skip formatting on files, directories and code input in a few different ways. If you are using workspace/user settings for configuration then you can pass a glob list of paths relative to your projects root via the `liquid.format.ignore[]` option. Folks using the `.liquidrc` file or package.json `prettify` field the option is available via `ignore[]`.

In addition to path ignores, users can also use Prettify [inline ignores](https://github.com/panoply/prettify#inline-control) for skipping blocks of code and files.

<strong>Ignoring Files</strong><br>

- `{% # @prettify-ignore %}`
- `<!-- @prettify-ignore -->`
- `{% comment %} @prettify-ignore {% endcomment %}`

> **Warning**&nbsp;&nbsp;
> Inline ignore made possible via Prettify are not yet fully operational.

# Configuration

The extension provides a couple of different ways for users to configure and control capabilities. The preferred method is to use a `.liquidrc` file for controlling formatting capabilities and the vscode workspace/global settings for anything else but nothing is stopping you from controlling everything within the workspace.

### Using the workspace settings

Setting configuration using workspace settings is made available on `liquid.*` options. When a `.liquidrc` file is present in your projects root then that will run precedence over the `liquid.format.*` options defined in workspace/user settings unless formatting is disabled (ie: the `liquid.format.enable` option is set to `false`).

Refer to [Workspace Settings](#workspace-settings) for defaults.

### Using the package.json prettify field

In some situations users may prefer to define formatting options within a `package.json` file. The extension will check `package.json` files for a `prettify` field and use any beautification options provided if defined. The `prettify` field only accepts format rules and will override vscode workspace/user settings unless a `.liquidrc` file is present. When a .liquidrc file is present in your projects root then that will run precedence over the `prettify` field and workspace settings.

### Using .liquidrc config file

The `.liquidrc` file allows users to control beautification rules to be used by Prettify when formatting documents. You can only provide formatting configuration in the .liquidrc file, it does not accept vscode workspace/user settings. It's typically the easiest way to define per-project configurations and shareable rules.

_The `.liquidrc` file will be an essential requirement in Liquify (the future release) and the point of control for the Liquify parser, Language Server, Liquid specifications and other features._

### Supported Files

Currently, the extension only supports 2 JSON (with comments) file types.

- `.liquidrc`
- `.liquidrc.json`

### Generating a .liquidrc File

You can generate a `.liquidrc` file using the **Liquid: Generate .liquidrc (defaults)** command available via the vscode command palette. The extension will use default rules defined on the `liquid.format` user/workspace setting. If you prefer a more refined output then you can generate a file with **recommended** rules. The recommended rules are best suited to Shopify projects and were helped determined together with several talented developers who frequent the [Shopify Developers](https://discord.com/channels/597504637167468564) discord server.

```jsonc
{
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
```

# Snippets

Liquid snippets are supported in this extension. The filter and tag snippets included were originally forked from [vscode-liquid-snippets](https://github.com/killalau/vscode-liquid-snippets) but apply choice controlled filter pipes and delimiter whitespace dashes. In addition to the tags and filter, schema section snippets are also supported for quickly generating settings in `{% schema %}` tag blocks.

_Extension snippets will be deprecated in Liquify and will exist only until the extension is superseded. Liquify supports LSP Completions as per [#56](https://github.com/panoply/vscode-liquid/issues/56#issuecomment-852550324)._

<br>

<img src="https://raw.githubusercontent.com/panoply/vscode-shopify-liquid/master/images/schema-snippets.png"  atl="Shopify Schema Snippets"  width="100%">

# Contributing

Contributions are welcome! This project is uses [pnpm](https://pnpm.js.org/en/cli/install) for package management and is written in TypeScript.

1. Ensure pnpm is installed globally `npm i pnpm -g`
2. Leverage pnpm env if you need to align node versions
3. Clone this repository `git clone https://github.com/panoply/vscode-liquid.git`
4. Run `pnpm i` in the root directory
5. Run `pnpm dev`

### Acknowledgements

Special thanks to the talented folks who I have learned a lot from over the years.

- [Curtis](https://github.com/toklok)
- [Mansedan](https://github.com/MattWIP)
- [David Warrington](https://ellodave.dev/)
- [Austin Cheney](https://github.com/prettydiff)

### Support

No obligation, I'll likely forward donations to charities that help animals.

**PayPal**: [Donate](https://www.paypal.me/paynicos)<br>
**BTC**: `35wa8ChA5XvzfFAn5pMiWHWg251xDqxT51`

# Changelog

Refer to the [Changelog](https://github.com/panoply/vscode-liquid/blob/master/CHANGELOG.md) for each per-version update and/or fixes.

<br>

Currently made with 🖤 by Nikolas Savvidis
