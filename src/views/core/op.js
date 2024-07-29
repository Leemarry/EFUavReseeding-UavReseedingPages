/*
 * @Descripttion: 
 * @version: 
 * @Author: Eugene
 * @Date: 2024-05-16 09:05:50
 * @LastEditors: Andy
 * @LastEditTime: 2024-05-16 09:23:54
 */
class Example {
    constructor(options) {
        this._color = options.color || 'defaultColor';
        //   this.color = options.color || 'defaultColor';
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        this._color = newColor;
    }
}

const example = new Example({ color: 'red' });
// console.log(example.color()); // 输出: red
example.color('blue');
console.log(example.color()); // 输出: blue