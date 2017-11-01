import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import './login-form.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = <div className="form-error">{this.props.error}</div>;
        }
        return (
            <form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="email">Email (or username)</label>
                <Field component={Input} type="text" name="email" id="email"
                    validate={[required, nonEmpty]} inputClass="input-field form-control"/>
                <label htmlFor="password">Password</label>
                <Field component={Input} type="password" name="password" id="password"
                    validate={[required, nonEmpty]} inputClass="input-field form-control"/>
                  <button className="btn btn-success log-in" disabled={this.props.invalid || this.props.submitting}>Log in</button>
            </form>
        );
    }
}

export default reduxForm({form: 'login'})(LoginForm);
