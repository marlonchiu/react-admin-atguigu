import {connect} from 'react-redux'
import Counter from '../components/Counter'
import {increment, decrement} from '../redux/actions'

// 指定向Counter传入哪些一般属性(属性值的来源就是store中的state)
// function mapStateToProps(state) {
//   return {
//     count: state
//   }
// }
const mapStateToProps = (state) => ({count: state})


// 指定向Counter传入哪些函数属性

/*如果是函数, 会自动调用得到对象, 将对象中的方法作为函数属性传入UI组件*/
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: (number) => dispatch(increment(number)),
//     decrement: (number) => dispatch(decrement(number)),
//   }
// }

/*如果是对象, 将对象中的方法包装成一个新函数, 并传入UI组件 */
const mapDispatchToProps = { increment, decrement }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// export default connect(
//   state => ({count: state}),
//   {increment, decrement}
// )(Counter)