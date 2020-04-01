[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://github.com/sebgroup/frontend-tools/workflows/CI/badge.svg)](https://github.com/sebgroup/frontend-tools/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/sebgroup/frontend-tools/badge.svg?branch=master)](https://coveralls.io/github/sebgroup/frontend-tools?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=sebgroup/frontend-tools)](https://dependabot.com)

# **Frontend tools**

A set of frontend utilities that can be used with any javascript application. It's lightweight and intuitive. The only dependency it has is for [momentjs](https://momentjs.com) when using any utility that deals with dates.

## **Installation**

```terminal
npm install @sebgroup/frontend-tools
```

## **Usage**

Using `isStrongPassword` utility as an example, this is how you import it:

### ES6

```typescript
import { isStrongPassword } from "@sebgroup/frontend-tools/dist/isStrongPassword";
```

### ES5

```typescript
const isStrongPassword = require("@sebgroup/frontend-tools/dist/isStrongPassword");
```

## **How to contribute**

Please read our [contributing guildines](https://github.com/sebgroup/frontend-tools/blob/master/CONTRIBUTING.md)

## **Documentation**

For detailed documentation about these utilites please visit our [wiki page](https://github.com/sebgroup/frontend-tools/wiki)
