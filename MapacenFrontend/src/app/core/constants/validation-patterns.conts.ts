export const INTEGER_PATTERN = /^-?\d+$/;
export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[A-Z]).{8,30}$/;
export const ALL_NUMBERS_LETTERS_PATTERN = /^[a-zA-Z0-9]+$/;
export const USERNAME_PATTERN = /^[a-zA-Z0-9]{5,18}$/;