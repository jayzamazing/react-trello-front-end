import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import Input from './input';
import Checkbox from './checkbox';
import {createUser} from '../actions/users';
import {login} from '../actions/auth';
import './registration-form.css';
// import {Link} from 'react-router-dom';

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
              label={["I accept the Terms of Service, and Privacy Policy."]}
              component={Checkbox}
              labelclass="checkbox-label"
              type="checkbox"
              name="acceptTerms"
              validate={[required]}
              divClass="inline-block space"
              inputClass="checkbox-space"
            />

          <button className="block btn btn-success create-acc-btn"
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
