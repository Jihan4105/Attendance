using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json.Linq;

namespace Attendance.WebService
{
    /// <summary>
    /// WebService의 요약 설명입니다.
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // ASP.NET AJAX를 사용하여 스크립트에서 이 웹 서비스를 호출하려면 다음 줄의 주석 처리를 제거합니다. 
    [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {

        [WebMethod]
        public void Lec_Lookup()
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray items = new JArray();
            JObject json = new JObject();
            string sql = "SELECT No, className, proFessor, time, roomNo from class";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["No"] = rdr["No"].ToString();
                obj["className"] = rdr["className"].ToString();
                obj["proFessor"] = rdr["proFessor"].ToString();
                obj["time"] = rdr["time"].ToString();
                obj["roomNo"] = rdr["roomNo"].ToString();
                items.Add(obj);
            }
            json.Add("items", items);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Lec_Delete(int classNo)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "DELETE class where no=" + classNo.ToString();

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Lec_Register(string sub,string time,string person)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "INSERT into class (className, proFessor, time) " +
                "values ('" + sub + "', '" + person + "', " + int.Parse(time) + ")";

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Lec_Fix(string num,string sub, string time, string person)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "update class set className= '" + sub + "', time= " + int.Parse(time) + ", proFessor= '" + person + "' where no="+int.Parse(num);
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Lec_Schedule_Class_Lookup()
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray scheduleitems = new JArray();
            JObject json = new JObject();
            string sql = "SELECT No, className from class";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["No"] = rdr["No"].ToString();
                obj["className"] = rdr["className"].ToString();
                scheduleitems.Add(obj);
            }
            json.Add("scheduleitems", scheduleitems);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Lec_Schedule_Lookup(string classno)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray scheduleitems = new JArray();
            JObject json = new JObject();
            string sql = "select id, classNo, date, time from classSchedule where classNo="+classno;
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["id"] = rdr["id"].ToString();
                obj["classNo"] = rdr["classNo"].ToString();
                obj["date"] = rdr["date"].ToString();
                obj["time"] = rdr["time"].ToString();
                scheduleitems.Add(obj);
            }
            json.Add("scheduleitems", scheduleitems);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Sch_Register(string no,string date, string time)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "INSERT into classSchedule (classNo, date, time) " +
                "values ('" + int.Parse(no) + "','" + date + "', '" + time + "')";

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Sch_Fix(string id,string classNo,string date,string time)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "update classSchedule set classNo= '" + int.Parse(classNo) + "', date= '" + date + "', time= '" + time + "' where id=" + int.Parse(id);

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Sch_Delete(string id)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "DELETE classSchedule where id=" + int.Parse(id);

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }
    }
}
