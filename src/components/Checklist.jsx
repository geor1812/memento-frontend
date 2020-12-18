import React, {Component} from "react";
import NoteService from "../service/NoteService";
class Checklist extends Component {
    constructor(props) {
        super(props);
        this.onChangeItemContent = this.onChangeItemContent.bind(this);
        this.addItem = this.addItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.state = {
            items: this.props.items,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.items !== this.props.items) {
            this.setState({
                items: this.props.items
            })
        }
    }

    async onChangeItemContent(index, e) {
        let newItems = this.state.items;
        newItems[index].content = e.target.value;
        await this.setState({
            items: newItems
        });
        this.props.itemChange(this.state.items);
    }

    async onChangeChecked(index) {
        let newItems = this.state.items;
        newItems[index].checked = !(newItems[index].checked);
        await this.setState({
            items: newItems
        });
        this.props.itemChange(this.state.items);
    }

     addItem() {
        let newItem = {
            content: "",
            checked: false,
        }

        this.createItem(newItem);
    }

    createItem(data) {
        NoteService
            .createItem(this.props.noteId, data)
            .then((response)=>{
                let newItems = this.state.items;
                newItems.push(response.data);
                this.setState({
                    items: newItems
                });
            })
            .catch(e=>{
                console.log(e);
            })
    }

    render() {
        return(
            <div className="container bg-secondary">
                <div className="container w-50 text-center">
                    <button type="button" className="btn btn-dark btn-block mb-1" onClick={this.addItem}>Add a list item</button>
                </div>
                <ul className="p-0">
                    {this.state.items.map((item, index)=>(
                        <li className="list-group-item bg-dark">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input "
                                       checked={item.checked ? ("checked"):("")}
                                       onChange={() => this.onChangeChecked(index)}/>
                                <input type="text" contentEditable="true" className="form-control-plaintext bg-dark text-light p-0"
                                        value={item.content} onChange={(e)=>this.onChangeItemContent(index,e)}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            )
    }
}

export default Checklist;