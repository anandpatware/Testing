

function GetVala (callback,flag=1) {

    console.log("inside get vala--------------------------------");
    callback = callback || function (data) {
        console.log("Default callback - Data from GetVala:", data);
    };




    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState == 4 && xhr.status == 200) {

             // document.getElementById("response").innerHTML = xhr.responseText;
            var data = JSON.parse(xhr.responseText);
            callback(data);
            if (flag == 0) {
                Display(data);
            }

        }
    };

    xhr.open("GET", "Handler.ashx?method=get", true);

    xhr.send();



}



function Display (dataArray) {
        this.ClearTable();
      //  const records = ContactDetailsObject.ListOfContacts;
        const addEntry = document.getElementById("addEntry");
    for (let i = 0; i < dataArray.length; i++) {
    //   console.log("tbdoy data le rha hu -------------" + JSON.stringify(dataArray[ i ]));
        const row = document.createElement("tr");

            row.innerHTML = `<td style="width:5%">${ i + 1 }</td>
                             <td>${ dataArray[ i ].fname }</td>
                             <td>${ dataArray[ i ].lname }</td>
                             <td>${ dataArray[ i ].phone }</td>
                             <td>${ dataArray[ i ].email }</td>
                             <td><button id="edit" class="editButton" onclick="ContactDetailsObject.EditRecord(${ i })"  >Edit</button> </td>
                             <td><button id="delete" class="deleteButton" onclick="ContactDetailsObject.DeleteRecord(${ i })">Delete</button> </td>`;
       // console.log("tbdoy data le rha hu -------------" + JSON.stringify(row));
            addEntry.appendChild(row);
        }
    }

function ClearTable () {
    const table = document.getElementById("customers");
    var tbody = table.getElementsByTagName("tbody")[ 0 ];

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}