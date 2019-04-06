import React from 'react';
// import './function';


class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="general">
                    <div className="top">
                        <div className="chart">
                            <div id="chartdiv"></div>
                        </div>
                        <div className="order">
                            2
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="content">
                            3
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
