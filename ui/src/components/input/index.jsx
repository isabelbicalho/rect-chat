import React from 'react'


class InputMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: '' }
    }

    onChange(event) {
        this.setState({ text: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ text: '' });
        this.props.onSendMessage(this.state.text);
    }

    render() {
        return (
            <div className="Input">
                <form onSubmit={event => this.onSubmit(event)}>
                    <input
                        onChange={event => this.onChange(event)}
                        value={this.state.text}
                        type="text"
                        placeholder="Enter your message and press ENTER"
                        autoFocus={true}
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}


export default InputMessage;
