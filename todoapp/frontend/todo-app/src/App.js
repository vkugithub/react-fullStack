import TodoApp from './components/todo/TodoApp'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './redux/actions'
import {withRouter} from 'react-router'
import './App.css';
function mapStateToProps(state) {
  console.log(state)
    return {
        todos : state.todos,
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)

}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoApp))

export default App