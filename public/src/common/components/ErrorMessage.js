/* eslint-disable react/no-set-state */
import React, { Component } from 'react';

import { propTypes } from 'mozu-adminui-core-util';

import { ERROR_MESSAGE_BEM } from './../constants';

import './../style/main.styl';

const { any, bool, object, string } = propTypes;

export class ErrorMessage extends Component {
    render() {
        const {
            children,
            keepLastError,
            uiModifiers,
            uiScopes,
            uiStates
        } = this.props;

        const { lastError } = this.state;

        const uiProps = { uiModifiers, uiScopes, uiStates };

        const className = ERROR_MESSAGE_BEM.block(uiProps);

        const textClassName = ERROR_MESSAGE_BEM.text(uiProps);

        const content = keepLastError
            ? lastError
            : children;

        return (
            <span {...{ className }}>
                <span {...{ className: textClassName }}>
                    {content}
                </span>
            </span>
        );
    }

    componentWillReceiveProps({ children }) {
        if (children) {
            this.setState({ lastError: children });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            lastError: props.children
        };
    }

    static propTypes = {
        children: any,
        htmlFor: string,
        keepLastError: bool,
        uiModifiers: object,
        uiScopes: object,
        uiStates: object
    };

    static defaultProps = {
        keepLastError: true,
        uiModifiers: {},
        uiScopes: {},
        uiStates: {}
    };
}

export default ErrorMessage;
