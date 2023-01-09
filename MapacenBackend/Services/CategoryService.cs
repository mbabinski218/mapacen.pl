using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Models.CategoryDtos;
using MapacenBackend.Exceptions;

namespace MapacenBackend.Services
{
    public interface ICategoryService
    {
        IEnumerable<CategoryDto>? GetCategories();
        CategoryDto? GetCategoryById(int id);
        CategoryDto CreateCategory(CreateCategoryDto dto);
        void UpdateCategory(int id, UpdateCategoryDto dto);
    }

    public class CategoryService : ICategoryService
    {
        private readonly MapacenDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoryService(MapacenDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public IEnumerable<CategoryDto>? GetCategories()
        {
            var categories = _dbContext.Categories.OrderBy(c => c.Name);
            return _mapper.Map<List<CategoryDto>>(categories);
        }

        public CategoryDto? GetCategoryById(int id)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            return _mapper.Map<CategoryDto>(category);
        }

        public CategoryDto CreateCategory(CreateCategoryDto dto)
        {
            if (_dbContext.Categories.Any(c => c.Name == dto.Name))
                throw new NotUniqueElementException("Kateogria o podanej nazwie już istnieje");

            var category = _mapper.Map<Category>(dto);

            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();

            return _mapper.Map<CategoryDto>(category);
        }

        public void UpdateCategory(int id, UpdateCategoryDto dto)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null) throw new NotFoundException("Category with requested id does not exist");

            if (dto.Name != null)
            {
                category.Name = dto.Name;
                _dbContext.SaveChanges();
            }
        }

    }
}
