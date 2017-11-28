export const submitUpdate = (events) => {
  if (events.charCode === 13) {
    events.preventDefault();
    events.target.blur();
  }
}
export const blurUpdate = (that, form) => {
  that.refs[form].dispatchEvent(new Event("submit"));
}
