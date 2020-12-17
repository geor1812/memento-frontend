import React, {Component} from "react";

class Checklist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        }
    }

    render() {
        let unchecked = this.state.items.filter(item => item.checked === false)
        return(
            <div className="container bg-secondary">
                <ul className="p-0">
                    {unchecked.map((item)=>(
                        <li className="list-group-item bg-dark text-light">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"/>
                                <label contentEditable="true" className="form-check-label">{item.content}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            )
    }
}

export default Checklist;