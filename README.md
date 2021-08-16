
<p align="center" style="padding: 20px 0px">
  <img src="https://rahmet.s3.ap-southeast-1.amazonaws.com/rahmet_logo.svg" alt="Рахмет лого" height="90">
</p>

<h1 align="center" style="font-weight: bol">Рахмет UI Компоненты</h1>

## Контент

- [Установка](#install)
- [Использование](#usage)
- [Запуск](#start)

## <a id="install"></a>Установка

### npm
```
npm install rahmet-ui
```

### yarn
```
yarn add rahmet-ui
```

## <a id="usage"></a>Использование

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

## <a id="start"></a>Запуск

### Локально
```
yarn serve
```

Инициализация компонентов осуществляется в папке ```dev/serve.vue```. Файл ```serve.js``` аналог ```main.js``` в обычном Vue проекте.

### Production
```
yarn build
```

### Unit тесты
```
yarn test:unit
```

### E2E тесты
```
yarn test:e2e
```

### ESLINT
```
yarn lint```