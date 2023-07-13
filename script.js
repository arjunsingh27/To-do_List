var itemData = document.querySelectorAll("input").innerText;
console.log(itemData);
function store() {
    const inputData = document.getElementById("newTask");
    const taskData = inputData.value;
    console.log(taskData);
    if (taskData != "") {
        const listitem = document.createElement("li");
        const listbutton = document.createElement("button");
        listbutton.innerText = "X";
        listbutton.classList.add("btn");
        listitem.innerText = taskData;
        listitem.append(listbutton);
        const list = document.getElementById("mylist");
        list.appendChild(listitem);
        inputData.value = "";
        const listItemBtn = document.querySelectorAll("ul li button");

        for (var i = 0; i < listItemBtn.length; i++) {
            listItemBtn[i].addEventListener("click", function (event) {
                var parentElement = event.target.parentNode;
                parentElement.remove();
            });
        }
    }
    else {
        console.log("not data");
    }
}

function searchList(){
    const fullList = document.querySelectorAll("ul li");
    
}


