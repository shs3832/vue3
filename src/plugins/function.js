export default function functionPlugin(app, option) {
  const person = {
    name: "function plugin test",
    say() {
      alert(this.name);
    },
    ...option,
  };

  app.config.globalProperties.$functionPerson = person;
  app.provide("functionPerson", person);
}
