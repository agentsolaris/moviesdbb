using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dawproiect.Models
{
    public class AddMoviesActorsDTO
    {
   
        public AddMoviesActorsDTO(int id1, int id2)
        {
            this.MovieId = id1;
            this.ActorId = id2;
        }

        public int MovieId { get; set; }
        public int ActorId { get; set; }
    }
}
