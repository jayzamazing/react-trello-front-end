export const submitUpdate = (events, data, field) => {

  if (events.charCode === 13) {
    events.preventDefault();
    events.target.blur();
  }
}
export const blurUpdate = (that, form) => {
  that.refs[form].dispatchEvent(new Event("submit"));
}
