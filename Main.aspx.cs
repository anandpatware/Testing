using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Main : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //if (Application["Username"] == null)
        //{
        //    Response.Redirect("Login.aspx");
        //}
       

        HttpCookie authCookie = Request.Cookies["user"];
        if (authCookie == null || string.IsNullOrEmpty(authCookie["username"]) ||string.IsNullOrEmpty(authCookie["password"]))
        {

            Response.Redirect("Login.aspx");
        }
    }
    protected void Logout_Click(object sender,EventArgs e)
    {
       // Application.Clear();
     
       
        HttpCookie authCookie = Request.Cookies["user"];
        if( authCookie != null && !string.IsNullOrEmpty(authCookie["username"])&&! string.IsNullOrEmpty(authCookie["password"]))
        {
            authCookie.Expires = DateTime.Now.AddMinutes(-1); // Expire the cookie immediately
            Response.Cookies.Add(authCookie);
        }
    

    Response.Redirect("Login.aspx");

    }
}