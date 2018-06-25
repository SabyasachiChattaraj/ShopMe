// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  FETCH_PRODUCTS_URL:"https://ufvhhtm3s5.execute-api.us-east-2.amazonaws.com/Stage",
  ORDER_MGMT_URL:"https://d2yanpnifh.execute-api.ap-south-1.amazonaws.com/prod/buyproducts",
  USER_MGMT_URL:"https://j8et8no04b.execute-api.us-west-2.amazonaws.com/prod/usermanagement",
  CART_MGMT_URL:"https://6dbcowjcz8.execute-api.ap-south-1.amazonaws.com/prod/cart"
};
