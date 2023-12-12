<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Main.aspx.cs" Inherits="Main" %>

<!DOCTYPE html>

<html lang="en">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PhoneBook</title>

 

    <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
       <link rel="stylesheet" href="./Content/style.css" />
</head>
    <body>
  <div id="overlay"></div>
    <div class="content" style="height:100vh">
        <div class="navbarr">
            <img src="4.png">
            <div id="nav-heading" style="text-transform:uppercase; font-weight:800;font-size:2vw;white-space:nowrap">
                phonebook web application
            </div>
            <div></div>

        </div>

        <div class="comp" style="display:flex;align-items:center;">
            <span id="addContact" onclick="ContactDetailsObject.AddNewRecord()" style="cursor:pointer;font-size:2vw;">Add Contact</span>
           <form runat="server">
            <asp:Button ID="logout" runat="server" Text="Log Out" OnClick="Logout_Click"  style="font-size: 2vw; border:none;background-color:white;height:44px; "/>
               </form>
        </div>

        <div class="parentTable">

            <table id="customers" >

                <thead style="height:30px">

                    <tr>
                        <th style="width:5%">#</th>
                        <th>First Name </th>
                        <th>Last Name </th>
                        <th>Phone No </th>
                        <th>E-mail </th>
                        <th style="padding:5px">Edit</th>
                        <th style="padding:5px">Delete</th>
                    </tr>

                </thead>

                <tbody id="addEntry" >
                </tbody>

            </table>

        </div>
   



        <div id="editformParent" style="background-color:white;box-shadow:0 6px 8px gray;">

            <form id="editform" style="background-color:white">

                <h1 style="text-align:center; margin-top:13px;margin-bottom:13px">Edit Your Contact</h1>

                <div id="editform-fieldsparent">

                    <div class="field-validation-parent">
                        <div class="entry">
                            <label for="efname"> first Name</label>
                            <input id="efname" type="text" />
                        </div>
                        <div id="efirstname-error" ></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <label for="elname">last Name</label>
                            <input id="elname" type="text" />
                        </div>
                        <div id="elastname-error"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <label for="ephone">Phone no.</label>
                            <input id="ephone" type="number" />
                        </div>
                        <div id="ephone-error"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <label for="eemail">Email</label>
                            <input id="eemail" type="email" />
                        </div>
                        <div id="eemail-error"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <label for="eaddress-1">Address-1</label>
                            <input id="eaddress-1" type="text" />
                        </div>
                        <div id="eaddress1-error"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <label for="eaddress-2">Address-2</label>
                            <input id="eaddress-2" type="text" />
                        </div>
                        <div id="eaddress2-error"></div>
                    </div>

                      <div class="btn">
                             <button id="editform-addbtn" type="button" onclick="EditDlg.Ok()">Edit</button>
                             <button id="editform-cancelbtn" type="button" onclick="EditDlg.Cancel()">Cancel</button>
                      </div>

                </div>

</form>

        </div>

        <div id="deletebox">

            <h2 id="deletebox-topheading" >Confirmation</h2>

            <h1 id="deletebox-description">
                are you sure you want to delete this <br />contact ??
            </h1>

            <hr style="text-align:center ;margin-bottom:20px;" />

            <div id="deletebox-btnparent">
                <button id="deletebox-cancelbtn" type="button" onclick="ContactDetailsObject.DeleteCancelBtnClicked()"><h3>Cancel</h3></button>
                <button id="deletebox-deletebtn" type="button" onclick="ContactDetailsObject.DeleteOkBtnClicked()"><h3>Delete</h3></button>
            </div>

        </div>

    </div>


    <div id="addformParent">

        <form id="form">

            <h1 style="text-align:center; margin-top:13px;margin-bottom:13px">Add new Contact</h1>

            <div id="addform-fieldsparent">

                <div class="field-validation-parent">
                    <div class="entry">
                        <label for="fname">first Name</label>
                        <input id="fname" type="text" runat="server" />
                    </div>
                    <div id="firstname-error" ></div>
                </div>

                <div class="field-validation-parent">
                    <div class="entry">
                        <label for="lname" >last Name</label>
                        <input id="lname" type="text" runat="server" />
                    </div>
                    <div id="lastname-error"></div>
                </div>

                <div class="field-validation-parent">
                    <div class="entry">
                        <label for="phone">Phone no.</label>
                        <input id="phone" type="number" runat="server" />
                    </div>
                    <div id="phone-error"></div>
                </div>

                <div class="field-validation-parent">
                    <div class="entry">
                        <label for="email">Email</label>
                        <input id="email" type="email" runat="server" />
                    </div>
                    <div id="email-error"></div>
                </div>

                <div class="field-validation-parent">
                    <div class="entry">
                        <label for="address1">Address-1</label>
                        <input id="address1" type="text" runat="server" />
                    </div>
                    <div id="address1-error"></div>
                </div>

                <div class="field-validation-parent">
                    <div class="entry">
                        <label for="address2">Address-2</label>
                        <input id="address2" type="text" runat="server" />
                    </div>
                    <div id="address2-error"></div>
                </div>

                <div class="btn">
                    <button id="addform-addbtn" type="button" onclick="AddDlg.Ok()">Add</button>
                    <button id="addform-cancelbtn" type="button" onclick="AddDlg.Cancel()">Cancel</button>
                </div>

            </div>

</form>

    </div>
        <script src="./Script/Main.js"></script>
        <script src="./Script/BackendMain.js"></script>

        </body>
    </html>