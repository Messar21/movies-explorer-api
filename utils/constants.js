const existErrorMessage = 'Пользователь с таким email уже существует.';
const loginErrorMessage = 'Вы ввели неправильный логин или пароль.';
const notFoundUserMessage = 'Пользователь не найден';
const registrationErrorMessage = 'При регистрации пользователя произошла ошибка.';
const updateUserErrorMessage = 'При обновлении профиля произошла ошибка.';
const noTokenErrorMessage = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
const invalidTokenErrorMessage = 'При авторизации произошла ошибка. Переданный токен некорректен.';
const movieNotFoundMessage = 'Фильм с таким _id не найден';
const forbiddenErrorMessage = 'Доступ запрещен!';
const deleteMovieMessage = 'Фильм удален';
const serverErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  existErrorMessage,
  loginErrorMessage,
  notFoundUserMessage,
  registrationErrorMessage,
  updateUserErrorMessage,
  noTokenErrorMessage,
  invalidTokenErrorMessage,
  movieNotFoundMessage,
  forbiddenErrorMessage,
  deleteMovieMessage,
  serverErrorMessage,
};
