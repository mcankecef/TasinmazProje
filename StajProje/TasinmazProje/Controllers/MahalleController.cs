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
    public class MahalleController : ControllerBase
    {
        private readonly TasinmazDbContext _context;

        public MahalleController(TasinmazDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMahalle()
        {
            var mahalleListe =await _context.Mahalleler.OrderBy(x => x.Id).ToListAsync<Mahalle>();
            return Ok(mahalleListe);
        }
        [HttpGet("{ilceId}")]
        public async Task<IActionResult> GetMahalleById(int ilceId)
        {
            var mahalle =await _context.Mahalleler.Where(x => x.IlceId == ilceId).ToListAsync();
            return Ok(mahalle);
        }
        [HttpPost]
        public IActionResult AddMahalle([FromBody] Mahalle yeniMahalle)
        {
            var mahalle = _context.Mahalleler.SingleOrDefault(x => x.Id == yeniMahalle.Id);
            if (mahalle != null)
                return BadRequest();
            _context.Mahalleler.Add(yeniMahalle);
            _context.SaveChanges();
            return Ok();
        }

    }
}