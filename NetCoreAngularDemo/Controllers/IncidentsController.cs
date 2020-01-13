using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using NetCoreAngularDemo.Models;

namespace NetCoreAngularDemo.Controllers
{
    public class IncidentsController : Controller
    {
        private readonly IncidentsContext _context;

        public IncidentsController(IncidentsContext context)
        {
            _context = context;
        }

        [HttpGet("/incidents")]
        public IEnumerable<Incident> GetIncidents()
        {
            return _context.Incident.OrderByDescending(i => i.IncidentId);
        }

        [HttpGet("/incidents/{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var incident = await _context.Incident
                .FirstOrDefaultAsync(m => m.IncidentId == id);
            if (incident == null)
            {
                return NotFound();
            }

            return Ok(incident);
        }

        [HttpPost("/incidents")]
        public async Task<IActionResult> Create([FromBody] Incident incident)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Add(incident);
            var save = await _context.SaveChangesAsync();

            return CreatedAtAction("Details", new { id = incident.IncidentId }, incident);
        }

        [HttpPut("/incidents/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] IncidentUpdate incidentUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var incident = await _context.Incident
                .FirstOrDefaultAsync(m => m.IncidentId == id);
            if (incident == null)
            {
                return NotFound();
            }

            if (incidentUpdate.Type != null) incident.Type = incidentUpdate.Type;
            if (incidentUpdate.Description != null) incident.Description = incidentUpdate.Description;
            if (incidentUpdate.Person != null) incident.Person = incidentUpdate.Person;

            _context.Entry(incident).State = EntityState.Modified;

            try
            {
                _context.Update(incident);
                var save = await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Incident.Any(e => e.IncidentId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(incident);
        }

        [HttpDelete("/incidents/{id}"), ActionName("Delete")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var incident = await _context.Incident.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }

            _context.Remove(incident);
            var save = await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
