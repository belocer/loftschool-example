/* ДЗ 7.1 - BOM */

/**
 * Функция должна создавать окно с указанным именем и размерами
 *
 * @param {number} name - имя окна
 * @param {number} width - ширина окна
 * @param {number} height - высота окна
 * @return {Window}
 */
function createWindow(name, width, height) {
    return window.open(name, `width=${width}, heigth=${height}`);
}

/**
 * Функция должна закрывать указанное окно
 *
 * @param {Window} window - окно, размер которого надо изменить
 */
function closeWindow(window) {
    return window.close();
}

/**
 * Функция должна создавать cookie с указанными именем и значением
 *
 * @param name - имя
 * @param value - значение
 */
function createCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

/**
 * Функция должна удалять cookie с указанным именем
 *
 * @param name - имя
 */
function deleteCookie(name) {
    var d = new Date(); // Берём текущую дату
    d.setYear(2017 - 1); // Возвращаемся в "прошлое"
    document.cookie = `${name}=; expires=` + d.toGMTString(); // Устанавливаем cookie пустое значение и срок действия до прошедшего уже времени
}

export {
    createWindow,
    closeWindow,
    createCookie,
    deleteCookie
};
