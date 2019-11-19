import React, { useState, useEffect } from "react";
import "./App.scss";

/*
 * hook,在不编写class的时候，使用state以及其他的react特性（在class内部使用hook不起作用）
 * useState和useEffect可多次使用, 把逻辑分离出来
 *
 *
 * 使用规则：
 * 只能在函数的最外层使用，不要在循环，条件判断，子函数中使用(确保每次渲染都走同样的逻辑)
 * 只能在react函数组件或者自动以hook中使用，不要在其他的函数中使用
 *
 * 自定义hook：
 * 约定：以use开头
 * 主要作用：组件之间一些重用的逻辑状态（之前是高阶组件或者是props）
 *
 * 其他的一些api：
 * 基础hook：
 *    useState: 初始化state，以及修改state
 *    useEffect：相当于componentDidMounth、componentDidUpdate和 componentWillUnmount 的集合
 *    useConetxt：接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
 * 额外的hook：
 *    useReducer： useState的替换方案， 可返回state以及一个dispath, 在逻辑复杂的环境下使用
 *    useCallback: 返回一个 memoized 的回调函数， useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
 *    useMemo：返回一个 memoized 的值，useMemo(() => fn, deps)当 deps 变化的时候，才会执行该方法，用于性能优化
 *    useRef：返回一个 ref 对象
 *    useImperativeHandle：在使用 ref 的时候，暴露给父组件的实例值
 *    useLayoutEffect：会在 DOM 变更后同步调用 useEffect。用处: 读取DOM布局并同父触发渲染。优先使用 useEffect，出问题的时候在尝试使用该方法
 *    useDebugValue： 在 devTool 中显示自动以的 hook 标签
 *
 */

function Hook() {
  const [count, setCount] = useState(0); // useState参数为初始值；取值使用数组解构，第一个参数为声明的state，第二个为改变state的函数
  const [time, setTime] = useState(new Date().valueOf()); // 可生命多个
  // 相当于componentDidMounth、componentDidUpdate和 componentWillUnmount 的组合
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => {
      // 返回一个函数，在组件注销的时候，执行一些操作，相当于 componentWillUnmount
      console.log("使用hook，在组件注销的时候，执行componentWillUnmount方法");
      document.title = "document";
    };
  }, [count]); // 只有早count改变的时候，才会执行effect里面的方法。传递空数组，只在componentDidMount的时候运行一次
  return (
    <div>
      <p>your clicked {count} times</p>
      <p>current {time}</p>
      <button onClick={() => setCount(count + 1)}>change Count</button>
      <br />
      <button onClick={() => setTime(new Date().valueOf())}>change time</button>
    </div>
  );
}
export default Hook;
