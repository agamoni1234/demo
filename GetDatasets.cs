using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.IO;
using System.Web.Script.Serialization;

namespace PBIRESTapitest
{
    public class GetDatasetsClass
    {
        private GlobalVariables gv;
        private string token;
        private HttpWebRequest request;

        public GetDatasetsClass(string Token)
        {
            token = Token;

            string powerBIApiUrl = "https://api.powerbi.com/v1.0/myorg/datasets";
            request = System.Net.WebRequest.Create(powerBIApiUrl) as System.Net.HttpWebRequest;
            request.KeepAlive = true;
            request.Method = "GET";
            request.ContentLength = 0;
            request.ContentType = "application/json";
            request.Headers.Add("Authorization", String.Format("Bearer {0}", token));
        }

        public dataset[] GetDatasets()
        {
            using (HttpWebResponse httpResponse = request.GetResponse() as System.Net.HttpWebResponse)
            {
            
                using (StreamReader reader = new System.IO.StreamReader(httpResponse.GetResponseStream()))
                {
                    string responseContent = reader.ReadToEnd();

                    JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
                    Datasets datasets = (Datasets)jsonSerializer.Deserialize(responseContent, typeof(Datasets));
                    Console.WriteLine("Inside GetDatasets : ",datasets);
                    return datasets.value;
                }
            }
        }
    }
}