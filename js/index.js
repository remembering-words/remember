var $j = jQuery.noConflict();

$j(function(){

//щелчек на кнопке играть
$j('.buttonStart a').click(function (event) {
    event.preventDefault();
    $j('.buttonStart').fadeOut(600, function () {
        $j('.logo').fadeOut(300);
        $j('.block_game').fadeIn(600);
        $j('.block_guess_words').fadeIn(600);
        startGame();
    });
});


    var number_block = 3; // кол-во вариантов ответа перевода
    var word = []; // массив слов на английском
    var value = []; // массив значений слов
    var index = []; // массив с итоговыми индексы слов в раунде
    var selected; // выбранное слово для перевода

    word[0] = 'Hello';
    value[0] = 'Привет';
    word[1] = 'Goodbye';
    value[1] = 'Досвидания';
    word[2] = 'Cat';
    value[2] = 'Кот';
    word[3] = 'Dog';
    value[3] = 'Собака';
    word[4] = 'Apple';
    value[4] = 'Яблоко';
    word[5] = 'Book';
    value[5] = 'Книга';
    word[6] = 'Water';
    value[6] = 'Вода';
    word[7] = 'Apartment';
    value[7] = 'Квартира';
    word[8] = 'Bath';
    value[8] = 'Ванна';
    word[9] = 'Besom';
    value[9] = 'Веник';
    word[10] = 'Broom';
    value[10] = 'Метла';
    word[11] = 'Bulb';
    value[11] = 'Лампочка';
    word[12] = 'Carpet';
    value[12] = 'Ковер';
    word[13] = 'Clock';
    value[13] = 'Часы';
    word[14] = 'Kitchen';
    value[14] = 'Кухня';
    word[15] = 'Mirror';
    value[15] = 'Зеркало';
    word[16] = 'Pillow';
    value[16] = 'Подушка';
    word[17] = 'Shower';
    value[17] = 'Душ';
    word[18] = 'Switch';
    value[18] = 'Выключатель';
    word[19] = 'Towel';
    value[19] = 'Полотенце';
    word[20] = 'Wall';
    value[20] = 'Стена';
    word[21] = 'Window ';
    value[21] = 'Окно';
    word[22] = 'Beef';
    value[22] = 'Говядина';
    word[23] = 'Biscuit';
    value[23] = 'Печенье';
    word[24] = 'Cheese';
    value[24] = 'Сыр';
    word[25] = 'Fish';
    value[25] = 'Рыба';
    word[26] = 'Garlic';
    value[26] = 'Чеснок';
    word[27] = 'Peach';
    value[27] = 'Персик';
    word[28] = 'Pork';
    value[28] = 'Свинина';
    word[29] = 'Spicy';
    value[29] = 'Острый';
    word[30] = 'Watermelon';
    value[30] = 'Арбуз';


    function startGame() {
        getNewGameRound();
    }


    function getNewGameRound() {
        renderGameRound();
        printNewGameRound();
    }

    /**
     * алгоритм выбора слов для нового раунда игры
     */
    function renderGameRound() {
        var length = word.length - 1;
        var i, j;
        var bad;
        for (i = 0; i < number_block; i++) {
            // индекс слова по номеру элемента в массиве
            index[i] = getRandomInt(0, length);

            bad = false;
            // проверяем, не выбирали мы слово до этого
            for (j = 0; j < index.length - 1; j++) {
                if (index[i] == index[j]) {
                    bad = true;
                    break;
                }
            }
            // повторно ищем слово
            if (bad) {
                i--;
                continue;
            }
        }

        // выбираем случайное слово, из выбранных, которое надо будет переводить
        selected = getRandomInt(0, index.length - 1);
    }

    /**
     * генерация html кода нового уровня
     */
    function printNewGameRound() {
        $j('.block_eng_word').text(word[index[selected]]);
        $j('.block_eng_word').attr('id', 'word-' + selected);

        $j('.block_rus_words').html('');
        var i;
        for (i = 0; i < number_block; i++) {
            $j('.block_rus_words').html(

                $j('.block_rus_words').html() +
                '<div class="block_rus_word" id="translate-' + i + '">' +
                    value[index[i]] +
                '</div>'

            );
        }

    }




    // при нажатии на вариант перевода - смотрим, верно ли?
    $j('body').on('click', '.block_rus_word', function () {
        var result = checkTranslate($j(this));

        // если угадали - то скрываем уровень и генеририуем новый
        if (result) {
            closeRound();
        }
        else {
            // показываем ошибку
            $j('.block_answer_right').fadeOut(100);
            $j('.block_answer_wrong').fadeIn(100);
        }
    });


    /**
     * проверяем, верно ли мы выбрали перевод слова?
     * если верно, то возвращаем true
     * иначе false
     * @param block - кнопочка с переводом, по которой мы щелкнули
     * @return true/false
     */
    function checkTranslate(block) {
        var id;
        var idOrigin;

        id = block.attr("id");
        id = id.substr(id.lastIndexOf('-') + 1);  //выделяем индекс (цифра)

        idOrigin = $j('.block_eng_word').attr("id");
        idOrigin = idOrigin.substr(idOrigin.lastIndexOf('-') + 1);  //выделяем индекс (цифра)

        if (id == idOrigin) {
            return true;
        }
        return false;
    }


    /**
     * скрываем уровень для генерации нового
     */
    function closeRound() {
        $j('.guess').text(parseInt($j('.guess').text()) + 1);

        // показываем, что угадали верно
        $j('.block_answer_right').fadeIn(100);
        $j('.block_answer_wrong').fadeOut(100);

        $j('.block_game').fadeOut(500, function () {
            index = []; // удалим массив с выбранными ранее айди слов
            getNewGameRound();
            $j('.block_game').fadeIn(500, function () {
                $j('.block_answer_right').fadeOut(100);
                $j('.block_answer_wrong').fadeOut(100);
            });
        })
    }



    // Случайное целое между min и max
    // использование Math.round() даст неравномерное распределение!
    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


});
