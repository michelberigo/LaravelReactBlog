import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'

if (document.getElementById('app')) {
    ReactDOM.render(<Routes />, document.getElementById('app'));
}
