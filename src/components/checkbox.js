import React from 'react';

export default class Checkbox extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }
    render() {
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
              <input className={this.props.inputClass}
                  {...this.props.input}
                  id={this.props.input.name}
                  type={this.props.type}
                  ref={input => (this.input = input)}
              />
              <label htmlFor={this.props.input.name} className={this.props.labelclass}>
                  {this.props.label}
                  {error}
                  {warning}
              </label>
            </div>
        );
    }
}
