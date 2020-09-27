import React from 'react';
import './App.css';
// import Item from './Item';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { ic_delete_forever } from 'react-icons-kit/md/';
import { Icon } from 'react-icons-kit';
import { edit } from 'react-icons-kit/fa/edit';
import { checkmark2 } from 'react-icons-kit/icomoon/checkmark2';

class App extends React.Component {
    state = {
        list: [],
        input: '',
        error: '',
        edit: '',
        isEditing: false,
    };

    updateInputValue = (e) => {
        this.setState({
            input: e.target.value,
        });
        console.log(this.state.list);
    };
    updateEditInputValue = (e) => {
        this.setState({
            edit: e.target.value,
        });
    };

    enterPressed = (e) => {
        //enter tasks using ENTER key
        var code = e.keyCode || e.which;
        if (code === 13) {
            //ENTER key=13
            this.setState({
                input: e.target.value,
            });
            this.onAddItemClick();
        }
    };
    onAddItemClick = () => {
        var task = { name: this.state.input, isFinished: false };
        if (!task) {
            this.setState({
                error: 'Please Enter Valid Name!',
            });
            return false;
        }
        this.setState({
            list: [...this.state.list, task],
            input: '',
            error: '',
        });
    };

    onFinishItemClick = (i) => {
        const array = this.state.list.slice();
        if (array[i].isFinished === false) {
            array[i].isFinished = true;
            this.setState({ list: array });
        } else {
            array[i].isFinished = false;
            this.setState({ list: array });
        }
    };

    onEditItemClick = (i) => {
        this.setState({ isEditing: true });
        let listCopy = [...this.state.list];
        let item = '';
        listCopy[i].name = item;
        this.setState({ list: listCopy });
    };

    onDeleteItemClick = (i) => {
        var listCopy = [...this.state.list]; // make a separate copy of the array
        if (i !== -1) {
            listCopy.splice(i, 1); //at position i, remove 1 item
            this.setState({ list: listCopy });
        }
    };

    onDeleteAllItemsClick = () => {
        this.setState({ list: [], error: '', isEditing: false });
    };

    onEditButtonClick = () => {
        //loop the array to fins the empty string(item)
        for (var i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].name === '') {
                var index = i;
            }
        }
        let listCopy = [...this.state.list];
        listCopy[index].name = this.state.edit;
        this.setState({ list: listCopy, edit: '', isEditing: false });
    };

    render() {
        return (
            <div className="ui-container">
                <div className="header">To-do List</div>
                <div className="error">{this.state.error}</div>
                <div className="input">
                    <InputGroup>
                        <FormControl
                            className="text-input"
                            onChange={this.updateInputValue}
                            value={this.state.input}
                            onKeyPress={this.enterPressed}
                            placeholder="Name:"
                            aria-label="Name:"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-success" onClick={this.onAddItemClick}>
                                Add Item
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className="items">
                    {this.state.list.map((item, i) => (
                        <div
                            className={`banner ${this.state.list[i].isFinished ? 'item-finished' : 'item'}`}
                            key={i}
                        >
                            <div
                                className={`banner ${
                                    this.state.list[i].isFinished ? 'finished-item-name' : 'item-name'
                                }`}
                            >
                                {this.state.list[i].name}
                            </div>
                            <div className="item-icons">
                                <div className="finish-icon" style={{ color: '#00FF00' }}>
                                    <Icon size={29} icon={checkmark2} onClick={() => this.onFinishItemClick(i)} />
                                </div>
                                <div className="edit-icon" style={{ color: '#808080' }}>
                                    <Icon size={27} icon={edit} onClick={() => this.onEditItemClick(i)} />
                                </div>
                                <div className="delete-icon" style={{ color: '#FF0000' }}>
                                    <Icon
                                        size={29}
                                        icon={ic_delete_forever}
                                        onClick={() => this.onDeleteItemClick(i)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`banner ${this.state.isEditing ? 'edit' : 'edit-hide'}`}>
                    <InputGroup>
                        <FormControl
                            className="edit-input"
                            onChange={this.updateEditInputValue}
                            value={this.state.edit}
                            placeholder="Edit your task:"
                            aria-label="Edit your task:"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-warning" onClick={this.onEditButtonClick}>
                                Edit
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>

                <div className="clear">
                    <Button variant="outline-danger" onClick={this.onDeleteAllItemsClick}>
                        Delete All Items
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
