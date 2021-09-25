using WebApi.Context;
using WebApi.Models;
using System.Web;
using System;
using System.Net;
using System.Net.Sockets;
using System.Linq;

namespace TasinmazProje.Models
{
    public class Logger
    {
        public static string LocalIpAddress()
        {
            Func<IPAddress, bool> localIpPredicate = ip =>
                ip.AddressFamily == AddressFamily.InterNetwork &&
                ip.ToString().StartsWith("192.168");
            return Dns.GetHostEntry(Dns.GetHostName()).AddressList.LastOrDefault(localIpPredicate).ToString();
        }
        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }

        public static Log Loglayici(bool durum, string islemTip, string aciklama)
        {
            Log yeniLog = new Log();
            yeniLog.Durum = durum;
            yeniLog.IslemTip = islemTip;
            yeniLog.Aciklama = aciklama;
            yeniLog.TarihSaat = DateTime.Now.Date;
            yeniLog.Ip = GetLocalIPAddress();
            return yeniLog;

        }
    }
}