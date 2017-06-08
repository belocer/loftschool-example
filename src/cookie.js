/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *это я не понял
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */

let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

var cookie_obj = getCookies();
for (let key in cookie_obj) {
    var td_Tr = document.createElement('tr');
    td_Tr.innerHTML = '<td class="first_td">' + key + '</td><td>' + cookie_obj[key] + '</td><td><button class="del" data-key="' + key + '">Удалить</button></td>';
    listTable.appendChild(td_Tr);
}

var del_cookie = document.querySelectorAll('.del');
for (var i = 0; i < del_cookie.length; i++) {
    del_cookie[i].addEventListener('click', (e) => {
        document.cookie = e.target.dataset.key + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        e.target.parentNode.style.display = 'none';
        e.target.parentNode.previousElementSibling.style.display = 'none';
        e.target.parentNode.previousElementSibling.previousElementSibling.style.display = 'none';
    });
}
// Поиск в объекте
filterNameInput.addEventListener('keyup', function () {

    function isMatching(full, chunk) {
        if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    var arr = [];
    for (let index in cookie_obj) {
        arr.push(index + ':' + cookie_obj[index]);
    }
    var arr_result = [];
    arr_result = arr.filter(function (element) {
        return isMatching(element, filterNameInput.value);
    });

    var result_split = [];
    listTable.innerHTML = '';
      arr_result.forEach(function (element) {
          result_split = element.split(':');
          var td_Tr = document.createElement('tr');
          td_Tr.innerHTML = '<td class="first_td">' + result_split[0] + '</td><td>' + result_split[1] + '</td><td><button class="del" data-key="' + result_split[0] + '">Удалить</button></td>';
          listTable.appendChild(td_Tr);
     });
});

addButton.addEventListener('click', () => {
    var i = 0;
    for (var key in cookie_obj) {
        if (addNameInput.value == key) {
            document.cookie = `${key}=${addValueInput.value}`;
            i++;
        }
    }
    if (i != 0) {
        var first_td = document.querySelectorAll('.first_td');
        for (var s = 0; s < first_td.length; s++) {
            if (first_td[s].innerText == addNameInput.value) {
                first_td[s].nextElementSibling.innerHTML = addValueInput.value;
            }
        }
    } else if (i == 0) {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        var td_Tr = document.createElement('tr');
        td_Tr.innerHTML = '<td class="first_td">' + addNameInput.value + '</td><td>' + addValueInput.value + '</td><td><button class="del" data-key="' + addNameInput.value + '">Удалить</button></td>';
        listTable.appendChild(td_Tr);
    }
    addNameInput.value = ' ';
    addValueInput.value = ' ';
});