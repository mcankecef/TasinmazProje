using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasinmazProje.Models;
using WebApi.Context;
using WebApi.Models;

namespace TasinmazProje.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogController : ControllerBase
    {
        private readonly TasinmazDbContext _context;
        public LogController(TasinmazDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Log> LogGetir()
        {
            var logListe = _context.Loglar.OrderByDescending(x => x.LogId).ToList<Log>();
            return logListe;
        }
        [HttpGet("{List}")]
        public IActionResult List([FromQuery] string searchText, [FromQuery] int? page, [FromQuery] int pagesize = 10)
        {
            var query = string.IsNullOrEmpty(searchText) ? _context.Loglar : _context.Loglar.Where(e =>
                                                                    e.Aciklama.ToLower().Contains(searchText.ToLower())
                                                                    || e.IslemTip.ToLower().Contains(searchText.ToLower()));
            int totalCount = query.Count();

            PageResult<Log> result = new PageResult<Log>
            {
                Count = totalCount,
                PageIndex = page ?? 1,
                PageSize = pagesize,
                Items = query.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
            };
            return Ok(result);
        }
        [HttpGet("api/{search}")]
        public async Task<IActionResult> Search(string search = "")
        {
            var query = await _context.Loglar.Where(x => 
                x.Aciklama.ToLower().Contains(search.ToLower())
            || x.IslemTip.ToLower().Contains(search.ToLower())
            ||  x.Durum.ToString().Contains(search.ToString().ToLower())
            || x.TarihSaat.ToString().Contains(search.ToString().ToLower()) 
            || x.Ip.ToLower().Contains(search.ToLower()))

            .ToListAsync();
            return Ok(query);
        }
        private  string Durum(string durum)
        {
            string a ="";
            if(durum == "başarılı")
            {
                a="true";
            }
            else if(durum=="başarısız"){
                a="false";
            }
            return a;
                
        }

    }
}