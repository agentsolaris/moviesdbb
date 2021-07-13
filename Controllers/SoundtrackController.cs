using dawproiect.Data;
using dawproiect.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dawproiect.Controllers
{
    public class SoundtrackController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SoundtrackController(ApplicationDbContext context)
        {
            _context = context;

        }

        [HttpGet("/api/soundtracks")]
        public IEnumerable<Soundtrack> GetSoundtrack()
        {
            return _context.Soundtrack;
        }

        [HttpPost("/api/soundtracks")]
        public async Task<IActionResult> PostSoundtrack([FromBody] Soundtrack soundtrack)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Soundtrack.Add(soundtrack);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSoundtrack", new { id = soundtrack.Id }, soundtrack);
        }


        [HttpPut("/api/soundtracks/{id}")]
        public async Task<IActionResult> PutSoundtrack([FromRoute] int id, [FromBody] Soundtrack soundtrack)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != soundtrack.Id)
            {
                return BadRequest();
            }

            _context.Entry(soundtrack).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SoundtrackExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool SoundtrackExists(int id)
        {
            return _context.Soundtrack.Any(e => e.Id == id);
        }

        [HttpDelete("/api/soundtracks/{id}")]
        public async Task<IActionResult> DeleteSoundtrack([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var soundtrack = await _context.Soundtrack.SingleOrDefaultAsync(m => m.Id == id);
            if (soundtrack == null)
            {
                return NotFound();
            }

            _context.Soundtrack.Remove(soundtrack);
            await _context.SaveChangesAsync();

            return Ok(soundtrack);
        }
    }
}
