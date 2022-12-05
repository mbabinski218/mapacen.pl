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

        public SalesPointService(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public SalesPoint CreateSalesPoint(CreateSalesPointDto dto)
        {
            var salesPoint = new SalesPoint
            {
                Name = dto.Name,
                Address = new Address
                {
                    City = dto.Address.City,
                    Street = dto.Address.Street,
                    PostalCode = dto.Address.PostalCode,
                    Number = dto.Address.Number,
                    CountyId = dto.Address.CountyId
                }
            };

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
            if (salesPoint == null) throw new NotFoundException("County with requested id does not exist");

            salesPoint.Name = dto?.Name ?? salesPoint.Name;

            if (dto.Address != null)
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

            foreach (var salesPoint in salesPoints)
            {
                yield return new SalesPointDto
                {
                    Id = salesPoint.Id,
                    Name = salesPoint.Name,
                    Address = new AddressDto
                    {
                        City = salesPoint.Address.City,
                        Street = salesPoint.Address.Street,
                        PostalCode = salesPoint.Address.PostalCode,
                        Number = salesPoint.Address.Number,
                        CountyId = salesPoint.Address.CountyId
                    }
                };
            }
        }
    }
}