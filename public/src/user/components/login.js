import * as React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const gridProps = {
            rows: this.state.rows
        };

        return (
            <input {...gridProps}></Grid>
        )
    }
}