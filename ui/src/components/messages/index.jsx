import React from 'react'


class Messages extends React.Component {

    renderMessage (message) {
        const { member, text }  = message;
        const { currentMember } = this.props;
        const messageFromMe     = member.id === currentMember.id;
        const className         = messageFromMe ? 'Messages-message currentMember' : 'Messages-message';
        return (
            <li className={className}>
                <span className="avatar" style={{backgroundColor: member.color}} />
                <div className="Message-content">
                    <div className="username">
                        {member.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }

    render () {
        const { messages } = this.props;
        return (
            <ul className="Messages-list">
                { messages.map(message => this.renderMessage(message)) }
            </ul>
        );
    }
}


export default Messages;
