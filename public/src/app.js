import React from 'react';
import ReactDOM from 'react-dom';

//  import 'semantic-ui-less/semantic.less';

import '../semantic-ui/semantic.less';

const title = 'React with Webpack and Babel';

ReactDOM.render(<div>{title}</div>, document.getElementById('app'));

module.hot.accept();
