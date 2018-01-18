import React from 'react';

import {tester} from 'sheep';

export default class App extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Hello World {tester()}</h1>
            </div>);
    }
}