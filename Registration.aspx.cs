using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using System.Configuration;
public partial class Registration : System.Web.UI.Page
{
    private static  string connectionString = ConfigurationManager.ConnectionStrings["DbString"].ConnectionString;
    SqlConnection con = new SqlConnection(connectionString);
    protected void Page_Load(object sender, EventArgs e)
    {
 
        
    }

    protected void RegisterBtnClicked(object sender,EventArgs e)
    {
        //1.validate the form
   
        if (ValidateUser())
        {
            //save data in table
            try
            {

                con.Open();
                
                    SqlCommand cmd = new SqlCommand("INSERT INTO users VALUES (@username, @name, @email, @password)", con);
                cmd.Parameters.AddWithValue("@username", username.Text);
                cmd.Parameters.AddWithValue("@name", name.Text);
                cmd.Parameters.AddWithValue("@email", email.Text);
                cmd.Parameters.AddWithValue("@password", password.Text);
               

                cmd.ExecuteNonQuery();
              
                con.Close();

                Application["RegistrationSuccess"] = "Registration successful";
                Response.Redirect("Login.aspx");

            }
            catch (Exception ex)
            {
                 Response.Write($"Error: {ex.Message}");
            }
        

        }
        else
        {
            Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('Fill All Fields Correctly')</script>");



        }

    }

    protected bool ValidateUser()
    {
       
        if (string.IsNullOrEmpty(name.Text) || string.IsNullOrEmpty(username.Text) ||
    string.IsNullOrEmpty(email.Text) || string.IsNullOrEmpty(password.Text) ||
    string.IsNullOrEmpty(confirmPassword.Text))
        {

            return false;
        }

        con.Open();
        string query = "select * from users where username = @username1 ";

        SqlCommand cmd = new SqlCommand(query, con);
        cmd.Parameters.AddWithValue("@username1", username.Text);

       
        SqlDataReader data = cmd.ExecuteReader();
        
        if (data.HasRows)
        {
            Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('Username already exist !!')</script>");
                        
            return false;
        }


        con.Close();


        if (name.Text.Any(char.IsDigit))
        {
           
          //  ScriptManager.RegisterStartupScript(this, GetType(), "nameValidationError", "alert('Name should not contain integers.');", true);
            return false;
        }

        if (password.Text != confirmPassword.Text)
        {
            Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('password and confirm password doesnt match')</script>");
            return false;
        }

        Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('Registeration successfull')</script>");
        return true;
    }
}