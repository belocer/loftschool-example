import { assert } from 'chai';
import { randomValue } from '../helper';
import {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
} from '../src/index';

function random(type) {
    let result = randomValue(type);

    if (type == 'string') {
        return encodeURIComponent(result);
    }

    return result;
}

describe('ДЗ 4 - Работа с DOM', () => {
    describe('createDivWithText', () => {
        it('должна возвращать элемент с тегом DIV', () => {
            let text = random('string');
            let result = createDivWithText(text);

            assert.instanceOf(result, Element);
            assert.equal(result.tagName, 'DIV');
        });

        it('должна добавлять текст в элемент', () => {
            let text = random('string');
            let result = createDivWithText(text);

            assert.equal(result.innerText, text);
        });
    });

    describe('createAWithHref', () => {
        it('должна возвращать элемент с тегом A', () => {
            let href = `http://${random('string')}.com`;
            let result = createAWithHref(href);

            assert.instanceOf(result, Element);
            assert.equal(result.tagName, 'A');
        });

        it('должна добавлять атрибут href', () => {
            let href = `http://${random('string')}.com`;
            let result = createAWithHref(href);

            assert.equal(result.getAttribute('href'), href);
        });
    });

    describe('prepend', () => {
        it('должна добавлять элемент в начало', () => {
            let where = document.createElement('div');
            let what = document.createElement('p');
            let whereText = random('string');
            let whatText = random('string');

            where.innerHTML = `, <b>${whereText}</b>!`;
            what.innerText = whatText;

            prepend(what, where);

            assert.equal(where.firstChild, what);
            assert.equal(where.innerHTML, `<p>${whatText}</p>, <b>${whereText}</b>!`);
        });
    });

    describe('findAllPSiblings', () => {
        it('должна возвращать массив с элементами, соседями которых являются P', () => {
            let where = document.createElement('div');
            let result;

            where.innerHTML = '<div></div><p></p><span></span><span></span><p></p>';
            result = findAllPSiblings(where);

            assert.isTrue(Array.isArray(result));
            assert.deepEqual(result, [where.children[0], where.children[3]]);
        });
    });

    describe('findError', () => {
        it('должна возвращать массив из текстового содержимого элементов', () => {
            let where = document.createElement('div');
            let text1 = random('string');
            let text2 = random('string');
            let result;

            where.innerHTML = ` <div>${text1}</div>, <div>${text2}</div>!!!`;
            result = findError(where);

            assert.isTrue(Array.isArray(result));
            assert.deepEqual(result, [text1, text2]);
        });
    });

    describe('deleteTextNodes', () => {
        it('должна удалить все текстовые узлы', () => {
            let where = document.createElement('div');

            where.innerHTML = ` <div></div>${random('string')}<p></p>${random('string')}`;
            deleteTextNodes(where);

            assert.equal(where.innerHTML, '<div></div><p></p>');
        });
    });

    describe('deleteTextNodesRecursive', () => {
        it('должна рекурсивно удалить все текстовые узлы', () => {
            let where = document.createElement('div');
            let text1 = random('string');
            let text2 = random('string');
            let text3 = random('string');

            where.innerHTML = `<span> <div> <b>${text1}</b> </div> <p>${text2}</p> ${text3}</span>`;
            deleteTextNodesRecursive(where);

            assert.equal(where.innerHTML, '<span><div><b></b></div><p></p></span>');
        });
    });  
});