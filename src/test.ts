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
const c: Color = Color.red;
console.log(Color, c);

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

/** 泛型 */
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
