let myPlugins = {};
myPlugins.install = function () {
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase();
    console.log(params);
  });
};
export default myPlugins;
