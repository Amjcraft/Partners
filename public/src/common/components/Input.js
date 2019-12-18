import * as React from 'react';

export class Input extends Component {
    render() {
        const {
            checked,
            children,
            defaultValue,
            error,
            formField,
            label,
            name,
            onChange,
            tooltip,
            tooltipOffsetSelector,
            type,
            uiModifiers,
            uiScopes,
            uiStates,
            value,
            view
        } = this.props;

        let { className, disabled } = this.props;

        const { id } = this;

        uiModifiers[type] === true;

        const uiProps = {
            uiModifiers,
            uiScopes,
            uiStates,
            uiQA: {
                [formField]: !!formField
            }
        };

        const labelCmp = label
            ? (
                <Label {...{ htmlFor: id, uiModifiers, uiScopes, tooltip }}>
                    {label}
                </Label>
            )
            : null;

        const errorCmp = error
            ? (
                <ErrorMessage {...{ uiModifiers, uiScopes }}>
                    {error}
                </ErrorMessage>
            )
            : null;

        let checkBoxImage;
        if (type === 'checkbox') {
            const labelClassName = INPUT_BEM.checkBoxImage(uiProps);
            checkBoxImage = (
                <label {...{
                    htmlFor: id,
                    className: labelClassName,
                    tooltipOffsetSelector
                }}
                />
            );
        }

        let extraLabelCmp;
        if (children) {
            const extraLabelClassName = INPUT_BEM.extraLabel(uiProps);
            extraLabelCmp = (
                <label {...{
                    htmlFor: id,
                    className: extraLabelClassName,
                    tooltipOffsetSelector
                }}
                >
                    {children}
                </label>
            );
        }

        if (view && view !== FORM_VIEW_STATE_LOADED) {
            disabled = true;
        }



        const inputProps = {
            className: INPUT_BEM.input(uiProps),
            checked,
            value: value || defaultValue,
            disabled,
            id,
            name,
            onChange,
            type
        };

        className = INPUT_BEM.block({
            className,
            ...uiProps
        });

        return (
            <div {...{ className }}>
                <input {...inputProps} />
                {extraLabelCmp}
                {checkBoxImage}
                {labelCmp}
                {errorCmp}
            </div>
        );
    }

    componentWillMount() {
        this.id = uniqueId('input');
    }

    static propTypes = {
        checked: bool,
        children: any,
        className: string,
        defaultChecked: bool,
        defaultValue: any,
        disabled: bool,
        error: string,
        formField: string,
        label: any,
        name: string,
        onChange: func,
        required: bool,
        store: object,
        tooltip: object,
        tooltipOffsetSelector: string,
        type: string,
        uiModifiers: object,
        uiScopes: object,
        uiStates: object,
        value: any,
        view: string
    };

    static defaultProps = {
        disabled: false,
        required: false,
        type: 'text',
        uiModifiers: {},
        uiScopes: {},
        uiStates: {},
        view: FORM_VIEW_STATE_LOADED
    };
}