using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace Glemmen_Kantine
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            getFromProducts();
        }

        private void getFromProducts()
        {
            var connString = ConfigurationManager.ConnectionStrings["ConnCms"].ConnectionString;
            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * from produkter", conn);
                cmd.CommandType = CommandType.Text;
                SqlDataReader reader = cmd.ExecuteReader();
                dt.Load(reader);
                reader.Close();
                conn.Close();
            }

            foreach (DataRow row in dt.Rows)
            {
                HtmlTableRow htmlRow = new HtmlTableRow();

                foreach (DataColumn column in dt.Columns)
                {
                    HtmlTableCell htmlCell = new HtmlTableCell();
                    htmlCell.InnerText = row[column.ColumnName].ToString();

                    htmlRow.Cells.Add(htmlCell);
                }

                InvisListMat.Rows.Add(htmlRow);
            }
        }

        protected void removeProduct(object sender, EventArgs e)
        {
            string product = productRemovalField.Value.ToString();

            var connectionString = ConfigurationManager.ConnectionStrings["connCms"].ConnectionString;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("delete from produkter where pNavn = '" + product + "';", conn);
                cmd.CommandType = CommandType.Text;

                cmd.ExecuteNonQuery();
                conn.Close();
            }
            Page.Response.Redirect(Page.Request.Url.ToString(), true);
        }
        protected void addProduct(object sender, EventArgs e)
        {
            string product = $@"{add1.Value}, '{add2.Value}', {add3.Value}, '{add4.SelectedItem.Text}', '{add5.Value}', '{add6.Value}'";

            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + product + "')", true);

            var connectionString = ConfigurationManager.ConnectionStrings["connCms"].ConnectionString;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("insert into produkter values (" + product + ")", conn);
                cmd.CommandType = CommandType.Text;

                cmd.ExecuteNonQuery();
                conn.Close();
            }
            Page.Response.Redirect(Page.Request.Url.ToString(), true);
        }
    }
}