using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;

public partial class Login : System.Web.UI.Page
{
    private static string connectionString = ConfigurationManager.ConnectionStrings["DbString"].ConnectionString;
    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            username.Text = "";
            password.Text = "";


            HttpCookie cookie = Request.Cookies["user"];
            if (cookie != null && !string.IsNullOrEmpty(cookie["username"]) && !string.IsNullOrEmpty(cookie["password"]))
            {
                Response.Redirect("Main.aspx");
            }


            //if (Application["RegistrationSuccess"] != null)
            //{
            //    Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('Registration successful')</script>");
            //    Application["RegistrationSuccess"] = null;
            //}

            //if (Application["Username"] != null)
            //{
            //    Response.Redirect("Main.aspx");
            //}
        }
    }


    protected void Login_Click(object sender, EventArgs e)
    {
      
        try
        {
        
            if (!string.IsNullOrEmpty(username.Text) && !string.IsNullOrEmpty(password.Text))
            {


                // perform validation
                // send this data to db
               
                 SqlConnection con = new SqlConnection(connectionString);
   
             
                string query = "select * from users where username = @username1 and password = @password1";

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@username1", username.Text);
                cmd.Parameters.AddWithValue("@password1", password.Text);
                con.Open();
                SqlDataReader data = cmd.ExecuteReader();
                if (data.HasRows)
                {
                    HttpCookie cookie = new HttpCookie("user");
                    cookie["username"] = username.Text;
                    cookie["password"] = password.Text;
                    cookie.Expires = DateTime.Now.AddSeconds(30);
                    Response.Cookies.Add(cookie);


                    Application["Username"] = username.Text;
                    con.Close();

                    // Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('login success')</script>");
                    Response.Redirect("Main.aspx");
                }

                else
                {
                    // tell him invalid credentials`
                    con.Close();
                     Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('login failed - Invalid Credentials')</script>");
                }

                // Session["Username"] = username.Text;
                // Response.Redirect("Main.aspx");
            }
            else
            {
                Response.Redirect("Main.aspx");
            }
        }catch(Exception ex)
        {
            Console.WriteLine($"Exception in Login_Click: {ex.Message}");
            
        }
    }
};
    
