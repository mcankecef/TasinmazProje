using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    public class KullaniciController : ControllerBase
    {
        private readonly TasinmazDbContext _context;
        public KullaniciController(TasinmazDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public  IActionResult GetKullanici()
        {
            var kullaniciListe =  _context.Kullanicilar.Where(x => x.isActive == true).OrderByDescending(x => x.Id)
            .ToList<Kullanici>();
            _context.Loglar.Add(Logger.Loglayici(true, "Kullanici Getir", "Tum kullanicilari getir"));
             _context.SaveChanges();
            return Ok(kullaniciListe);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> KullaniciGetById(int id)
        {
            var kullanici = await _context.Kullanicilar.Where(x => x.Id == id).Where(x => x.isActive == true).SingleOrDefaultAsync();
            if (kullanici is null)
                return NotFound();
            _context.Loglar.Add(Logger.Loglayici(true, "Kullanici Getir", "Id'ye göre kullanici getirme"));
            await _context.SaveChangesAsync();
            return Ok(kullanici);
        }
        [HttpPost]
        public IActionResult AddKullanici([FromBody] Kullanici yeniKullanici)
        {
            var kullanici = _context.Kullanicilar.FirstOrDefault(x => x.KullaniciAdi == yeniKullanici.KullaniciAdi
                                                                  && x.KullaniciSoyadi == yeniKullanici.KullaniciSoyadi
                                                                  && x.Sifre == (Sifreleyici.Sha256(yeniKullanici.Sifre))
                                                                  && x.EMail == yeniKullanici.EMail
                                                                  && x.Adres == yeniKullanici.Adres
                                                                  && x.Rol == yeniKullanici.Rol
                                                                  );
            if (kullanici != null)
            {
                _context.Loglar.Add(Logger.Loglayici(false, "Kullanici Ekleme", "Yeni Kullanici ekle"));
                _context.SaveChanges();
                return BadRequest();
            }
            yeniKullanici.isActive = true;
            yeniKullanici.Sifre = Sifreleyici.Sha256(yeniKullanici.Sifre);
            Kullanici ynKullanici = new Kullanici();
            _context.Kullanicilar.Add(ynKullanici);
            _context.Loglar.Add(Logger.Loglayici(true, "Kullanici Ekleme", "Yeni Kullanici ekle"));
            ynKullanici.Adres = yeniKullanici.Adres;
            ynKullanici.EMail = yeniKullanici.EMail;
            ynKullanici.isActive = yeniKullanici.isActive;
            ynKullanici.KullaniciAdi = yeniKullanici.KullaniciAdi;
            ynKullanici.KullaniciSoyadi = yeniKullanici.KullaniciSoyadi;
            ynKullanici.Rol = yeniKullanici.Rol;
            ynKullanici.Sifre = yeniKullanici.Sifre;
            _context.SaveChanges();
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKullanici([FromBody] Kullanici guncellenecekKullanici, int id)
        {
            var kullanici = await _context.Kullanicilar.SingleOrDefaultAsync(x => x.Id == id);

            if (kullanici is null)
            {
                _context.Loglar.Add(Logger.Loglayici(false, "Kullanici Guncelleme", "Id'ye gore kullanici bilgisi"));
                _context.SaveChanges();
                return BadRequest();
            }
            kullanici.KullaniciAdi = guncellenecekKullanici.KullaniciAdi != default ? guncellenecekKullanici.KullaniciAdi : kullanici.KullaniciAdi;
            kullanici.KullaniciSoyadi = guncellenecekKullanici.KullaniciSoyadi != default ? guncellenecekKullanici.KullaniciSoyadi : kullanici.KullaniciSoyadi;
            kullanici.Sifre = guncellenecekKullanici.Sifre != default ? guncellenecekKullanici.Sifre=(Sifreleyici.Sha256(guncellenecekKullanici.Sifre)) : kullanici.Sifre;
            kullanici.Adres = guncellenecekKullanici.Adres != default ? guncellenecekKullanici.Adres : kullanici.Adres;
            kullanici.EMail = guncellenecekKullanici.EMail != default ? guncellenecekKullanici.EMail : kullanici.EMail;
            kullanici.Rol = guncellenecekKullanici.Rol;
            kullanici.isActive = guncellenecekKullanici.isActive;

            guncellenecekKullanici.Sifre = Sifreleyici.Sha256(guncellenecekKullanici.Sifre);
            // _context.Kullanicilar.Update(guncellenecekKullanici);
            _context.Loglar.Add(Logger.Loglayici(true, "Kullanici Guncelleme", "kullanici guncelleme"));
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKullanici(int id)
        {
            var kullanici = await _context.Kullanicilar.FindAsync(id);

            if (kullanici is null)
            {
                _context.Loglar.Add(Logger.Loglayici(false, "Kullanici Silme", "Kullanici Silme"));
                _context.SaveChanges();
                return BadRequest();
            }

            kullanici.isActive = false;
            _context.Loglar.Add(Logger.Loglayici(true, "Kullanici Silme", "Kullanici Silme"));
            await _context.SaveChangesAsync();
            return Ok(kullanici);
        }
        [HttpGet("api/{search}")]
        public async Task<IActionResult> Search(string search = "")
        {
            var query = await _context.Kullanicilar.Where(x => x.isActive == true).Where(x => x.KullaniciAdi.ToLower().Contains(search.ToLower()) || x.KullaniciSoyadi.ToLower().Contains(search.ToLower())
                || x.EMail.ToLower().Contains(search.ToLower()) ||x.Rol.ToString().Contains(search.ToLower()) ||  x.Adres.ToLower().Contains(search.ToLower())).ToListAsync();
            return Ok(query);
        }
        private static string Rol(bool rol)
        {
            string a ="";
            if(rol == true)
            {
                 a="Admin";
            }
            else if(rol==false){
                a="Kullanici";
            }
            return a;
                
        }

        [HttpGet("page/{List}")]
        public IActionResult List([FromQuery] string searchText, [FromQuery] int? page, [FromQuery] int pagesize = 10)
        {
            var query = string.IsNullOrEmpty(searchText) ? _context.Kullanicilar : _context.Kullanicilar.Where(e =>
                                                                    e.KullaniciAdi.ToLower().Contains(searchText.ToLower())
                                                                    || e.KullaniciSoyadi.ToLower().Contains(searchText.ToLower())
                                                                    || e.Adres.ToLower().Contains(searchText.ToLower())
                                                                    || e.EMail.ToLower().Contains(searchText.ToLower()));
            int totalCount = query.Count();

            PageResult<Kullanici> result = new PageResult<Kullanici>
            {
                Count = totalCount,
                PageIndex = page ?? 1,
                PageSize = pagesize,
                Items = query.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
            };
            return Ok(result);
        }
        [HttpPost("{login}")]
        public IActionResult Login(LoginModel login)
        {
            var query = _context.Kullanicilar.Where(x=>x.EMail == login.EMail && x.Sifre ==Sifreleyici.Sha256(login.Sifre)).FirstOrDefault();
            if(query is null)
            {
                _context.Loglar.Add(Logger.Loglayici(false, "Tasinmaz Giris", "Tasinmaz Giris"));
                _context.SaveChanges();
                return BadRequest();
            }
            _context.Loglar.Add(Logger.Loglayici(true, "Tasinmaz Giris", "Tasinmaz Giris"));
            _context.SaveChanges();
            return Ok(query);
        }


        
    }
}