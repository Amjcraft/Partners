import * as React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows : []
        };
    }

    componentDidMount() {
        getConditionsByCityName.call(this, DEFAULT_CITIES[0].city).then((response)=>{
            console.log(response)
            this.setState({rows: [response.data.main]});
        })
      }

    render() {
        const gridProps = {
            rows: this.state.rows   
        };

        return (
            <input { ...gridProps }></Grid>
        )
    }
}