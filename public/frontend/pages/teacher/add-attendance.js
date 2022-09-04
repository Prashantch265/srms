let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

const bs = NepaliFunctions.AD2BS({ year: yyyy, month: mm, day: dd });

today = `${bs.year}-${bs.month}-${bs.day}`;
console.log(today);


document.addEventListener("load", );

function loadHelperData() {
    
}
