using System;
using System.ComponentModel.DataAnnotations;

namespace NetCoreAngularDemo.Models
{
	public class IncidentUpdate
	{
		public IncidentUpdate()
		{
		}

		public string Type { get; set; }

		public string Description { get; set; }

		public string Person { get; set; }

	}
}
