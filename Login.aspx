<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/MasterPage.master" CodeFile="Login.aspx.cs" Inherits="Login" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="Navbar" runat="server">

  <div id="loginformParent" style="display:block;">

        <form id="loginform" runat="server">

           
            
            <div id="loginform-fieldsparent" style="display:flex;flex-direction:column;">

                 <h1 style="text-align:center; margin-top:13px;margin-bottom:13px">login</h1>

                <div id="inputs">
            
               
                <div class="field-validation-parent">
                        <div class="entry">
                            <asp:Label for="username" runat="server" >UserName*</asp:Label>
                            <asp:TextBox ID="username" runat="server" autocomplete="true" style="border:none;"></asp:TextBox>
                        </div>
                        <div id="username-error" style="color:red"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <asp:Label for="password" runat="server">Password*</asp:Label>
                            <asp:TextBox ID="password" runat="server" autocomplete="true" style="border:none;" TextMode ="Password"></asp:TextBox>
                        </div>
                        <div id="password-error" style="color:red"></div>
                    </div>

                    </div>
                 <div id="btn-section">
                    <asp:button id="loginbutton" text="login" onclick="Login_Click"  runat="server" Style="height:36px; margin-bottom:10px;box-shadow:2px 5px 8px gray;border-radius:5px" />
               
          
                      <div id="register">Don't have an Account?  <a href="./Registration.aspx"> RegisterHere</a></div>
                      </div>
                 
          
                    

                      </div>
            

</form>
     
    </div>
    <script>
        window.onload = function () {
            Login.Init();
            Login.username.focus();
            Login.CustomValidation();
        }

    </script>
   
 </asp:Content>