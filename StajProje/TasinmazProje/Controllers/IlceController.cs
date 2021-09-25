using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.DbOperations;

namespace TasinmazProje.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IlceController : ControllerBase
    {
        private readonly TasinmazDbContext _context;
        public IlceController(TasinmazDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> IlceGet()
        {
            var ilce = await _context.Ilceler.OrderBy(x=>x.Id).ToListAsync<Ilce>();
            return Ok(ilce);
        }
        [HttpGet("{Ilid}")]
        public async Task<IActionResult> IlceGetById(int Ilid)
        {
            var ilce = await _context.Ilceler.Where(x => x.IlId == Ilid).ToListAsync();
            return Ok(ilce);
        }
        [HttpPost]
        public IActionResult AddIlce([FromBody] Ilce yeniIlce)
        {
            var ilce = _context.Ilceler.SingleOrDefault(x => x.Id == yeniIlce.Id);
            if (ilce != null)
                return BadRequest();
            _context.Ilceler.Add(yeniIlce);
            _context.SaveChanges();
            return Ok();
        }

    }
}