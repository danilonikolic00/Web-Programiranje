
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Projekat.Models;
using Microsoft.EntityFrameworkCore;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameShopController : ControllerBase
    {
        public GameShopContext Context { get; set; }
        public GameShopController(GameShopContext context)
        {
            Context = context;
        }

        //R(ead) za katalog
        [Route("PreuzimanjeKataloga")]
        [HttpGet]
        public async Task<List<Katalog>> PreuzmanjeKataloga()
        {
            return await Context.Katalozi.Include(p => p.VideoIgre).ToListAsync();
        }

        //C(reate) za video igru
        [Route("DodavanjeVideoIgre/{idKataloga}")]
        [HttpPost]
        public async Task<IActionResult> UpisivanjeVideoIgre(int idKataloga, [FromBody] VideoIgra igra)
        {
            var katalog = await Context.Katalozi.FindAsync(idKataloga);
            var studio = await Context.Studios.FindAsync(igra.StudioID);

            igra.Katalog = katalog;

            if (Context.VideoIgre.Any(temp => temp.Naziv == igra.Naziv && temp.Tip == igra.Tip && (temp.X != igra.X || temp.Y != igra.Y)))
            {
                var xy = Context.VideoIgre.Where(p => p.Tip == igra.Tip).FirstOrDefault();
                return BadRequest(new { X = xy?.X, Y = xy?.Y });
            }

            var temp = Context.VideoIgre.Where(p => p.X == igra.X && p.Y == igra.Y).FirstOrDefault();

            if (temp != null)
            {
                if (temp.KolicinaNaStanju != igra.KolicinaNaStanju)
                    return StatusCode(409);
                else
                    return StatusCode(406);
            }
            else
            {
                studio.BrojIgaraNaStanju++;
                Context.VideoIgre.Add(igra);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        //U(pdate) za video igru
        [Route("UpdateKolicine")]
        [HttpPut]
        public async Task AzuriranjeKolicine([FromBody] VideoIgra igra)
        {
            var temp =  Context.VideoIgre.Where(p => p.X == igra.X && p.Y == igra.Y).FirstOrDefault();
            temp.KolicinaNaStanju = igra.KolicinaNaStanju;

            Context.Update<VideoIgra>(temp);
            await Context.SaveChangesAsync();
            
        }

        //D(elete) za video igru
        [Route("BrisanjeVideoIgre")]
        [HttpDelete]
        public async Task<IActionResult> BrisanjeVideoIgre([FromBody] VideoIgra igra)
        {
            var temp =  Context.VideoIgre.Where(p => p.X == igra.X && p.Y == igra.Y).FirstOrDefault();
            var studio = await Context.Studios.FindAsync(igra.StudioID);

            if (temp != null )
            {
                studio.BrojIgaraNaStanju--;
                Context.Remove<VideoIgra>(temp);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
                return StatusCode(406);
        }

        //R(ead) za studio
        [Route("PreuzimanjeStudia")]
        [HttpGet]
        public async Task<List<Studio>> PreuzimanjeStudia()
        {
            return await Context.Studios.ToListAsync();
        }
    }
}