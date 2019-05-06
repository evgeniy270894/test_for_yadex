// Почему this._i не увеличивается. Как исправить?

// Ответ потому что ticker.tick() теряет контекст.
// Можно исправить передав в setInterval ананимную функцию которая возвращает вызов ticker.tick()
// или забайндить метод tick. Решение представлено ниже.


function Ticker() {
    this._i = 0
}

Ticker.prototype = {
    tick: function () {
        console.log(this._i++);
    }
};

var ticker = new Ticker();
setInterval(() => ticker.tick(), 1000);
// setInterval(ticker.tick.bind(ticker), 1000);
