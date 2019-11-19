/*
 *  类型推论
 *  1：最佳通用类型，从当前表达式中推断
 *  2：上下文类型，从上下文中推断
 * 类型兼容性： ts结构化类型系统的基本规则是，如果X要兼容Y，nameY至少具有与X相同的属性。
 *
 */

/* *类型定义， START */
const bool = false;
const string1 = "string";
const num1 = 1234;
// 数组两种定义方式
let numList: number[] = [1, 23, 4, 5]; // 表示是由number组成的数组
const numList1: Array<number> = [1, 2, 34, 5, 6, 7]; // 使用数组泛型
console.log(numList, numList1);
// 元组：
let tuple: [number, string] = [123, "1234"];

// 补充的枚举类型，可自定义索引，默认索引从0开始，之后的属性一次递增
enum Color {
  red = 10,
  green = 19,
  blur
}
const color: Color = Color.red;
console.log(Color, color);

// any类型
let list: any[] = [12, "32", false];
console.log(list);

// Never类型
function err(): never {
  throw new Error("报错了");
}
function neverWihile() {
  while (true) {
    console.log(1111111111);
  }
}

/*
 * 类型支持：
 * js 原始类型number，string，boolean，symbol，null、undefined，非原始类型 Object
 * any： 不进行类型检查，可以是除viod之外的任何类型
 * viod： 没有类型，和viod相反
 * enum： 枚举类型，可自定义索引
 * Never： 表示不存在的值类型，可以使没有返回值的函数（不是undefiult）
 *
 * as   类型断言
 */

//  类型断言(相当于类型转换)  , 在jsx里面，只持支as语法
let string2: any = "string value";
// let string2Num1: number = (<string>string2).length;
let string2Num2: number = (string2 as string).length;
console.log(string2Num2);

// 解构赋值  和js大致相同
const { a: first1, b: second1 }: { a: string; b: number } = { a: "12", b: 14 };
console.log(first1, second1);
// 对结构的数据进行重命名和类型操作
/** 类型 END */

/** 接口 STRAT */
interface SquareConfig {
  color: string; // 设置必选参数
  width?: number; // 设置可选参数
  readonly height?: number; // 设置只读，并且是可选属性
}

function creatSquare(config: SquareConfig): { color: string; area: number } {
  const square = { color: "red", area: 0 };
  if (config.color) square.color = config.color;
  if (config.width && config.height) square.area = config.width * config.height;

  return square;
}
console.log(creatSquare({ color: "green", width: 100 }));

// 函数接口 (source: string, sub: string)表示参数， 引用时候名称可以不同，但是类型必须相同
// @typescript-eslint/prefer-function-type
// interface FuncInsterface {
//   (source: string, sub: string): boolean;
// }
type FuncInsterface = (source: string, sub: string) => boolean;
const myFunc: FuncInsterface = function(source, sub) {
  return source.search(sub) > -1;
};
console.log(myFunc("hello world", "worl"));

// 可索引的类型
interface StringArray {
  [index: number]: string;
}
const myArrray = ["red", "green"];
console.log(myArrray[0]);

//  类接口 , 只会在实例部分进行检查，不会在静态部分检查
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  public currentTime: Date = new Date();
  public setTime(d: Date) {
    this.currentTime = d;
  }
  // private表示私有属性
  private setCurrTime(d: string) {}
}

// 接口继承
interface Shape {
  color: string;
}
interface Length {
  length: number;
}
interface Square extends Shape, Length {
  strlength: number;
}
const squareValue: Square = { color: "red", length: 11, strlength: 1123 };
console.log(squareValue);

// 混合类型， 一个对象可以当做函数和对象使用，
interface MixinType {
  interval: number;
  (start: number): string; // 表示函数的参数
  reset(): void;
}
function mixinExample(): MixinType {
  const mixin = function(start) {} as MixinType;
  mixin.interval = 123;
  mixin.reset = function() {};
  return mixin;
}
const e1 = mixinExample();
e1(123);
e1.reset();
e1.interval = 134;
/* 接口  END */

/** 类 */
class Greeter {
  // static和readonly可以同时存在
  public static printer = { x: 0, y: 0 }; // static只存在于创建类的静态成员，不能被实例显示
  public readonly greetName = "name"; // readonly只读属性,只能在声明时，或构造函数中被实例化
  private _greeting: string; // 私有的
  public constructor(message: string) {
    // 公开的变量
    this._greeting = message;
  }
  public getPointer() {
    console.log(Greeter.printer);
  }
  // 只能在派生类（继承的类）中使用
  protected greet() {
    return "Hello, " + this.greeting;
  }
  // get(取值)/set(设置值)方法
  public get greeting(): string {
    return this._greeting + "123";
  }
  public set greeting(greet: string) {
    this._greeting = greet;
  }
}

let greeter = new Greeter("world");
greeter.getPointer();
console.log(greeter.greeting, Greeter.printer);
greeter.greeting = "greentName";
console.log(greeter.greeting);

const GreenMake: typeof Greeter = Greeter; // 使用typeof获取Greeter类的类型（包含静态方法和实例方法），可以改变类上面的静态方法
GreenMake.printer = { x: 100, y: 100 };

const greet2 = new GreenMake("hello");
greet2.getPointer();
// 抽象类：作为其他派生类的基类方法使用。 并且不能创建实例方法
abstract class Animal {
  protected name: string;
  public constructor(name: string) {
    this.name = name;
  }
  abstract makeSound(): void; // abstract字段标识的方法，必须在派生类中实现
}
// console.log(new Animal()) // 报错 ：无法创建抽象类的实例
class AnimalChild extends Animal {
  public constructor(name: string) {
    super(name);
    this.makeSound();
  }

  public makeSound(): void {
    console.log(this.name);
    console.log("这是从抽象类方法中派生出来的方法");
  }

  public reports(): void {
    console.log("这个方法不存在，吗");
  }
}
const animal: AnimalChild = new AnimalChild("animal");
animal.reports();

/*
 * 函数
 * 函数类型包含两部分：参数类型和返回值类型
 * 完整类型：赋值语句的两端都有指定函数类型
 * 推断类型：赋值语句的一边指定类型，另一边没有，编译器会自动识别类型。又叫做‘按上下文归类’，是类型推类的一种。
 * 可选参数用 ? 表示， 默认参数用等号赋值, 剩余参数用 ... 表示
 */
const add: (x: number, y?: number) => number = (x, y = 12) => x + y;
console.log(add(14));
const showArgument = (a: string, ...arg: Array<string>): string => `${a},${arg.join(",")}`;
console.log(showArgument("name", "age", "height", "max", "min"));

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: number | { suit: string; card: number }[]): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x === "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x === "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 }
];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

/*
 * 泛型: 表示输入什么类型的值，就会同样输出什么类型的值
 * 类型变量可以使用不同的泛型参数名称，只要数量和使用方式对上就可以
 * 使用接口和extends关键字对泛型进行约束
 */
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: <T>(arg: T) => T = identity;

// 定义泛型接口，使用的时候可以掺入泛型类型
type IdentityInterface<T> = (arg: T) => T;
let myIdentity1: IdentityInterface<number> = identity;
console.log(myIdentity1(1234));
// 定义泛型类
class GenericNumber<T> {
  public zeroValue: T | undefined;
  public add: ((x: T, y: T) => T) | undefined;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
// 泛型约束， 必须有length属性才可以使用
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

/*
 * 枚举
 * 数字枚举，可自定义枚举值，之后的枚举值如不定义，自加一
 * 字符串枚举，字符串不能自加一，所以需要手动定义在枚举值
 * 异构枚举：枚举值可以使字符串数字混合使用， 不建议，但可以使用
 *
 * 反向映射：可以根据枚举值和枚举名称中的任何一个，获取到另外一个的值
 * 编译阶段求值, key为常量，可在枚举内部使用
 *
 */
// 数字枚举
enum NumDirection {
  up = 1,
  down = up + 2,
  left,
  right
}
console.log(NumDirection);
// 字符串枚举
enum StrDirection {
  up = "up",
  down = "down",
  left = "left",
  right = "right"
}
console.log(StrDirection);
// 异构枚举
enum StrAndNumEnum {
  up = "up",
  down = 1
}
console.log(StrAndNumEnum);
// 反向映射, 可以由枚举值得出枚举的名字（反之亦可以）
const upVlu = StrAndNumEnum.up;
console.log(StrAndNumEnum[upVlu]);
const directionArray = [NumDirection.up, NumDirection.down, NumDirection.left, NumDirection.right];

console.log(directionArray);

/**
 * 高级类型
 * 1：交叉类型：即将多个类型合并成到一起成为一种类型
 * 2: 联合类型：与交叉类型相仿，表示 XX 类型或 XX 类型
 */
