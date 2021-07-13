using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace dawproiect.Models
{
    public class Soundtrack
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Creator { get; set; }

        public virtual int MovieId { get; set; }

        [JsonIgnore]
        public virtual Movie Movie { get; set; }

    }
}
