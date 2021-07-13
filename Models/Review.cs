using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace dawproiect.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        //public string User_id { get; set; }

        public string Text{ get; set; }

        public int Stars { get; set; }

        public int MovieId { get; set; }

        [JsonIgnore]
        public virtual Movie Movie { get; set; }
    }
}
