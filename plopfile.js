module.exports = (plop) => {
  plop.setGenerator("starmoozie:component", {
    description: "Create a reusable component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "./src/pages/Private/{{pascalCase name}}/index.jsx",
        templateFile: "./templates/index.jsx.hbs",
      },
    ],
  });
};
