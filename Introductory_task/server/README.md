# Серверная часть

## Запуск

Установить необходимы зависимости:

```shell
    npm install
```

Выполнить команду:

```shell
    npm run dev
```

## Роуты

<b>POST - методы<b>

- `/login` - авторизация, принимает параметры:

```json
{
  "email": "example@mail.com",
  "password": "password"
}
```

- `/register` - регистрация, принимает параметры:

```json
{
  "username": "username",
  "email": "example@mail.com",
  "password": "password"
}
```

- `/logout` - прекращение авторизации пользователя, параметров не принимает.


- `/notes` - создание заметки, принимает параметры:

```json
{
  "title": "Some large title",
  "text": "Very very large text"
}
```

<b>GET - методы<b>

- `/users/me` - регистрация, формат ответа:

```json
{
  "id": "4080a8c6-7f64-4a27-8dbd-85e6c7a15f28",
  "email": "example@mail.com",
  "username": "user"
}
```

- `/notes` - список заметок, формат ответа:

```json
{
  "list": [
    {
      "id": "982bc6f8-08e9-42bf-ac7a-2bfa63643c4c",
      "title": "Some large title",
      "text": "Very very large text",
      "userId": "4080a8c6-7f64-4a27-8dbd-85e6c7a15f28",
      "createdAt": 1706119302723
    }
  ],
  "pageCount": 1
}
```
