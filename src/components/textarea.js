import React from 'react';

export default class Textarea extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }
    render() {
        return (
            <div className={this.props.divClass}>
                <textarea className={this.props.textareaClass}
                    {...this.props.input}
                    name={this.props.input.name}
                    ref={input => (this.input = input)}
                    placeholder={this.props.placeholder}
                    onKeyPress={this.props.onKeyPress}
                    onBlur={this.props.input.onBlur}
                    disabled={this.props.disabled}
                    onFocus={e => e.preventDefault}
                >
                </textarea>
            </div>
        );
    }
}
