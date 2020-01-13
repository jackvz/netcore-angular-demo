using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NetCoreAngularDemo.Models;

    public class IncidentsContext : DbContext
    {
        public IncidentsContext (DbContextOptions<IncidentsContext> options)
            : base(options)
        {
        }

        public DbSet<NetCoreAngularDemo.Models.Incident> Incident { get; set; }
    }
