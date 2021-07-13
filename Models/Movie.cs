using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dawproiect.Models
{
    public class Movie
    {

        public Movie()
        {
        }

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public int ReleaseDate { get; set; }

        public int RunningTimeMins { get; set; }

        public string Genre { get; set; }

        public string Poster { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public virtual Soundtrack Soundtrack { get; set; }

       // public List<Actor> Actors { get; set; }
        public List<MoviesActors> MoviesActors { get; set; } = new List<MoviesActors>();


    }
}
