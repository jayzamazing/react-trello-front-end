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
                    id={this.props.input.name}
                    ref={input => (this.input = input)}
                    placeholder={this.props.placeholder}
                    defaultValue={this.props.defaultValue}
                    onKeyPress={this.props.onKeyPress}
                    onBlur={this.props.input.onBlur}
                >
                </textarea>
            </div>
        );
    }
}
