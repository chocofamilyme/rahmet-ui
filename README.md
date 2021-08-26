<p align="center" style="padding: 20px 0px">
  <img src="https://rahmet.s3.ap-southeast-1.amazonaws.com/rahmet_logo.svg" alt="Рахмет лого" height="90">
</p>

<h1 align="center" style="font-weight: bol">Рахмет UI Компоненты</h1>

## Контент

- [Установка](#install)
- [Использование](#usage)
- [Запуск](#start)
- [Требование](#requirements)

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

Пример использования компонента `RahmetButton`:

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

Инициализация компонентов осуществляется в папке `dev/serve.vue`. Файл `serve.js` аналог `main.js` в обычном Vue проекте.

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

````
yarn lint```
````

## <a id="requirements"></a>Требование

### Порядок CSS-свойств:

```css
.element {
  /* Позиционирование */
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  /* Блочная модель */
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px 20px;
  border: 1px solid red;
  width: 200px;
  height: 100px;
  box-sizing: border-box;

  /* Типографика */
  font-family: Arial;
  font-size: 25px;
  font-style: italic;
  text-decoration: none;
  color: red;

  /* Оформление */
  background: red;
  opacity: 1;

  /* Анимации */
  transform: translateX(5px);
  animation: shake 0.3s infinite;
}
```

### Требования к JavaScript:

```
1. Смысловые блоки кода отделяются друг от друга не более чем двумя пустыми строками
2. Запрещено использовать case без break или return в блоках switch
3. В коде не используется оставленных выводов в консоль
4. В коде нет объявленных, но неиспользуемых переменных
```

### Порядок Vue-свойств:

```javascript
export default {
  // Инициализация компонента
  name,
  components,
  mixins,

  // Входные параметры и пользовательские события
  props,
  emits,

  // Работа с данными
  data,
  computed,
  watch,

  // Жизненные циклы
  beforeCreate,
  created,
  beforeMount,
  mounted,
  beforeUpdate,
  updated,
  beforeUnmount,
  unmounted,
  errorCaptured,
  renderTracked,
  renderTriggered,
  activated,
  deactivated,

  // Методы
  methods
};
```
