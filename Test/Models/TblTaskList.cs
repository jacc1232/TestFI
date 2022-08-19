using System;
using System.Collections.Generic;

#nullable disable

namespace Test.Models
{
    public partial class TblTaskList
    {
        public int Id { get; set; }
        public string Texto { get; set; }
        public bool Completada { get; set; }
    }
}
