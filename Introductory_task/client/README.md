# Клиентская часть

## Запуск

Установить необходимы зависимости:

```shell
    npm install
```

Выполнить команду:

```shell
    npm run dev
```

## Компоненты

- [UserView](./src/components/UserView/UserView.tsx) - компонент отображения информации пользователя
- [Button](./src/components/Button/Button.tsx) - стилизованная кнопка, принимает параметры:

  | Параметр   | Тип                         | Описание           |
  | ---------- | --------------------------- | ------------------ |
  | isLoading  | boolean                     | индикация загрузки |
  | isDisabled | boolean                     | флаг недоступности |
  | type       | `submit`, `reset`, `button` | тип кнопки         |

- [AuthForm](./src/components/AuthForm/AuthForm.tsx) - компонент отображения форм авторизации и регистарции
- [LoginForm](./src/components/LoginForm/LoginForm.tsx) - форма авторизации
- [RegisterForm](./src/components/RegisterForm/RegisterForm.tsx) - форма регистрации
- [NoteForm](./src/components/NoteForm/NoteForm.tsx) - форма создания заметки
- [NoteView](./src/components/NoteView/NoteView.tsx) - компонент отображения заметки
- [NotesListView](./src/components/NotesListView/NotesListView.tsx) - компонент отображения списка заметок
- [PageSelector](./src/components/PageSelector/PageSelector.tsx) - компонент переключения страниц, принимает параметры:

  | Параметр      | Тип      | Описание                                             |
  | ------------- | -------- | ---------------------------------------------------- |
  | currentPage   | number   | текущая страница                                     |
  | canSelectNext | boolean  | флаг доступности переключения на следующую страницу  |
  | canSelectPrev | boolean  | флаг доступности переключения на предыдущую страницу |
  | onNextClick   | function | событие переключения на следующую страницу           |
  | onPrevClick   | function | событие переключения на предыдущую страницу          |

- [Loader](./src/components/Loader/Loader.tsx) - индикатор загрузки
- [FormField](./src/components/FormField/FormField.tsx) - компонент для отображения лейбла полей, принимает параметры

  | Параметр     | Тип       | Описание                  |
  | ------------ | --------- | ------------------------- |
  | label        | string    | лейбл                     |
  | children     | ReactNode | дочерний элемент          |
  | errorMessage | string    | отображение текста ошибки |
