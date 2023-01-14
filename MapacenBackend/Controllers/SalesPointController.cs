using MapacenBackend.Entities;
using MapacenBackend.Models.SalesPointDtos;
using MapacenBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml;

namespace MapacenBackend.Controllers
{
    [Route("api/salesPoint")]
    [ApiController]
    public class SalesPointController : ControllerBase
    {
        private readonly ISalesPointService _service;

        public SalesPointController(ISalesPointService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult<int> CreateSalesPoint([FromBody] CreateSalesPointDto dto)
        {
            var salesPointId = _service.CreateSalesPoint(dto);
            return Created($"/api/salesPoint/{salesPointId}", salesPointId);
        }

        [HttpPut("{id}")]
        public ActionResult<int> UpdateSalesPoint([FromRoute] int id, [FromBody] UpdateSalesPointDto dto)
        {
            return Ok(_service.UpdateSalesPoint(id, dto));
        }

        [HttpGet("{countyId}")]
        public ActionResult GetSalesPointsByCounty([FromRoute] int countyId)
        {
            return Ok(_service.GetSalesPointsByCounty(countyId));
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            _service.DeleteSalesPoint(id);
            return Ok();
        }
    }
}
