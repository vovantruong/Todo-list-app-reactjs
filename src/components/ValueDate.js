const currDate = new Date();
let day = currDate.getDate();
let month = currDate.getMonth() + 1;
let year = currDate.getFullYear();
let hour = currDate.getHours();
let minute = currDate.getMinutes();

export const time = hour + ":" + minute + " " + day + "/" + month + "/" + year;
