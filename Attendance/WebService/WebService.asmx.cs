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
        public void Lec_Register(string sub, string time, string person)
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
        public void Lec_Fix(string num, string sub, string time, string person)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "update class set className= '" + sub + "', time= " + int.Parse(time) + ", proFessor= '" + person + "' where no=" + int.Parse(num);
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
            string sql = "select id, classNo, date, time from classSchedule where classNo=" + classno;
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
        public void Sch_Register(string no, string date, string time)
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
        public void Sch_Fix(string classNo, string date, string time)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "update classSchedule set classNo= '" + int.Parse(classNo) + "', date= '" + date + "', time= '" + time + "' where classNo=" + int.Parse(classNo)+" and date='"+ date + "'";

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
        [WebMethod]
        public void Att_List_Lookup(string no, string from_date, string until_date)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray att_list = new JArray();
            JObject json = new JObject();
            string sql = "select " +
                            "   A.No, " +
                            "   A.className, " +
                            "   A.professor, " +
                            "   B.date, " +
                            "   B.time, " +
                            "   B.student_name, " +
                            "   B.att " +
                            "from class as A " +
                            "   left join Att_table as B " +
                            "       on A.no = B.classNo " +
                            "where A.no =" + int.Parse(no) + " and B.date BETWEEN '" + from_date + "' and '" + until_date + "' " +
                            "order by B.date";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["No"] = rdr["No"].ToString();
                obj["className"] = rdr["className"].ToString();
                obj["professor"] = rdr["professor"].ToString();
                obj["date"] = rdr["date"].ToString();
                obj["time"] = rdr["time"].ToString();
                obj["student_name"] = rdr["student_name"].ToString();
                obj["att"] = rdr["att"].ToString();
                att_list.Add(obj);
            }
            json.Add("att_list", att_list);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Stu_Register(string stu_name, string stu_identity, string ph)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "INSERT into Stu_Table (stu_name, stu_identity, ph) " +
                "values ('" + stu_name + "', '" + stu_identity + "', '" + ph + "')";

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Stu_List_Lookup()
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray stu_list = new JArray();
            JObject json = new JObject();
            string sql = "SELECT stu_name, stu_identity, ph from Stu_Table";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["stu_name"] = rdr["stu_name"].ToString();
                obj["stu_identity"] = rdr["stu_identity"].ToString();
                obj["ph"] = rdr["ph"].ToString();
                stu_list.Add(obj);
            }
            json.Add("stu_list", stu_list);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Stu_Delete(string stu_name)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "DELETE Stu_Table where stu_name='" + stu_name + "'";

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Stu_Update(string global_old_stu_identity, string stu_name, string stu_identity, string ph)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "update Stu_Table set stu_name= '" + stu_name + "', stu_identity= '" + stu_identity + "', ph= '" + ph + "' where stu_identity='" + global_old_stu_identity + "'";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Lec_Lea_Lookup(string no)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray scheduleitems = new JArray();
            JObject json = new JObject();
            string sql = "select " +
                         "  B.No, " +
                         "  B.className, " +
                         "  A.stu_name, " +
                         "  A.stu_identity " +
                         "from Learner_Table as A " +
                         "  left join class as B " +
                         "      on A.classNo = B.no " +
                         "where B.no =" + int.Parse(no);
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["No"] = rdr["No"].ToString();
                obj["className"] = rdr["className"].ToString();
                obj["stu_name"] = rdr["stu_name"].ToString();
                obj["stu_identity"] = rdr["stu_identity"].ToString();
                scheduleitems.Add(obj);
            }
            json.Add("scheduleitems", scheduleitems);
            Context.Response.Write(json.ToString());
        }
        [WebMethod]
        public void Lea_Delete(string stu_name,string no)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            string status = "success";

            string sql = "DELETE Learner_Table where  stu_name='" + stu_name + "' and classNo=" + int.Parse(no);

            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.ExecuteNonQuery();

            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }


        [WebMethod]
        public void Popup_List_Push_Learner(string classNo, string arr_obj)
        {
            JArray arrObj = JArray.Parse(arr_obj);
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlTransaction tran = null;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            tran = con.BeginTransaction();
            JObject json = new JObject();
            string status = "success";
            try
            {
                for (int i = 0; i < arrObj.Count; i++)
                {
                    string sql = "insert into Learner_Table values('" + classNo + "', '" + arrObj[i]["stu_name"].ToString() + "', '" + arrObj[i]["stu_identity"].ToString() + "')";

                    cmd.CommandText = sql;
                    cmd.CommandType = System.Data.CommandType.Text;

                    cmd.ExecuteNonQuery();
                }
                tran.Commit();
            }
            catch(Exception e) {
                tran.Rollback();
            }
            finally
            {
                if (con != null) con.Dispose();
                if (cmd != null) cmd.Dispose();
            }
            json.Add("status", status);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Login(string email)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray user_list = new JArray();
            JObject json = new JObject();
            string sql = "SELECT user_name, email, password from Users where email='" + email + "'";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["user_name"] = rdr["user_name"].ToString();
                obj["email"] = rdr["email"].ToString();
                obj["password"] = rdr["password"].ToString();
                user_list.Add(obj);
            }
            json.Add("user_list", user_list);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Main_Dash_Board(string class_table)
        {
            JArray classtable = JArray.Parse(class_table);
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JObject json = new JObject();
            JArray jobj = new JArray();
            string status = "success";

            string sql = "CREATE TABLE #tmp( " +
                         "  className varchar(50), " +
                         "  result float " +
                         ") " +
                         "DECLARE @class_name varchar(50) " +
                         "DECLARE @total_att float " +
                         "DECLARE @no_class float " +
                         "DECLARE @no_classStudent float " +
                         "DECLARE @result float ";
            for(int i = 0; i < classtable.Count; i++)
            {
                sql += "select @class_name = className from class where no=" + classtable[i]["No"] + " " +
                       "select " +
                       "    @total_att = count(student_name) " +
                       "from att_table " +
                       "where classNo =" + classtable[i]["No"] + " and att ='Yes' " +
                       "select " +
                       "    @no_class = count(distinct date) " +
                       "from att_table " +
                       "where classNo=" + classtable[i]["No"] + " " +
                       "select " +
                       "    @no_classStudent = count(stu_identity) " +
                       "from learner_table " +
                       "where classNo=" + classtable[i]["No"] + " " +
                       "set @result = @total_att / (@no_class * @no_classStudent ) * 100 " +
                       "insert #tmp values (@class_name, @result) ";
            }
            sql += "select * from #tmp";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["className"] = rdr["className"].ToString();
                obj["result"] = Math.Round(double.Parse(rdr["result"].ToString()));
                jobj.Add(obj);
            }

            json.Add("status", status);
            json.Add("items", jobj);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Dash_Board_List_Lookup()
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray dashboard_item = new JArray();
            JObject json = new JObject();
            string sql = 
                         "select " +
                         "  A.No, " +
                         "  A.className, " +
                         "  A.proFessor, "+
                         "  stu_num = count(B.stu_identity) " +
                         "from class as A " +
                         "  left join Learner_Table as B " +
                         "      on A.no = B.classNo " +
                         "group by A.No, A.className, A.proFessor";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["No"] = rdr["No"].ToString();
                obj["className"] = rdr["className"].ToString();
                obj["proFessor"] = rdr["proFessor"].ToString();
                obj["stu_num"] = rdr["stu_num"].ToString();
                dashboard_item.Add(obj);
            }
            json.Add("dashboard_item", dashboard_item);
            Context.Response.Write(json.ToString());
        }

        [WebMethod]
        public void Upping_Lecture_Lookup()
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            con.Open();
            JArray upping_lecture = new JArray();
            JObject json = new JObject();
            string sql =
                         "select " +
                         "  A.className, " +
                         "  A.proFessor, " +
                         "  B.time " +
                         "from class as A " +
                         "  left join classSchedule as B " +
                         "      on A.no = B.classNo " +
                         "Where FORMAT(DATEADD(DAY, 1, GETDATE()), 'yyyy-MM-dd') = B.date " +
                         "  or FORMAT(GETDATE(), 'yyyy-MM-dd') = B.date ";
            cmd.CommandText = sql;
            cmd.CommandType = System.Data.CommandType.Text;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                JObject obj = new JObject();
                obj["className"] = rdr["className"].ToString();
                obj["proFessor"] = rdr["proFessor"].ToString();
                obj["time"] = rdr["time"].ToString();
                upping_lecture.Add(obj);
            }
            json.Add("upping_lecture", upping_lecture);
            Context.Response.Write(json.ToString());
        }
    }
}
