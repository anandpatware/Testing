// Global variables and functions
window.onload = function () {
    GetVala(function (dataArray) {
        console.log("Data from GetVala:", dataArray);
        ContactDetailsObject.ListOfContacts = dataArray;
    },0);
}


var ContactDetailsObject = {
    ListOfContacts: [],
    CurrentSelectedRow: -1,
    CurrentdeletedRow: -1,



    

    AddOkBtnClicked: function (entry) {



        const table = document.getElementById("customers");
    


        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                 console.log(xhr.responseText);
                ContactDetailsObject.ListOfContacts.push(entry);

                const row = table.insertRow();
                const cell = row.insertCell();
                cell.style.width = "5%";
                const text = document.createTextNode(row.rowIndex);
                cell.appendChild(text);


                //show code
                Object.values(entry).slice(0, 4).forEach((value) => {
                    const cell = row.insertCell();
                    const text = document.createTextNode(value);
                    cell.appendChild(text);
                });


                const editcell = row.insertCell();
                const editButton = document.createElement("button");

                editButton.innerText = "Edit";
                editButton.className = "editButton";
                editButton.onclick = function () {
                    ContactDetailsObject.EditRecord(row.rowIndex - 1);
                };
                editcell.appendChild(editButton);

                const deletecell = row.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.className = "deleteButton";
                deleteButton.onclick = function () {
                    ContactDetailsObject.DeleteRecord(row.rowIndex - 1);
                };
                deletecell.appendChild(deleteButton);

              
            }

           
        };

        xhr.open("POST", "Handler.ashx", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send("data=" + JSON.stringify(entry) + "&method=add");

        this.ResetForm();
      

    },


    EditOkBtnClicked: function (editedRow) {

        console.log("inside edit callback function");

        const table = document.getElementById("customers");

    
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
       
                const editingRow = ContactDetailsObject.ListOfContacts[ ContactDetailsObject.CurrentSelectedRow ];

                const row = table.rows[ ContactDetailsObject.CurrentSelectedRow + 1 ];

                if (editingRow.fname !== editedRow.fname) {
                    ContactDetailsObject.ListOfContacts[ ContactDetailsObject.CurrentSelectedRow ].fname = editedRow.fname;
                    row.cells[ 1 ].innerText = editedRow.fname;
                }
                if (editingRow.lname != editedRow.lname) {
                    ContactDetailsObject.ListOfContacts[ ContactDetailsObject.CurrentSelectedRow ].lname = editedRow.lname;
                    row.cells[ 2 ].innerText = editedRow.lname;
                }
                if (editingRow.email != editedRow.email) {
                    ContactDetailsObject.ListOfContacts[ ContactDetailsObject.CurrentSelectedRow ].email = editedRow.email;
                    row.cells[ 4 ].innerText = editedRow.email;
                }
                if (editingRow.address1 != editingRow.address1) {
                    ContactDetailsObject.ListOfContacts[ ContactDetailsObject.CurrentSelectedRow ].address1 = editedRow.address1;
                    row.cells[ 1 ].innerText = editedRow.fname;
                }
                if (editingRow.address2 != editingRow.address2) {
                    ContactDetailsObject.ListOfContacts[ ContactDetailsObject.CurrentSelectedRow ].address2 = editedRow.address2;
                    row.cells[ 1 ].innerText = editedRow.fname;
                }

            }
        }

        xhr.open("POST", "Handler.ashx", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("data=" + JSON.stringify(editedRow) + "&method=update");
    },

    DeleteCancelBtnClicked: function () {

        console.log("hey u are delete cancelbtnclicked");



        const table = document.getElementById("customers");
        const deleteBox = document.getElementById("deletebox");
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        deleteBox.style.zIndex = "999";
        deleteBox.style.display = "none";
        table.style.opacity = 1;

    }
    ,

    DeleteOkBtnClicked: function () {

        console.log("hey u are delete okbtnclicked");


   
        let phone = ContactDetailsObject.ListOfContacts[ ContactDetailsObject.CurrentdeletedRow ].phone;
        console.log(phone);



        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {

            }
        }

       
        xhr.open("POST", "Handler.ashx", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("data=" + phone + "&method=delete");

        ContactDetailsObject.ListOfContacts.splice(ContactDetailsObject.CurrentdeletedRow, 1);
        console.log(`successfully deleted the  ${ ContactDetailsObject.CurrentdeletedRow } entry from table`);
        const table = document.getElementById("customers");

        table.deleteRow(ContactDetailsObject.CurrentdeletedRow + 1);

        for (let i = ContactDetailsObject.CurrentdeletedRow + 1; i < table.rows.length; i++) {
            const row = table.rows[ i ];
            row.cells[ 0 ].innerText = i;

        }
    
        console.log(ContactDetailsObject.ListOfContacts);

        this.DeleteCancelBtnClicked();

    }


    ,
    AddNewRecord: function () {
      
       // this.SessionCheck();
        AddDlg.Init();
        AddDlg.Showdlg(this.AddOkBtnClicked);
        console.log(this.ListOfContacts);
    },

    EditRecord: function (editingId) {
   
       // this.SessionCheck();
        this.CurrentSelectedRow = editingId;
        console.log(editingId);
        EditDlg.Init();
        EditDlg.Showdlg(this.EditOkBtnClicked);
        console.log("editing the record");
    },

    DeleteRecord: function (deletingId) {
       
      //  this.SessionCheck();
        this.CurrentdeletedRow = deletingId;
        // DeleteRow.ShowDlg();
        const table = document.getElementById("customers");

        const deleteBox = document.getElementById("deletebox");

        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        deleteBox.style.zIndex = "1001";
        deleteBox.style.display = "block";
        table.style.opacity = .3;

        console.log("deleting the new record");
    },

    SessionCheck: function () {
        var name = "username" + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        var cook = null;
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[ i ].trim();
            if (cookie.indexOf(name) === 0) {
                cook = cookie.substring(name.length, cookie.length);
            }
            console.log("Cookie:", cookie);
        }
        if (cook == null) {
            alert(" Session out - Login Again ");
            window.location.href = 'Login.aspx';
            return;
        }
    }


};

var AddDlg = {

    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    address1: null,
    address2: null,
    okCallBack: null,
    cancelCallBack: null,
    Ok: null,
    Cancel: null,

    ResetForm: function () {
        this.firstName.value = "";
        this.lastName.value = "";
        this.phone.value = "";
        this.email.value = "";
        this.address1.value = "";
        this.address2.value = "";
    },

    //it will contain ok callback and cancel call back with para to initialize global array
    Init: function () {
        this.firstName = document.getElementById("fname");
        this.lastName = document.getElementById("lname");
        this.phone = document.getElementById("phone");
        this.email = document.getElementById("email");
        this.address1 = document.getElementById("address1");
        this.address2 = document.getElementById("address2");
         this.CustomValidation();
        console.log(
            this.firstName,
            this.lastName,
            this.phone,
            this.email,
            this.address1,
            this.address2
        );
    },

    Showdlg: function (okCallBack) {
        this.okCallBack = okCallBack;


        const table = document.getElementById("customers");
        const form = document.getElementById("addformParent");
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        form.style.zIndex = "1001";
        document.getElementById('overlay').style.display = 'block';
        form.style.display = "block";
        //table.style.opacity = 0.3;
        this.firstName.focus();
    },

    Ok: function () {

        const entry = {
            fname: this.firstName.value,
            lname: this.lastName.value,
            phone: this.phone.value,
            email: this.email.value,
            address1: this.address1.value,
            address2: this.address2.value,
        };

        console.log(`object created on add btn clicked ${ entry }`);

        if (entry != null && this.Validate()) {
            this.okCallBack(entry);
            this.Cancel();
        }


    },

    Cancel: function () {
        const table = document.getElementById("customers");
        const form = document.getElementById("addformParent");
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        form.style.zIndex = "999";
        form.style.display = "none";
        table.style.opacity = 1;
    }
    ,

    Validate: function () {
        this.CustomValidation();
        if (!this.firstName.value || !this.lastName.value || !this.phone.value || !this.email.value || !this.address1.value || !this.address2.value) {
            alert("All fields are required");
            return false;
        }

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(this.phone.value)) {
            alert("Enter a valid 10-digit phone number");
            return false;
        }

        if (ContactDetailsObject.ListOfContacts.some(Contact => Contact.phone === this.phone.value)) {
            alert("Number already exist");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(this.email.value)) {
            alert("Enter a valid email address");

            return false;
        }

        return true;
    }
    ,
    CustomValidation: function () {
        const firstnameerror = document.getElementById("firstname-error");
        const lastnameerror = document.getElementById("lastname-error");
        const phoneerror = document.getElementById("phone-error");
        const emailerror = document.getElementById("email-error");

        const fname = document.getElementById("fname");
        const lname = document.getElementById("lname");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");


        const nameRegex = /^[A-Za-z]+$/;

        fname.addEventListener("keyup", () => {
            if (!nameRegex.test(fname.value)) {
                firstnameerror.innerHTML = "please enter the valid first name";
                firstnameerror.style.color = "red";
            }
            else {
                firstnameerror.innerHTML = "";
            }
        });
        lname.addEventListener("keyup", () => {
            if (!nameRegex.test(lname.value)) {
                lastnameerror.innerHTML = "please enter the valid last name";
                lastnameerror.style.color = "red";
            }
            else {
                lastnameerror.innerHTML = "";
            }

        });
        const phonePattern = /^[0-9]{10}$/;

        phone.addEventListener("keyup", () => {
            if (!phonePattern.test(phone.value)) {
                phoneerror.innerHTML = "please enter the valid phone number";
                phoneerror.style.color = "red";
            }
            else {
                phoneerror.innerHTML = "";
            }

        });
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        email.addEventListener("keyup", () => {
            if (!emailPattern.test(email.value)) {
                emailerror.innerHTML = "please enter the valid email id";
                emailerror.style.color = "red";
            }
            else {
                emailerror.innerHTML = "";
            }

        });
    }
};


var EditDlg = {
    getEditedfirstName: null,
    getEditedlastName: null,
    getEditedphone: null,
    getEditedemail: null,
    getEditedaddress1: null,
    getEditedaddress2: null,
    okCallBack: null,
    cancelCallBack: null,
    Ok: null,
    Cancel: null,

    Init: function () {

        this.getEditedfirstName = document.getElementById("efname");
        this.getEditedlastName = document.getElementById("elname");
        this.getEditedphone = document.getElementById("ephone");
        this.getEditedemail = document.getElementById("eemail");
        this.getEditedaddress1 = document.getElementById("eaddress-1");
        this.getEditedaddress2 = document.getElementById("eaddress-2");

        console.log(
            this.getEditedfirstName,
            this.getEditedlastName,
            this.getEditedphone,
            this.getEditedemail,
            this.getEditedaddress1,
            this.getEditedaddress2
        );
    },

    Showdlg: function (okCallBack) {

        this.okCallBack = okCallBack;


        const inputField = document.getElementById("ephone");


        inputField.readOnly = true;

        const editform = document.getElementById("editformParent");

        const table = document.getElementById("customers");

        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        editform.style.zIndex = "1001";
        document.getElementById("editform").style.display = 'block';
        editform.style.display = "block";
        table.style.opacity = .3;



        this.FillEditForm();


        this.CustomValidation();

        this.getEditedfirstName.focus();
    },
    Ok: function () {
        const editedRow = {
            fname: EditDlg.getEditedfirstName.value,
            lname: EditDlg.getEditedlastName.value,
            phone: EditDlg.getEditedphone.value,
            email: EditDlg.getEditedemail.value,
            address1: EditDlg.getEditedaddress1.value,
            address2: EditDlg.getEditedaddress2.value,
        }
        if (this.Validate()) {
            this.okCallBack(editedRow);
            this.Cancel();
        }

    },
    Cancel: function () {

        const table = document.getElementById("customers");
        const form = document.getElementById("editformParent");
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        form.style.zIndex = "999";
        form.style.display = "none";
        table.style.opacity = 1;
    },

    FillEditForm: function () {
        if (ContactDetailsObject.CurrentSelectedRow != -1) {
            const records = ContactDetailsObject.ListOfContacts;
            
            console.log(records[ ContactDetailsObject.CurrentSelectedRow ]);
            document.getElementById("efname").value = records[ ContactDetailsObject.CurrentSelectedRow ].fname;
            document.getElementById("elname").value = records[ ContactDetailsObject.CurrentSelectedRow ].lname;
            document.getElementById("ephone").value = records[ ContactDetailsObject.CurrentSelectedRow ].phone;
            document.getElementById("eemail").value = records[ ContactDetailsObject.CurrentSelectedRow ].email;
            document.getElementById("eaddress-1").value = records[ ContactDetailsObject.CurrentSelectedRow ].address1;
            document.getElementById("eaddress-2").value = records[ ContactDetailsObject.CurrentSelectedRow ].address2;

        }

    }

    , Validate: function () {
        this.CustomValidation();
        if (!this.getEditedfirstName.value || !this.getEditedlastName.value || !this.getEditedphone.value || !this.getEditedemail.value || !this.getEditedaddress1.value || !this.getEditedaddress2.value) {
            alert("All fields are required");
            return false;
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.getEditedemail.value)) {
            alert("Enter a valid email address");

            return false;
        }

        return true;
    },


    CustomValidation: function () {
        const efirstnameerror = document.getElementById("efirstname-error");
        const elastnameerror = document.getElementById("elastname-error");

        const eemailerror = document.getElementById("eemail-error");


        const efname = document.getElementById("efname");
        const elname = document.getElementById("elname");

        const eemail = document.getElementById("eemail");
        const nameRegex = /^[A-Za-z]+$/;

        efname.addEventListener("keyup", () => {
            if (!nameRegex.test(efname.value)) {
                efirstnameerror.innerHTML = "please enter the valid first name";
                efirstnameerror.style.color = "red";
            }
            else {
                efirstnameerror.innerHTML = "";
            }
        });
        elname.addEventListener("keyup", () => {
            if (!nameRegex.test(elname.value)) {
                elastnameerror.innerHTML = "please enter the valid last name";
                elastnameerror.style.color = "red";
            }
            else {
                elastnameerror.innerHTML = "";
            }

        });



        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        eemail.addEventListener("keyup", () => {
            if (!emailPattern.test(eemail.value)) {
                eemailerror.innerHTML = "please enter the valid email id";
                eemailerror.style.color = "red";
            }
            else {
                eemailerror.innerHTML = "";
            }

        });

    },



}


