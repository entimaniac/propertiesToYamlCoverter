import React from 'react';
import './App.css';
import lodash from 'lodash'
import YAML from 'json2yaml'
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Enter properties here',
            properties: "nothing yet"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let lines = this.state.value.split(/\r?\n/);
        let properties = {};
        for (let line of lines) {
            if (line.charAt(0) && line.charAt(0) !== '#') {
                let parsedLine = line.split(/=(.+)/);
                let pieces = parsedLine[0].split('.');
                let value = parsedLine[1];
                lodash.setWith(properties, pieces, value, Object);
            }
        }
        let ymlText = YAML.stringify(properties);
        this.setState({properties: ymlText});
        event.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            properties:
                            <textarea value={this.state.value} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </header>
                <div>
                        <pre style={{textAlign: 'left'}}>
                            <SyntaxHighlighter language="yaml" style={docco}>
                                {`${this.state.properties}`}
                            </SyntaxHighlighter>
                        </pre>
                </div>
            </div>
        );
    }

}

export default App;
