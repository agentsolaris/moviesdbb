using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dawproiect.Models
{
    public class MovieWithActorsDTO
    {
        public Movie movie { get; set; }

        public List<Actor> actors { get; set; }

        public Soundtrack soundtrack { get; set; }
    }
}
