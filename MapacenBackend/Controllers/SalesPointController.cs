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
        public ActionResult<SalesPoint> CreateaSalesPoint([FromBody] CreateSalesPointDto dto)
        {
            var salesPoint = _service.CreateSalesPoint(dto);
            return Created($"/api/salesPoint/{salesPoint.Id}", salesPoint);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateSalesPoint([FromRoute] int id, [FromBody] UpdateSalesPointDto dto)
        {
            _service.UpdateSalesPoint(id, dto);
            return Ok();
        }

        [HttpGet("{countyId}")]
        public ActionResult GetSalesPointsByCounty([FromRoute] int countyId)
        {
            return Ok(_service.GetSalesPointsByCounty(countyId));
        }
    }
}
