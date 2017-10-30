import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import Input from './input';
import {createUser} from '../actions/users';
import {login} from '../actions/auth';
import './registration-form.css';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
      const {username, password, fullName} = values;
      const user = {username, password, fullName};
      return this.props
          .dispatch(createUser(user))
          .then(() => this.props.dispatch(login(username, password)));
  }
  render() {
    return (
        <form
            className="login-form"
            onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
            <label htmlFor="fullName">Name</label>
            <Field component={Input} type="text" name="fullName" />
            <label htmlFor="username">Username</label>
            <Field
                component={Input}
                type="text"
                name="username"
                validate={[required, nonEmpty, isTrimmed]}
            />
            <label htmlFor="password">Password</label>
            <Field
                component={Input}
                type="password"
                name="password"
                validate={[required, length({min: 10, max: 72}), isTrimmed]}
            />
            <Field
                component={Input}
                type="checkbox"
                name="acceptTerms"
                validate={[required]}
            />
          <label htmlFor="acceptTerms">I accept the <a>Terms of Service</a> and <a>Privacy Policy</a></label>
          <button className="block"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Create New Account
          </button>
        </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
