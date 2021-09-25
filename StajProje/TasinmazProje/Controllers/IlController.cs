using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Context;
using WebApi.DbOperations;

namespace TasinmazProje.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IlController : ControllerBase
    {
        private readonly TasinmazDbContext _context;
        public IlController(TasinmazDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Il> GetIl()
        {
            var ilListe = _context.Iller.OrderBy(x => x.Id).ToList<Il>();
            return ilListe;
        }
        [HttpGet("{id}")]
        public Il IlGetById(int id)
        {
            var il = _context.Iller.Where(x => x.Id == id).SingleOrDefault();
            return il;
        }
        [HttpPost]
        public IActionResult AddIl([FromBody] Il yeniIl)
        {
            var il = _context.Iller.SingleOrDefault(x => x.Id == yeniIl.Id);
            if (il != null)
                return BadRequest();
            _context.Iller.Add(yeniIl);
            _context.SaveChanges();
            return Ok();
        }
    }
}