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
    public class ReviewController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReviewController(ApplicationDbContext context)
        {
            _context = context;

        }

        [HttpGet("/api/reviews")]
        public IEnumerable<Review> GetReview()
        {
            return _context.Review;
        }

        [HttpGet("/api/reviews/{id}")]
        public Review GetById([FromRoute] int id)
        {
            //var review = _context.Review.Find(id);
            var review = _context.Review.FirstOrDefault(p => p.Id == id);

            return review;
        }

        [HttpGet("/api/reviews/movie/{id}")]
        public IEnumerable<Review> GetByMovieId([FromRoute] int id)
        {
            //var review = _context.Review.Find(id);
            var review = _context.Review.Where(r => r.MovieId == id);

            return review;
        }


        [HttpPost("/api/reviews")]
        public async Task<IActionResult> PostReview([FromBody] Review review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }


        [HttpPut("/api/reviews/{id}")]
        public async Task<IActionResult> PutReview([FromRoute] int id, [FromBody] Review review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != review.Id)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
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

        private bool ReviewExists(int id)
        {
            return _context.Review.Any(e => e.Id == id);
        }

        [HttpDelete("/api/reviews/{id}")]
        public async Task<IActionResult> DeleteReview([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var review = await _context.Review.SingleOrDefaultAsync(m => m.Id == id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Review.Remove(review);
            await _context.SaveChangesAsync();

            return Ok(review);
        }
    }
}
