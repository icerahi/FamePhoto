import Cookies from "js-cookie";

// export const domain = "http://127.0.0.1:8000";
// export const profile_url = domain+'/accounts'
export const domain = "";

/*
    window.localStorage.setItem('myCat', 'Tom');
    window.localStorage.removeItem('myCat');
    window.localStorage.clear();
    window.localStorage.getItem("token");
    */
// endpoints


const token =  localStorage.getItem("token");

const csrftoken = Cookies.get("csrftoken");

export const getheader = {
  Authorization: `JWT ${token}`,
};


export const postheader = {
  "X-CSRFToken": csrftoken,
};

export const posttokenheader = {
  Authorization: `token ${token}`,
  "X-CSRFToken": csrftoken,
};