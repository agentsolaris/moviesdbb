using dawproiect.Data;
using dawproiect.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dawproiect.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : Controller
    {
        
        private readonly ApplicationDbContext _context;

        public MovieController(ApplicationDbContext context)
        {
            _context = context;

        }

        [HttpGet("/api/movies")]
        public IEnumerable<Movie>  GetMovie()
        {
                return _context.Movie;
        }

        [HttpPost("/api/movies")]
        public async Task<IActionResult> PostMovie([FromBody] MovieWithActorsDTO movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (movie.soundtrack!= null)
            {
                movie.movie.Soundtrack = movie.soundtrack;
            }

            if (movie.actors != null)
            {
                foreach (var actor in movie.actors)
                {
                    var ActorsInMovie = new MoviesActors();
                    ActorsInMovie.Movie = movie.movie;
                    ActorsInMovie.Actor = actor;
                    movie.movie.MoviesActors.Add(ActorsInMovie);
                    var movieToBeAdded = movie.movie;

                    _context.Movie.Add(movieToBeAdded);

                }
            }
               
            await _context.SaveChangesAsync();
            

            return CreatedAtAction("GetMovie", new { id = movie.movie.Id }, movie.movie);
        }


        [HttpPut("/api/movies/{id}")]
        public async Task<IActionResult> PutMovie([FromRoute] int id, [FromBody] MovieWithActorsDTO movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (id != movie.movie.Id)
            {
                return BadRequest();
            }

            if (movie.soundtrack != null)
            {
                movie.movie.Soundtrack = movie.soundtrack;
                 _context.Entry(movie.movie).State = EntityState.Modified;
            }

            if (movie.actors != null)
            {
                foreach (var actor in movie.actors)
                {
                    var ActorsInMovie = new MoviesActors();
                    ActorsInMovie.Movie = movie.movie;
                    ActorsInMovie.Actor = actor;
                    movie.movie.MoviesActors.Add(ActorsInMovie);
                    var movieToBeAdded = movie.movie;

                    _context.Entry(movieToBeAdded).State = EntityState.Modified;

                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
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

        private bool MovieExists(int id)
        {
            return _context.Movie.Any(e => e.Id == id);
        }

        [HttpDelete("/api/movies/{id}")]
        public async Task<IActionResult> DeleteMovie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = await _context.Movie.SingleOrDefaultAsync(m => m.Id == id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movie.Remove(movie);
            await _context.SaveChangesAsync();

            return Ok(movie);
        }

        [HttpGet("/api/movies/{id}")]
        public Movie GetById([FromRoute] int id)
        {
            //var movie = _context.Movie.Find(id);
            var movie = _context.Movie.Include(p => p.Soundtrack)
                                        .Include(p => p.Reviews)
                                        .Include(c => c.MoviesActors).ThenInclude(cs => cs.Actor)
                                        .FirstOrDefault(p => p.Id == id);
            
            return movie;
        }


    }
}
