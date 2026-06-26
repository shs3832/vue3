export default {
  install(app, option) {
    const person = {
      name: "person test",
      say() {
        alert(this.name);
      },
      ...option,
    };
    app.config.globalProperties.$person = person;
    app.provide("person", person);
  },
};
