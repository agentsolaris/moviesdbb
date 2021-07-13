using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace dawproiect.Models
{
    public class Actor
    {

        public Actor(string Name)
        {
            this.Name = Name;
        }

        public Actor()
        {
            
        }


        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public List<MoviesActors> MoviesActors { get; set; } = new List<MoviesActors>();



    }
}
