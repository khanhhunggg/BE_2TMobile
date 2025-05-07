"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBirthDate = exports.checkPhoneNumber = exports.checkEmail = exports.checkPassword = void 0;
const checkPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;
    return regex.test(password);
};
exports.checkPassword = checkPassword;
const checkEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
exports.checkEmail = checkEmail;
const checkPhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phoneNumber);
};
exports.checkPhoneNumber = checkPhoneNumber;
const checkBirthDate = (birthDate) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(birthDate);
};
exports.checkBirthDate = checkBirthDate;
//# sourceMappingURL=funtion-util.js.map