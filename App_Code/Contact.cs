using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Contact
/// </summary>
public class Contact
{
    public string fname { get; set; }
    public string lname { get; set; }
    public string phone { get; set; }
    public string email { get; set; }
    public string address1 { get; set; }
    public string address2 { get; set; }

    public string userid { get; set; }
    public Contact(string fname, string lname, string phone, string email, string address1, string address2,string userid)
    {
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.userid = userid;
    }
}