"use server";
const actionLogin = async () => {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
  console.log("reees", res);

  // return res;
};
export { actionLogin };
