import React from 'react'

import Messages from '../messages'
import InputMessage from '../input'

import '../../css/Chat.css';


function randomName() {
    const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            member: {
                username: randomName(),
                color: randomColor()
            }
        };
        this.drone = new window.Scaledrone('', {
            data: this.state.member
        });
        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const member = { ...this.state.member };
            member.id = this.drone.clientId;
            this.setState({ member });
        });
        const room = this.drone.subscribe("observable-room");
        room.on('data', (data, member) => {
            const messages = this.state.messages;
            messages.push({member, text: data});
            this.setState({messages});
        });
    }

    onSendMessage = (message) => {
        // const messages = this.state.messages
        // messages.push({
        //     text: message,
        //     member: this.state.member
        // })
        // this.setState({ messages: messages })
        this.drone.publish({
            room: "observable-room",
            message
        });
    }

    render() {
        return (
            <div className="Chat">
                <div className="Chat-header"><h1>My Chat App</h1></div>
                <Messages messages={this.state.messages} currentMember={this.state.member} />
                <InputMessage onSendMessage={this.onSendMessage} />
            </div>
        );
    }
}


export default Chat;
