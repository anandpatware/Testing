<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Web.Services;
using Newtonsoft.Json;
using System.Web.SessionState;
using System.Configuration;

public class Handler : IHttpHandler,IRequiresSessionState {

    private static  string connectionString = ConfigurationManager.ConnectionStrings["DbString"].ConnectionString;
    SqlConnection con = new SqlConnection(connectionString);

    public void ProcessRequest (HttpContext context) {
        HttpCookie cookie = context.Request.Cookies["user"];
        if (context.Request.Cookies["user"] == null)
        {

            HttpContext.Current.Response.Redirect("~/Login.aspx", true); ;
        }
        else
        {
            if (context.Request.QueryString["method"] == "get")
            {
                if (context.Request.Cookies["user"] == null || string.IsNullOrEmpty(context.Request.Cookies["user"]["username"]) || string.IsNullOrEmpty(context.Request.Cookies["user"]["password"]))
                {
                    context.Response.Redirect("Login.aspx");
                }
                else
                {
                    // string user = context.Request.Cookies["user"]["username"];
                    string user = context.Request.Cookies["user"]["username"];
                    List<Contact> ans = GetData(user);
                    string SerAns = JsonConvert.SerializeObject(ans);

                    context.Response.ContentType = "application/json";
                    context.Response.Write(SerAns);
                }

            }
            else if (context.Request.Form["method"] == "add")
            {



                if (context.Request.Cookies["user"] == null || string.IsNullOrEmpty(context.Request.Cookies["user"]["username"]) || string.IsNullOrEmpty(context.Request.Cookies["user"]["password"]))
                {
                    context.Response.Redirect("Login.aspx");
                }
                else
                {
                    // string user = context.Request.Cookies["user"]["username"];
                    string user = context.Request.Cookies["user"]["username"];
                    context.Response.Write(user);
                    Add(context.Request.Form["data"], user);
                }

            }
            else if (context.Request.Form["method"] == "update")
            {
                // Handle POST request for update
                if (context.Request.Cookies["user"] == null || string.IsNullOrEmpty(context.Request.Cookies["user"]["username"]) || string.IsNullOrEmpty(context.Request.Cookies["user"]["password"]))
                {
                    context.Response.Redirect("Login.aspx");
                }
                else
                {
                    // string user = context.Request.Cookies["user"]["username"];
                    string user = context.Request.Cookies["user"]["username"];
                    Update(context.Request.Form["data"]);
                }

            }
            else if (context.Request.Form["method"] == "delete") 
            {
                // Handle POST request for delete\
                if (context.Request.Cookies["user"] == null || string.IsNullOrEmpty(context.Request.Cookies["user"]["username"]) || string.IsNullOrEmpty(context.Request.Cookies["user"]["password"]))
                {
                    context.Response.Redirect("Login.aspx");
                }
                else
                {
                    // string user = context.Request.Cookies["user"]["username"];

                    Delete(context.Request.Form["data"]);
                }

            }
            else if (context.Request.Form["method"] == "login")
            {
                context.Response.Write(Login(context.Request.Form["data"]));

            }
            else if (context.Request.Form["method"] == "register")
            {
                Registration(context.Request.Form["data"]);
            }
            else
            {
                // Handle other requests or provide a default response
                context.Response.ContentType = "text/plain";
                context.Response.Write("Hello World from Default.ashx");
            }

        }
    }

    public bool IsReusable
    {
        get { return false; }
    }

    protected List<Contact> GetData(string user)
    {
        List<Contact> contacts = new List<Contact>();
        con.Open();

        SqlCommand cmd = new SqlCommand("SELECT * FROM addContacts2 where userid=@user", con);
        cmd.Parameters.AddWithValue("@user", user);

        SqlDataReader reader = cmd.ExecuteReader();


        while (reader.Read())
        {
            Contact contact = new Contact(reader["fname"].ToString(), reader["lname"].ToString(), reader["phone"].ToString(), reader["email"].ToString(), reader["address1"].ToString(), reader["address2"].ToString(),reader["userid"].ToString());

            //Response.Write(reader["fname"].ToString() + " " + reader["lname"].ToString() + " " + reader["phone"].ToString() + " " + reader["email"].ToString() + " " + reader["address1"].ToString() + " " + reader["address2"].ToString());
            contacts.Add(contact);
        }



        con.Close();
        return contacts;
    }
    // is username se usertavke se list of contact nikal or usko tod k contact ki list nikal or vo retur kr




    protected void Add(dynamic obj,string user)
    {

        Contact data = JsonConvert.DeserializeObject<Contact>(obj);

        try
        {

            con.Open();
            SqlCommand cmd = new SqlCommand("INSERT INTO addContacts2 VALUES (@fname, @lname, @phone, @email, @address1, @address2,@userid)", con);

            cmd.Parameters.AddWithValue("@fname", data.fname);
            cmd.Parameters.AddWithValue("@lname", data.lname);
            cmd.Parameters.AddWithValue("@phone", data.phone);
            cmd.Parameters.AddWithValue("@email", data.email);
            cmd.Parameters.AddWithValue("@address1", data.address1);
            cmd.Parameters.AddWithValue("@address2", data.address2);
            cmd.Parameters.AddWithValue("@userid", user);


            cmd.ExecuteNonQuery();
            con.Close();


        }
        catch (Exception ex)
        {
            // Response.Write($"Error: {ex.Message}");
        }
    }

    protected void Update(dynamic obj)
    {
        Contact data = JsonConvert.DeserializeObject<Contact>(obj);
        try
        {
            con.Open();
            // SqlCommand cmd = new SqlCommand("UPDATE addContacts SET fname = '"+TextBox1.Value+ "', lname = '" + TextBox2.Value + "', email = '" + TextBox4.Value + "', address1 ='" + TextBox5.Value + "', address2 = '" + TextBox6.Value + "' WHERE phone = '" + TextBox3.Value + "'", con);

            SqlCommand cmd = con.CreateCommand();
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = "UPDATE addContacts2 SET fname = '" + data.fname + "', lname = '" + data.lname + "', email = '" + data.email + "', address1 ='" + data.address1 + "', address2 = '" + data.address2 + "' WHERE phone = '" + data.phone + "'";


            int rowsAffected = cmd.ExecuteNonQuery();
            con.Close();
            // LoadData();
            if (rowsAffected > 0)
            {
                Console.Write("Update successful.");
            }
            else
            {
                Console.Write("No matching record found for update.");
            }
        }
        catch (Exception ex)
        {
            // Response.Write($"Error: {ex.Message}");
        }
        finally
        {
            con.Close();
        }
    }

    protected void Delete(string key)
    {
        con.Open();
        SqlCommand cmd = con.CreateCommand();
        cmd.CommandType = CommandType.Text;
        cmd.CommandText = "delete from addContacts2 where phone='" + key + "'";
        cmd.ExecuteNonQuery();
        con.Close();
        // LoadData();
    }

    private void LoadData()
    {
        // List<Contact> l = new List<Contact>();
        SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM addContacts2", con);
        DataTable dataTable = new DataTable();
        da.Fill(dataTable);
        //GridView1.DataSource = dataTable;
        //GridView1.DataBind();
        da.Dispose();
    }

    protected string Login(dynamic obj) {
        dynamic data = JsonConvert.DeserializeObject<Contact>(obj);

        return data;


        //search in user table if found do psd check  and if correct redirect to dashboard where its contacts here
    }

    protected void Registration(dynamic obj)
    {
        dynamic data = JsonConvert.DeserializeObject<Contact>(obj);
        //store in user table
    }
}