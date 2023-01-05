using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models.AddressDtos;
using MapacenBackend.Models.SalesPointDtos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Specialized;

namespace MapacenBackend.Services
{
    public interface ISalesPointService
    {
        SalesPoint CreateSalesPoint(CreateSalesPointDto dto);
        void UpdateSalesPoint(int id, UpdateSalesPointDto dto);
        IEnumerable<SalesPointDto>? GetSalesPointsByCounty(int countyId);

    }

    public class SalesPointService : ISalesPointService
    {
        private readonly MapacenDbContext _dbContext;
        private readonly IMapper _mapper;

        public SalesPointService(MapacenDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public SalesPoint CreateSalesPoint(CreateSalesPointDto dto)
        {
            var salesPoint = _mapper.Map<SalesPoint>(dto);

            if (_dbContext.Addresses.Any(a =>
                    a.City == salesPoint.Address.City &&
                    a.Street == salesPoint.Address.Street &&
                    a.PostalCode == salesPoint.Address.PostalCode &&
                    a.Number == salesPoint.Address.Number &&
                    a.CountyId == salesPoint.Address.CountyId))
                throw new NotUniqueElementException("Sales point address must be unique");

            _dbContext.Add(salesPoint);
            _dbContext.SaveChanges();
            return salesPoint;
        }

        public void UpdateSalesPoint(int id, UpdateSalesPointDto dto)
        {
            var salesPoint = _dbContext
                .SalesPoints
                .Include(s => s.Address)
                .FirstOrDefault(s => s.Id == id);

            if (salesPoint == null)
                throw new NotFoundException("Sales point with requested id does not exist");

            salesPoint.Name = dto?.Name ?? salesPoint.Name;

            if (dto?.Address != null)
            {
                salesPoint.Address.City = dto?.Address.City ?? salesPoint.Address.City;
                salesPoint.Address.Street = dto?.Address.Street ?? salesPoint.Address.Street;
                salesPoint.Address.PostalCode = dto?.Address.PostalCode ?? salesPoint.Address.PostalCode;
                salesPoint.Address.Number = dto?.Address.Number ?? salesPoint.Address.Number;
                salesPoint.Address.CountyId = dto?.Address.CountyId ?? salesPoint.Address.CountyId;
            }

            _dbContext.SaveChanges();
        }

        public IEnumerable<SalesPointDto>? GetSalesPointsByCounty(int countyId)
        {
            var salesPoints = _dbContext
                .SalesPoints
                .Include(s => s.Address)
                .Where(s => s.Address.CountyId == countyId);

            return _mapper.Map<List<SalesPointDto>>(salesPoints);

        }
    }
}