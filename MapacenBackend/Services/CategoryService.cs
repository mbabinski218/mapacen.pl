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

        public CategoryService(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<CategoryDto>? GetCategories()
        {
            return _dbContext.Categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
            });
        }

        public CategoryDto? GetCategoryById(int id)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            return new CategoryDto { Id = category.Id, Name = category.Name };
        }

        public CategoryDto CreateCategory(CreateCategoryDto dto)
        {
            var category = new Category { Name = dto.Name };
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name
            };
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
