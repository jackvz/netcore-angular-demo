using System;
using System.ComponentModel.DataAnnotations;

namespace NetCoreAngularDemo.Models
{
    public class Incident
    {
        public Incident()
        {
        }

		[Key]
		public int IncidentId { get; set; }

		[Required]
		public string Type { get; set; }

		[Required]
		public string Description { get; set; }

		[Required]
		public string Person { get; set; }

		[Required]
		public DateTime Dt { get; set; }

	}
}
