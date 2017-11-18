import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import Input from './input';
import Checkbox from './checkbox';
import {createUser} from '../actions/users';
import {login} from '../actions/auth';
import './registration-form.css';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
      const {email, password, fullName} = values;
      const user = {email, password, fullName};
      return this.props
          .dispatch(createUser(user))
          .then(() => this.props.dispatch(login(email, password)));
  }
  render() {
    return (
        <form
            className="login-form"
            onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
            <Field
              label="Name"
              component={Input}
              type="text"
              name="fullName"
              validate={[required, nonEmpty, isTrimmed]}
              inputClass="input-field form-control"
            />
            <Field
              label="Email"
              component={Input}
              type="text"
              name="email"
              validate={[required, nonEmpty, isTrimmed]}
              inputClass="input-field form-control"
            />
            <Field
              label="Password"
              component={Input}
              type="password"
              name="password"
              validate={[required, length({min: 10, max: 72}), isTrimmed]}
              inputClass="input-field form-control"
            />
            <Field
              label={["I accept the ", <a href="#" key="0">Terms of Service</a>," and ", <a href="#" key="1">Privacy Policy</a>]}
              component={Checkbox}
              type="checkbox"
              name="acceptTerms"
              validate={[required]}
              divClass="inline-block space"
              inputClass="checkbox-space"
            />

          <button className="block btn btn-success"
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
      dispatch(focus('login-form', Object.keys(errors)[0]))
})(RegistrationForm);
