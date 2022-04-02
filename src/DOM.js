/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    let i;
    let data = [];
    for (i = 0; i < count; i++) {
        data[i] = document.createElement(tag);
        document.body.append(data[i]);
        data[i].innerHTML = content;
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function appendNode(count, n, node, k) {
        let i;
        let data = [];
        if (n == 0) return;
        for (i = 0; i < count; i++) {
            data[i] = document.createElement('div');
            data[i].setAttribute('class', 'item_' + k);
            appendNode(count, n - 1, data[i], k + 1);
            node.appendChild(data[i]);
        }
    }

    let rootDiv = document.createElement('div');
    rootDiv.setAttribute('class', 'item_1');
    appendNode(childrenCount, level - 1, rootDiv, 2);
    return rootDiv;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = new generateTree(2, 3);
    const level2 = tree.getElementsByClassName('item_2');
    for (let i of level2) {
        let section = document.createElement('section');
        section.setAttribute('class', 'item_2');
        section.innerHTML = i.innerHTML;
        i.before(section);
        i.remove();
    }
    return tree;
}
