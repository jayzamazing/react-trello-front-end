export const submitUpdate = (events, data, field) => {
  if (events.charCode === 13) {
    events.preventDefault();
    events.target.blur();
  } else if (data) {
    data[field] = events.target.value;
    return data;
  }

}
export const blurUpdate = (that, form) => {
  that.refs[form].dispatchEvent(new Event("submit"));
}
