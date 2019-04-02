using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.IO;
using System.Web.Script.Serialization;
using Excel = Microsoft.Office.Interop.Excel;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using System.Threading;
using System.Configuration;

namespace PBIRESTapitest
{
    public class AddRowsClass
    {
        private GlobalVariables gv;
        private string token;
        private HttpWebRequest request;
        private string powerBIApiUrl;
        private dataset[] set;
        private string datasetName;
        private string tableName;

        public AddRowsClass(string Token, dataset [] sets, string datasetName, string tableName)
        {
            token = Token;
            this.set = sets;
            this.datasetName = datasetName;
            this.tableName = tableName;
        }

        //public void AddRows(Int64 ID, string ProdName, Int64 ProdPrice)
        public void AddRows(object p)
        {
            string json = "{\"rows\":[";
            //Product p = new Product();
            //p.ID = ID;
            //p.name = ProdName;
            //p.price = ProdPrice;
            json += JsonConvert.SerializeObject(p) + ",";
            json = json.Remove(json.Length - 1);
            json += "]}";

            powerBIApiUrl = "https://api.powerbi.com/v1.0/myorg";
            request = System.Net.WebRequest.Create(string.Format(powerBIApiUrl + "/datasets/{0}/tables/{1}/rows", (from d in set where d.Name == datasetName select d).FirstOrDefault().Id, tableName)) as System.Net.HttpWebRequest;
            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentLength = 0;
            request.ContentType = "application/json";
            request.Headers.Add("Authorization", String.Format("Bearer {0}", token));

            byte[] byteArray = System.Text.Encoding.UTF8.GetBytes(json);

            request.ContentLength = byteArray.Length;

            using (Stream writer = request.GetRequestStream())
            {
                writer.Write(byteArray, 0, byteArray.Length);
                var response = (HttpWebResponse)request.GetResponse();
                Console.WriteLine(response + " | " + response.StatusDescription);
            }
            request.Abort();
        }
    }
}