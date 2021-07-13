using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace dawproiect.Models
{
    public class MoviesActors
    {
        public MoviesActors()
        {
           
        }
        public int MovieId { get; set; }
        [JsonIgnore]
        public Movie Movie { get; set; }
        public int ActorId { get; set; }

        
        public Actor Actor { get; set; }
    }
}
