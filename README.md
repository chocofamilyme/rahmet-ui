
<p align="center" style="padding: 20px 0px">
  <img src="https://rahmet.s3.ap-southeast-1.amazonaws.com/rahmet_logo.svg" alt="Рахмет лого" height="90">
</p>

<h1 align="center" style="font-weight: bol">Рахмет UI Компоненты</h1>

## Контент

- [Установка](#install)
- [Использование](#usage)
- [Запуск](#start)

## Установка

### npm
```
npm install rahmet-ui
```

### yarn
```
yarn add rahmet-ui
```

## Использование
Пример использования компонента ```RahmetButton```:
```
<template>
    <rahmet-button>Test Rahmet Button</rahmet-button>
</template>

import {RahmetButton} from "rahmet-ui"

export default {
    ...
    components: {
        RahmetButton
    }
}
```

## Запуск локально

```yarn serve```

Тестировка компонентов осуществляется в папке ```dev/serve.vue```. Файл ```serve.js``` аналог ```main.js``` в обычном Vue проекте.
