
class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            editVal: this.props.todoName,
            toChose: this.props.todoChose
        }
        this.editVal = this.editVal.bind(this);
        this.emitDeleteTask = this.emitDeleteTask.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.editTask = this.editTask.bind(this);
        this.isComplete = this.isComplete.bind(this);
    }
    editVal(e){
        var thEl = e.target.value;
        this.setState({editVal: thEl});
    }
    emitDeleteTask(){
        this.props.emitDeleteItem(this.props.index);
    }
    toggleEdit(){
        var toggleSwitch = !this.state.edit;
        this.setState({edit: toggleSwitch});
    }
    editTask(){
        this.props.emitEditItem(this.state.editVal, this.props.index);
        this.toggleEdit();
    }
    isComplete(){
        var chose = !this.state.toChose;
        this.setState({toChose: chose});
        console.log('This complete task: ' + this.props.index);
    }
    render(){
        return (
            <li className="todoItem">
                <label className="todoChose">
                    {!this.state.toChose && <input className="todoChose__input" type="checkbox" onChange={this.isComplete} />}
                    {this.state.toChose && <input className="todoChose__input" type="checkbox" onChange={this.isComplete} checked />}
                    <span className="todoChose__switch">
                        <i className="ion-checkmark-round"></i>
                    </span>
                </label>
                <button type="button" className="todoEditBtn" onClick={this.toggleEdit}>
                    <i className="ion-edit"></i>
                </button>
                <button type="button" className="todoDelete" onClick={this.emitDeleteTask}>
                    <i className="ion-close-round"></i>
                </button>
                <div className="todoItemHeader"></div>
                <div className="todoItemInner" data-complete={this.state.toChose}>
                    <span className="todoName">{this.props.todoName}</span>
                    <div className="todoEdit" data-open={this.state.edit} >
                        <div className="todoEditInner">
                            <input type="text" className="todoEditInput" placeholder="Введите имя таска" onChange={this.editVal} />
                            <button type="button" className="todoEditEnter" onClick={this.editTask}>
                                <i className="ion-checkmark-round"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <span className="taskToggleComplete" onClick={this.isComplete}>
                    {!this.state.toChose && <i className="ion-ios-star-outline"></i>}
                    {this.state.toChose && <i className="ion-ios-star complete"></i>}
                </span>
            </li>
        );
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.emitDeleteTask = this.emitDeleteTask.bind(this);
        this.emitEditTask = this.emitEditTask.bind(this);
    }
    emitDeleteTask(i){
        this.props.emitDeleteItem(i);
    }
    emitEditTask(text, i){
        this.props.emitEditItem(text, i);
    }
    render(){
        return (<ul className="todoList">
                    {
                        this.props.data.map((item, i) => {
                            return <TodoItem key={i}
                                             index={i}
                                             todoName={item.name}
                                             todoChose={item.chose}
                                             emitDeleteItem={this.emitDeleteTask}
                                             emitEditItem={this.emitEditTask}
                                    />
                        })
                    }
                </ul>)
    }
}

class TodoBody extends React.Component {
    constructor(props){
        super(props)
        this.emitDeleteTask = this.emitDeleteTask.bind(this);
        this.emitEditTask = this.emitEditTask.bind(this);
    }

    emitDeleteTask(i){
        this.props.emitDeleteItem(i);
    }

    emitEditTask(text, i){
        this.props.emitEditItem(text, i);
    }

    render(){
        return (
            <div className="todoContainer">
                <TodoList data={this.props.data} emitDeleteItem={this.emitDeleteTask} emitEditItem={this.emitEditTask} />
                <div className="todoButtonSet">
                    <button type="button" className="todoBtn"><i className="ion-trash-b"></i></button>
                    <button type="button" className="todoBtn"><i className="ion-checkmark-round"></i></button>
                    <button type="button" className="todoBtn"><i className="ion-ios-heart"></i></button>
                    <button type="button" className="todoBtn"><i className="ion-android-settings"></i></button>
                </div>
            </div>
        );
    }
}
var todos = [
    {
        name: "Тестовый таск",
        chose: false,
        complete: false
    },
    {
        name: "Тестовый таск 5",
        chose: true,
        complete: false
    }
];
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            newVal: '',
            data: todos
        }
        this.addTodo = this.addTodo.bind(this);
        this.inVal = this.inVal.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }
/*
    componentWillMount(){
        var store = JSON.parse(localStorage.getItem('Todos'));
        if(!store){
            let Todos = [
                {
                    name: "Тестовый таск",
                    chose: false,
                    complete: false
                },
                {
                    name: "Тестовый таск 2",
                    chose: false,
                    complete: false
                }
            ];
            localStorage.setItem('Todos', JSON.parse(Todos));
        }
        todos = store;
        this.setState({data: todos});
    }*/
    inVal(e){
        var thEl = e.target.value;
        this.setState({newVal: thEl});
    }
    addTodo(e){
        e.preventDefault();
        var elem = {
            name: this.state.newVal,
            chose: false,
            complete: false
        }
        todos.push(elem);
        this.setState({newVal: ''});
        // localStorage.setItem('Todos', this.state.data);
    }
    deleteTodo(i){
        var arr = this.state.data;
        arr.splice(i, 1);
        this.setState({data: arr});
        // localStorage.setItem('Todos', this.state.data);
    }
    editTodo(text, i){
        // var arr = this.state.data;
        // arr[i] = text;
        // this.setState({data: arr});
        // localStorage.setItem('Todos', this.state.data);
        //
        // console.log(arr[i]);
        // console.log('Tasked ' + i + " " + text);
    }
    render(){
        return (
            <div className="todoInner">
                <div className="todoMain">
                    <div className="todoHeader">
                        <div className="todoContainer">
                            <form onSubmit={this.addTodo} className="todoAddForm">
                                <a href="#" className="logo"><i className="ion-happy-outline"></i></a>
                                <div className="todoFormInner">
                                    <input className="todoInput" onChange={this.inVal} type="text" placeholder="Введите навзание" value={this.state.newVal} />
                                    <button type="submit" className="todoAddhBtn">
                                        <i className="ion-ios-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <TodoBody data={this.state.data} emitDeleteItem={this.deleteTodo} emitEditItem={this.editTodo} />
                    <div className="todoEmpty"></div>
                </div>
                <footer></footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('App'));
