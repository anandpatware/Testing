<%@ Page Language="C#" AutoEventWireup="true"  MasterPageFile="~/MasterPage.master" CodeFile="Registration.aspx.cs" Inherits="Registration" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="Navbar" runat="server">

    <div id="regformParent" style="display:block;">

        <form id="regform" runat="server">
            <div id="regform-fieldsparent" style="display:flex;flex-direction:column;">
                <h1 style="text-align:center; margin-top:13px;margin-bottom:13px">Registration</h1>
                <div id="inputs">
                    <div class="field-validation-parent">
                        <div class="entry">
                            <asp:Label for="name" runat="server">Name</asp:Label>
                            <asp:TextBox ID="name" runat="server" autocomplete="true" style="border:none;"></asp:TextBox>
                        </div>
                        <div id="name-error" style="color:red"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <asp:Label for="username" runat="server">User Name</asp:Label>
                            <asp:TextBox ID="username" runat="server" autocomplete="true" style="border:none;"></asp:TextBox>
                        </div>
                        <div id="username-error" style="color:red"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <asp:Label for="email" runat="server">Email</asp:Label>
                            <asp:TextBox ID="email" runat="server" autocomplete="true" style="border:none;"></asp:TextBox>
                        </div>
                        <div id="email-error" style="color:red"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <asp:Label for="password" runat="server">Password</asp:Label>
                            <asp:TextBox ID="password" runat="server" autocomplete="true" TextMode="Password" style="border:none;"></asp:TextBox>
                        </div>
                        <div id="password1-error" style="color:red"></div>
                    </div>
                    <div class="field-validation-parent">
                        <div class="entry">
                            <asp:Label for="confirmPassword" runat="server">Confirm Password</asp:Label>
                            <asp:TextBox ID="confirmPassword" runat="server" autocomplete="true" TextMode="Password" style="border:none;"></asp:TextBox>
                        </div>
                        <div id="password2-error" style="color:red"></div>
                    </div>

              
                </div>
                <div id="btn-section">
                   <asp:Button ID="registerButton" runat="server" Text="Register Now"  OnClientClick=" return Register.Check();" 
    OnClick="RegisterBtnClicked" style="color:rgb(75,74,74);background-color:white;margin-bottom:14px;height:30px" />

                    <div id="register">Already have an Account? Please Login <a href="./Login.aspx">Here</a></div>
                </div>
            </div>
        </form>
    </div>
    
        <script>
            window.onload = function () {

               
                Register.Init();
                Register.name.focus();
                Register.CheckValidation();
           
        }

        </script>

    
</asp:Content>
