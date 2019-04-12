[![install](https://img.shields.io/badge/vscode-install-blue.svg?style=popout-square)](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid) &nbsp; ![](https://img.shields.io/visual-studio-marketplace/v/sissel.shopify-liquid.svg?style=popout-square) &nbsp; ![install](https://vsmarketplacebadge.apphb.com/downloads-short/sissel.shopify-liquid.svg?style=popout-square)

<img  src="https://raw.githubusercontent.com/panoply/vscode-shopify-liquid/master/images/banner.gif"  atl="Liquid Logo"  width="100%">

<small>If you're using the [Liquid Language Support](https://github.com/GingerBear/vscode-liquid) and/or the [Shopify Liquid Template Snippets](https://github.com/killalau/vscode-liquid-snippets) extension then it's recommended that you either uninstall or disable both these extensions before using this.</small>

# Liquid <small style="color:#999;">(vs code)</small>

A visual studio code extension for the [Liquid](https://shopify.github.io/liquid/) template language. Includes syntax highlighting, formatting + beautification, snippet auto-completion and HTML Intellisense.

### Features

- Syntax highlighting support for all Liquid variations
- Auto formatting and beautification
- Snippet auto-completion
- HTML IntelliSense
- Jekyll [Front Matter](https://jekyllrb.com/docs/front-matter) yaml syntax support
- Shopify [Section](https://help.shopify.com/en/themes/development/sections) tags syntax support + formatting

### Showcase

![showcase](https://github.com/panoply/vscode-shopify-liquid/blob/master/images/showcase.gif?raw=true)

## Snippets

Liquid snippets are supported in this extension. The snippets which have been included were forked from [vscode-liquid-snippets](https://github.com/killalau/vscode-liquid-snippets). The reason for forking this extension is to avoid conflicts due to the extension dependency it relies on.

> If you have [vscode-liquid-snippets](https://github.com/killalau/vscode-liquid-snippets) installed, you can safely uninstall this extension and it's dependency.

## Key binding

You can use the Liquid formatter by using the below key binding.

```
cmd + shift + L -> Format Document
```

> Use `ctrl` for windows

<br>

<strong>Custom keybindings</strong><br>
*If you don't like the defaults then rebind editor.action.formatDocument in the keyboard shortcuts menu of vscode.*

## Workspace Settings

```json
{
  "liquid.format": true,
  "liquid.beautify": {
    "html": {
      "indent_size": 2,
      "force_attribute": false,
      "preserve": 2
    },
    "javascript": {
      "indent_size": 2,
      "preserve": 1,
      "method_chain": 0,
      "quote_convert": "none",
      "format_array": "indent",
      "format_object": "indent"
    },
    "stylesheet": {
      "indent_size": 2,
      "css_insert_lines": true,
      "preserve": 2
    },
    "schema": {
      "indent_size": 2,
      "format_array": "indent"
    }
  }
}
```

## Formatting

Formatting can be enable or disabled via the command palette and also respects the `editor.formatOnSave` setting. When Liquid formatting is **enabled** the extension will format any HTML (`*.html`) or Liquid (`*.liquid`) file in your workspace as it will assume these files contain Liquid syntax. You can customize how Liquid HTML is to be beautified when formatting is applied by configuring the workspace setting.

<strong>❗Important ❗</strong><br>
The `<script>` tag is ignored and its contents will not be formatted. If you require formatting for this tag you should consider using [eslint](<[https://eslint.org](https://eslint.org/)>) and the [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) with [prettier](https://prettier.io/).

#### Commands

| Command                    | Description                                       |
| -------------------------- | ------------------------------------------------- |
| Liquid: Format File        | Formats the current file                          |
| Liquid: Format Selection   | Formats the selected code                         |
| Liquid: Enable Formatting  | Enable formatting of `*.html` or `*.liquid` files |
| Liquid: Disable Formatting | Disable formatting                                |

For

#### Rules

Below is a list of the default beautification rules that will be applied when formatting.

<details>
<summary>
  <strong>HTML</strong>
</summary>
<p>Format rules for HTML Liquid code.</p>
<p>

| Property        | Value   | Description            |
| --------------- | ------- | ---------------------- |
| indent_size     | `2`     | Tab size / indentation |
| force_attribute | `false` | Indent HTML Attributes |
| preserve        | integer | Lines to preserve      |

</p>
</details>

<details>
<summary>
  <strong>JavaScript</strong>
</summary>
<p>

Format rules for JavaScript within Shopify section `{% javascript %}` tags. These rules will not be applied to content within `<script>` HTML tags, those are ignored.

</p>
<p>

| Property      | Default  | Description                                          |
| ------------- | -------- | ---------------------------------------------------- |
| indent_size   | `2`      | Tab size / indentation                               |
| preserve      | `1`      | Lines to preserve                                    |
| method_chain  | `0`      | Newline chaining of function.                        |
| quote_convert | `none`   | Use single or double quotes.                         |
| format_array  | `indent` | Format Array, Accepts `indent` or `newline`          |
| format_object | `indent` | Format Object, Accepts `indent` or `newline`         |
| comment_line  | `false`  | If a blank new line should be forced above comments. |
| else_line     | `false`  | If keyword 'else' is forced onto a new line          |

</p>
</details>

<details>
<summary>
  <strong>Stylesheet</strong>
</summary>
<p>

Format rules for CSS and/or SCSS within Shopify section `{% stylesheet %}` tags. These rules will not be applied to content within `<style>` HTML tags, those are ignored.

</p>
<p>

| Property         | Default | Description                      |
| ---------------- | ------- | -------------------------------- |
| indent_size      | `2`     | Tab size / indentation           |
| css_insert_lines | `true`  | Should use new lines in CSS/SCSS |
| preserve         | `2`     | Lines to preserve                |

</p>

> Format rules applied here will also be used on CSS within the `{% style %}` tag.

</details>

<details>
<summary>
  <strong>Schema</strong>
</summary>
<p>

Format options for JSON within Shopify section `{% schema %}` tags.

</p>
<p>

| Property     | Default  | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| indent_size  | `2`      | Tab size / indentation                       |
| format_array | `indent` | Format Array, Accepts `indent` or `newline`. |

</p>
</details>

<br>

Made with 🖤 By Nikolas Savvidis
