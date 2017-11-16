import React from 'react';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }
    render() {
        const Element = this.props.element || 'input';
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }
        return (
            <div className={this.props.divClass}>
                <label htmlFor={this.props.input.name} className={this.props.labelclass}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <Element className={this.props.inputClass}
                    name={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    placeholder={this.props.placeholder}
                    defaultValue={this.props.defaultValue || ''}
                    onChange={this.props.input.onChange}
                />
            </div>
        );
    }
}
