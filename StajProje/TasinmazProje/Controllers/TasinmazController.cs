using Microsoft.AspNetCore.Mvc;
using WebApi.Context;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using WebApi.DbOperations;
using Microsoft.Extensions.Logging;
using TasinmazProje.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TasinmazProje.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasinmazController : ControllerBase
    {
        private readonly TasinmazDbContext _context;
        public TasinmazController(TasinmazDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetTasinmaz()
        {

            var tasinmazListe = await _context.Tasinmazlar.Select(x => new
            {
                id = x.Id,
                ada = x.Ada,
                parsel = x.Parsel,
                nitelik = x.Nitelik,
                isActive = x.isActive,
                adres = x.Adres,
                mahalleAdi = x.Mahalleler.MahalleAdi,
                ilceAdi = x.Mahalleler.Ilceler.IlceAdi,
                ilAdi = x.Mahalleler.Ilceler.Iller.IlAd,
                IlId = x.Mahalleler.Ilceler.Iller.Id,
                IlceId=x.Mahalleler.Ilceler.Id,
                MahalleId = x.Mahalleler.Id
            }).Where(x => x.isActive == true).OrderByDescending(x => x.id).ToListAsync();
            _context.Loglar.Add(Logger.Loglayici(false,"Tasinmaz Getir","Tum tasinmazlari getir."));
            await _context.SaveChangesAsync();
            return Ok(tasinmazListe);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> TasinmazGetById(int id)
        {
            var tasinmaz = await _context.Tasinmazlar.Where(x => x.Id == id).Where(x => x.isActive).SingleOrDefaultAsync();
            if (tasinmaz is null)
                return NotFound();
            _context.Loglar.Add(Logger.Loglayici(false, "Tasinmaz Getir", "Id'ye göre tasinmaz getirme"));
            await _context.SaveChangesAsync();
            return Ok(tasinmaz);
        }
        [HttpPost]
        public async Task<IActionResult> AddTasinmaz([FromBody] Tasinmaz yeniTasinmaz)
        {
            var tasinmaz = await _context.Tasinmazlar.FirstOrDefaultAsync(x => x.Ada == yeniTasinmaz.Ada
                                                                 && x.Parsel == yeniTasinmaz.Parsel
                                                                 && x.Nitelik == yeniTasinmaz.Nitelik

                                                                 && x.Adres == yeniTasinmaz.Adres
                                                                 && x.MahalleId == yeniTasinmaz.MahalleId
                                                                 && x.isActive == true);
            if (tasinmaz != null)
            {
                await _context.Loglar.AddAsync(Logger.Loglayici(false,"Tasinmaz Ekleme","Tasinmaz Ekleme"));
                await _context.SaveChangesAsync();
                return BadRequest();
            }
            Tasinmaz ekleTas = new Tasinmaz();
            yeniTasinmaz.isActive = true;
            await _context.Tasinmazlar.AddAsync(ekleTas);
            await _context.Loglar.AddAsync(Logger.Loglayici(true,"Tasinmaz Ekleme","Tasinmaz Ekleme"));
            ekleTas.Ada = yeniTasinmaz.Ada;
            ekleTas.Parsel = yeniTasinmaz.Parsel;
            ekleTas.Nitelik = yeniTasinmaz.Nitelik;
            ekleTas.MahalleId = yeniTasinmaz.MahalleId;
            ekleTas.Adres = yeniTasinmaz.Adres;
            ekleTas.isActive = yeniTasinmaz.isActive;
            await _context.SaveChangesAsync();

            return Ok(yeniTasinmaz);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTasinmaz(int id, [FromBody] Tasinmaz guncellenenTasinmaz)
        {
            var tasinmaz = await _context.Tasinmazlar.FirstOrDefaultAsync(x => x.Id == id);

            if (tasinmaz is null)
            {
                   await _context.Loglar.AddAsync(Logger.Loglayici(false,"Tasinmaz Guncelleme","Id'ye gore tasinmaz bilgisi."));
                   await _context.SaveChangesAsync();
                return NotFound(guncellenenTasinmaz);
            }

            tasinmaz.Ada = guncellenenTasinmaz.Ada != default ? guncellenenTasinmaz.Ada : tasinmaz.Ada;
            tasinmaz.Parsel = guncellenenTasinmaz.Parsel != default ? guncellenenTasinmaz.Parsel : tasinmaz.Parsel;
            tasinmaz.Nitelik = guncellenenTasinmaz.Nitelik != default ? guncellenenTasinmaz.Nitelik : tasinmaz.Nitelik;
            tasinmaz.Adres = guncellenenTasinmaz.Adres != default ? guncellenenTasinmaz.Adres : tasinmaz.Adres;
            tasinmaz.MahalleId = guncellenenTasinmaz.MahalleId != default ? guncellenenTasinmaz.MahalleId : tasinmaz.MahalleId;
    
               await _context.Loglar.AddAsync(Logger.Loglayici(true,"Tasinmaz Guncelleme","Id'ye gore tasinmaz bilgisi."));
            await _context.SaveChangesAsync();
            return Ok(guncellenenTasinmaz);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTasinmaz(int id)
        {
            var tasinmaz = await _context.Tasinmazlar.SingleOrDefaultAsync(x => x.Id == id);
            if (tasinmaz is null)
            {
                _context.Loglar.Add(Logger.Loglayici(false,"Tasinmaz Silme","Tasinmaz Silme"));
                _context.SaveChanges();
                return BadRequest(tasinmaz);
            }

            tasinmaz.isActive = false;
            _context.Loglar.Add(Logger.Loglayici(true,"Tasinmaz Silme","Tasinmaz Silme"));
            await _context.SaveChangesAsync();
            return Ok(tasinmaz);
        }
        [HttpGet("api/{search}")]
        public async  Task<IActionResult> Search(string search ="")
        {
            var query = await _context.Tasinmazlar.Select(x => new
            {
                id = x.Id,
                ada = x.Ada,
                parsel = x.Parsel,
                nitelik = x.Nitelik,
                isActive = x.isActive,
                adres = x.Adres,
                mahalleAdi = x.Mahalleler.MahalleAdi,
                ilceAdi = x.Mahalleler.Ilceler.IlceAdi,
                ilAdi = x.Mahalleler.Ilceler.Iller.IlAd
            }).Where(x=>x.isActive==true).Where(x=>
                 x.nitelik.ToLower().Contains(search.ToLower())
               ||x.adres.ToLower().Contains(search.ToLower())
               ||x.ada.ToString().Contains(search.ToString())
               ||x.parsel.ToString().Contains(search.ToString())
               ||x.ilceAdi.ToLower().Contains(search.ToLower())
               ||x.ilAdi.ToLower().Contains(search.ToLower())
               ||x.mahalleAdi.ToLower().Contains(search.ToLower())
            ).ToListAsync();
            return Ok(query);
        }
        [HttpGet("page/{List}")]
        public IActionResult List([FromQuery] string searchText, [FromQuery] int? page, [FromQuery] int pagesize = 10)
        {
            var query = string.IsNullOrEmpty(searchText) ? _context.Tasinmazlar : _context.Tasinmazlar.Where(e =>
                                                                    e.Adres.ToLower().Contains(searchText.ToLower())
                                                                    || e.Adres.ToLower().Contains(searchText.ToLower()));
                                                                 
            int totalCount = query.Count();

            PageResult<Tasinmaz> result = new PageResult<Tasinmaz>
            {
                Count = totalCount,
                PageIndex = page ?? 1,
                PageSize = pagesize,
                Items = query.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
            };
            return Ok(result);
        }
    }
}